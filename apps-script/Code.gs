/**
 * MedBridge — Application form backend (Google Apps Script Web App).
 *
 * Receives JSON-shaped applications from the website, appends a row to a
 * Google Sheet, and emails a notification to the team. Designed so that the
 * browser does NOT trigger a CORS preflight: requests must be sent with
 * Content-Type "text/plain" carrying a JSON string.
 *
 * Setup: see doc/setup-form-backend.md
 */

// ---- Configuration --------------------------------------------------------
// All of these can be overridden via Script Properties (File → Project Properties → Script properties).
// Property name = same as the constant key. Property value wins over the default below.

var DEFAULT_CONFIG = {
  SHEET_ID: '1PA6kEb2UKlGiL0ZPY3NK4zJ-Wro8JuQbx_AvVIftgqw',
  SHEET_NAME: 'Applications',
  // Comma-separated list. Example: "info@medbridge.am,martirosyanss@gmail.com"
  NOTIFY_EMAILS: 'info@medbridge.am',
  EMAIL_FROM_NAME: 'MedBridge Applications',
  // Per-IP rate limit: max submissions per ROLLING_WINDOW_SECONDS.
  RATE_LIMIT_MAX: '5',
  RATE_LIMIT_WINDOW_SECONDS: '600',
  // Telegram (optional — leave empty to disable)
  TELEGRAM_BOT_TOKEN: '',
  TELEGRAM_CHAT_ID: '',
};

var SHEET_HEADERS = [
  'Timestamp', 'First name', 'Last name', 'Email', 'Country',
  'Phone / WhatsApp', 'Education level', 'Preferred specialty', 'Programme length',
  'Preferred start date', 'Message', 'Contact consent', 'Age 18+ confirmed', 'Terms agreed',
  'Source', 'User agent', 'Status',
];

// ---- Entry points ---------------------------------------------------------

function doGet() {
  return jsonOut({ ok: true, service: 'medbridge-applications', version: 2 });
}

function doPost(e) {
  try {
    var raw = (e && e.postData && e.postData.contents) || '';
    var payload = {};
    try { payload = JSON.parse(raw); } catch (_) {
      return jsonOut({ ok: false, error: 'invalid_json' });
    }

    // Honeypot — pretend success so bots don't retry, but record nothing.
    if (payload._gotcha) {
      return jsonOut({ ok: true, skipped: 'honeypot' });
    }

    var cfg = readConfig();

    // Soft per-client rate limit. Keyed by source + a coarse fingerprint of
    // the UA so we don't reveal IP handling assumptions; collisions are fine
    // (worst case: legit retry has to wait the rolling window).
    var clientKey = fingerprint(payload);
    if (clientKey && isRateLimited(clientKey, cfg)) {
      return jsonOut({ ok: false, error: 'rate_limited' });
    }

    var validation = validate(payload);
    if (!validation.ok) {
      return jsonOut({ ok: false, error: 'validation', fields: validation.fields });
    }

    var record = normalize(payload);
    appendToSheet(cfg, record);
    sendNotificationEmail(cfg, record);
    sendTelegram(cfg, record);

    return jsonOut({ ok: true });
  } catch (err) {
    // Surface a generic error to the client; full stack stays in Apps Script logs.
    console.error('doPost failed', err && err.stack || err);
    return jsonOut({ ok: false, error: 'server_error' });
  }
}

// ---- Validation -----------------------------------------------------------

function validate(p) {
  var required = ['firstName', 'lastName', 'email', 'educationLevel', 'preferredSpecialty', 'duration'];
  var missing = [];
  for (var i = 0; i < required.length; i++) {
    var k = required[i];
    if (!p[k] || String(p[k]).trim() === '') missing.push(k);
  }
  if (p.consent !== true) missing.push('consent');
  if (p.ageConfirm !== true) missing.push('ageConfirm');
  if (p.agreeTerms !== true) missing.push('agreeTerms');
  if (p.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(p.email))) missing.push('email');
  return { ok: missing.length === 0, fields: missing };
}

function normalize(p) {
  var clip = function (s, n) { return String(s == null ? '' : s).slice(0, n); };
  return {
    timestamp: new Date(),
    firstName: clip(p.firstName, 80),
    lastName: clip(p.lastName, 80),
    email: clip(p.email, 200),
    country: clip(p.country, 80),
    phone: clip(p.phone, 60),
    educationLevel: clip(p.educationLevel, 80),
    preferredSpecialty: clip(p.preferredSpecialty, 120),
    duration: clip(p.duration, 80),
    preferredStart: clip(p.preferredStart, 40),
    message: clip(p.message, 2000),
    consent: p.consent === true,
    ageConfirm: p.ageConfirm === true,
    agreeTerms: p.agreeTerms === true,
    source: clip(p.source || 'medbridge.am', 120),
    userAgent: clip(p.userAgent, 500),
  };
}

// ---- Rate limit -----------------------------------------------------------

function fingerprint(p) {
  var src = String(p && p.source || '').slice(0, 80);
  var ua  = String(p && p.userAgent || '').slice(0, 200);
  if (!src && !ua) return '';
  return Utilities.base64EncodeWebSafe(Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_1,
    src + '|' + ua
  ));
}

function isRateLimited(key, cfg) {
  var max    = parseInt(cfg.RATE_LIMIT_MAX, 10) || 5;
  var window = parseInt(cfg.RATE_LIMIT_WINDOW_SECONDS, 10) || 600;
  var cache  = CacheService.getScriptCache();
  var hits   = parseInt(cache.get(key), 10) || 0;
  if (hits >= max) return true;
  cache.put(key, String(hits + 1), window);
  return false;
}

// ---- Storage --------------------------------------------------------------

function appendToSheet(cfg, r) {
  var ss = SpreadsheetApp.openById(cfg.SHEET_ID);
  var sheet = ss.getSheetByName(cfg.SHEET_NAME) || ss.insertSheet(cfg.SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(SHEET_HEADERS);
    sheet.getRange(1, 1, 1, SHEET_HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  sheet.appendRow([
    r.timestamp, r.firstName, r.lastName, r.email, r.country,
    r.phone, r.educationLevel, r.preferredSpecialty, r.duration,
    r.preferredStart, r.message,
    r.consent ? 'yes' : 'no',
    r.ageConfirm ? 'yes' : 'no',
    r.agreeTerms ? 'yes' : 'no',
    r.source, r.userAgent, 'new',
  ]);
}

// ---- Notifications --------------------------------------------------------

function sendNotificationEmail(cfg, r) {
  var recipients = String(cfg.NOTIFY_EMAILS || '')
    .split(',').map(function (s) { return s.trim(); }).filter(Boolean);
  if (recipients.length === 0) return;

  var subject = 'MedBridge application — ' + r.firstName + ' ' + r.lastName;
  var lines = [
    'New application received.',
    '',
    'Name: ' + r.firstName + ' ' + r.lastName,
    'Email: ' + r.email,
    r.country && ('Country: ' + r.country),
    r.phone && ('Phone / WhatsApp: ' + r.phone),
    'Education level: ' + r.educationLevel,
    'Preferred specialty: ' + r.preferredSpecialty,
    'Programme length: ' + r.duration,
    r.preferredStart && ('Preferred start date: ' + r.preferredStart),
    r.message && ('\nMessage:\n' + r.message),
    '',
    '— Submitted from ' + r.source + ' at ' + r.timestamp.toISOString(),
  ].filter(Boolean);

  MailApp.sendEmail({
    to: recipients.join(','),
    subject: subject,
    body: lines.join('\n'),
    name: cfg.EMAIL_FROM_NAME,
    replyTo: r.email,
  });
}

function sendTelegram(cfg, r) {
  if (!cfg.TELEGRAM_BOT_TOKEN || !cfg.TELEGRAM_CHAT_ID) return;
  var text =
    '*New MedBridge application*\n' +
    '*' + r.firstName + ' ' + r.lastName + '*\n' +
    r.email + (r.phone ? '  ·  ' + r.phone : '') + '\n' +
    (r.country ? r.country + '\n' : '') +
    r.educationLevel + ' · ' + r.preferredSpecialty + ' · ' + r.duration +
    (r.preferredStart ? '\nStart: ' + r.preferredStart : '') +
    (r.message ? '\n\n' + r.message.slice(0, 500) : '');
  try {
    UrlFetchApp.fetch('https://api.telegram.org/bot' + cfg.TELEGRAM_BOT_TOKEN + '/sendMessage', {
      method: 'post',
      contentType: 'application/json',
      muteHttpExceptions: true,
      payload: JSON.stringify({
        chat_id: cfg.TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
      }),
    });
  } catch (err) {
    console.error('Telegram send failed', err);
  }
}

// ---- Helpers --------------------------------------------------------------

function readConfig() {
  var props = PropertiesService.getScriptProperties().getProperties();
  var cfg = {};
  Object.keys(DEFAULT_CONFIG).forEach(function (k) {
    cfg[k] = (props[k] != null && props[k] !== '') ? props[k] : DEFAULT_CONFIG[k];
  });
  return cfg;
}

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
