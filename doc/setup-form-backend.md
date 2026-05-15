# Application form backend — setup guide

The Apply form on medbridge.am posts to a Google Apps Script Web App, which:

1. appends a row to a Google Sheet,
2. emails the team at `info@medbridge.am`,
3. (optional) posts a notification to a Telegram chat.

The script source lives at [`apps-script/Code.gs`](../apps-script/Code.gs). Apps Script does not pull from this repo automatically — you copy the file into the Apps Script editor manually whenever it changes.

---

## Prerequisites

- Google account with access to the applications Sheet
  ([1PA6kEb2UKlGiL0ZPY3NK4zJ-Wro8JuQbx_AvVIftgqw](https://docs.google.com/spreadsheets/d/1PA6kEb2UKlGiL0ZPY3NK4zJ-Wro8JuQbx_AvVIftgqw/edit))
- `info@medbridge.am` mailbox is reachable (test by sending it a manual email first — if MX/DKIM aren't configured yet, add a personal address as a backup recipient in step 4).

---

## 1. Create the Apps Script project

1. Open [script.google.com](https://script.google.com) signed in as the Google account that owns the Sheet.
2. **New project** → rename to `MedBridge — Applications backend`.
3. Delete the default `function myFunction() { ... }` stub.
4. Open [`apps-script/Code.gs`](../apps-script/Code.gs) in the repo, copy the **entire** contents, paste into the Apps Script editor.
5. **Save** (disk icon, or Ctrl+S).

---

## 2. (Optional) Override defaults via Script Properties

The script ships with sensible defaults baked in (Sheet ID, recipient email). If you need to change anything **without editing the source**, use Script Properties:

1. In the Apps Script editor: **Project Settings** (gear icon, left sidebar) → **Script properties** → **Add script property**.
2. Useful keys:
   - `NOTIFY_EMAILS` → comma-separated list, e.g. `info@medbridge.am,martirosyanss@gmail.com`
   - `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` → enable Telegram notifications later
   - `SHEET_ID` → swap to a different Sheet
3. Save.

A property value always wins over the default in `DEFAULT_CONFIG`.

---

## 3. First run — grant permissions

1. In the editor, choose the function `doGet` from the function dropdown next to ▶.
2. Click **Run**.
3. Google will prompt for permissions:
   - "Allow this app to access your Google account"
   - It will warn that the app is not verified — click **Advanced** → **Go to MedBridge — Applications backend (unsafe)** → **Allow**. (This warning is normal for personal scripts; safe because it's your own code.)
4. The script needs three scopes (it requests them automatically): Spreadsheets, Mail, External requests (for Telegram).

---

## 4. Deploy as a Web App

1. **Deploy** (top right) → **New deployment**.
2. **Select type** → click the gear → **Web app**.
3. Fill in:
   - **Description**: `v1 — production`
   - **Execute as**: **Me** (your Google account — emails will be sent from this address)
   - **Who has access**: **Anyone** (this is required so the website can POST without auth; the script enforces its own validation)
4. **Deploy**.
5. Copy the **Web app URL** — looks like `https://script.google.com/macros/s/AKfycb.../exec`. **Save it.**

> **Important:** every time you change `Code.gs` you must redeploy. Click **Deploy → Manage deployments → ✏️ (edit)** → change **Version** to **New version** → **Deploy**. The URL stays the same as long as you edit the existing deployment instead of creating a new one.

---

## 5. Smoke-test the endpoint

Open the Web App URL in a browser. You should see:

```json
{"ok":true,"service":"medbridge-applications","version":1}
```

If you get a Google sign-in screen, the deployment is set to "Only myself" — go back to step 4 and change **Who has access** to **Anyone**.

---

## 6. Wire the URL into the website build

The Vite build reads the endpoint from `VITE_FORM_ENDPOINT`. There are two places to set it:

### Local dev

Create `web/.env.local` (gitignored):

```
VITE_FORM_ENDPOINT=https://script.google.com/macros/s/AKfycb.../exec
```

Restart `npm run dev`.

### GitHub Pages (production)

The deploy workflow ([`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml)) reads `vars.VITE_FORM_ENDPOINT`. Set it once:

1. Go to the repo on GitHub → **Settings** → **Secrets and variables** → **Actions** → **Variables** tab.
2. **New repository variable** → name `VITE_FORM_ENDPOINT`, value = the Web App URL.
3. Re-run the deploy workflow (or push any commit to `main`).

> The endpoint URL is **not a secret** — it's exposed in browser network traffic anyway. Storing it as a repo *variable* (not a secret) is correct: variables show up in build logs, secrets do not.

---

## 7. End-to-end test

1. Open the deployed site, fill in the Apply form, submit.
2. You should see the green "Application received" panel.
3. Check:
   - The Google Sheet — a new row in the `Applications` tab.
   - Your inbox at `info@medbridge.am` — an email with subject `MedBridge application — <name>`.

---

## Troubleshooting

| Symptom | Likely cause / fix |
|---|---|
| "We couldn't submit your application automatically" + email client opens | The fetch failed. Check DevTools → Network. Common: deployment is set to "Only myself", or the endpoint URL has a typo. |
| `{"ok":false,"error":"validation","fields":[...]}` in network response | The frontend sent fewer fields than required, or email format invalid. Compare payload to `validate()` in `Code.gs`. |
| No row in Sheet, no email | Open Apps Script editor → **Executions** (left sidebar). Look for the failing run and read the stack trace. |
| Email never arrives but Sheet works | Check `MailApp` daily quota (100 messages/day on free Google accounts — way above what we need, but if it's exceeded, no errors are thrown, the email is silently dropped). Also check spam folder. |
| Want to add Telegram later | Create a bot via @BotFather → get token. Add the bot to your group → call `https://api.telegram.org/bot<TOKEN>/getUpdates` to find `chat_id`. Set both as script properties (step 2). No code change needed. |

---

## Updating the script

When `apps-script/Code.gs` changes in the repo:

1. Open the Apps Script editor.
2. Replace the editor contents with the new file.
3. **Save**.
4. **Deploy → Manage deployments → ✏️ → Version: New version → Deploy.** (Critical — the old version keeps serving until you redeploy.)

The Web app URL does not change as long as you edit the existing deployment instead of creating a new one.
