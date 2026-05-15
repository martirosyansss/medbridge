# MedBridge

International medical shadowing & clinical experience program at **Astghik Medical Center**, Yerevan, Armenia.

Live site: **[medbridge.am](https://medbridge.am)**

---

## Stack

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS v4
- **Form backend**: Google Apps Script Web App → Google Sheet + email (+ optional Telegram)
- **Hosting**: GitHub Pages (custom domain `medbridge.am`)
- **CI**: GitHub Actions — `.github/workflows/deploy.yml`

## Layout

```
MedBridge/
├── web/                  ← Vite app (React, TS, Tailwind)
│   ├── src/              ← components, sections, hooks, data, lib
│   ├── public/           ← static (favicons, privacy.html, terms.html, robots.txt, sitemap.xml, og.jpg)
│   └── package.json
├── apps-script/
│   └── Code.gs           ← Google Apps Script (form backend)
├── doc/
│   ├── info.md           ← source-of-truth copy from the client
│   └── setup-form-backend.md  ← how to deploy / redeploy the Apps Script
├── .github/workflows/
│   └── deploy.yml        ← build & publish to GitHub Pages
└── README.md
```

## Local development

```powershell
cd web
npm ci
npm run dev        # http://localhost:5173
```

Other scripts:

```powershell
npm run build      # tsc -b && vite build → web/dist
npm run lint       # eslint .
npm run preview    # serve the built dist locally
```

### Configuring the form

The Apply form posts JSON to a Google Apps Script Web App. The endpoint is injected at build time:

```bash
# web/.env.local (gitignored)
VITE_FORM_ENDPOINT=https://script.google.com/macros/s/.../exec
```

If `VITE_FORM_ENDPOINT` is empty, the form falls back to opening the user's email client (`mailto:`) — useful for local QA.

See [doc/setup-form-backend.md](doc/setup-form-backend.md) for the full step-by-step (deploy script, set Script Properties, wire the env var into GitHub Pages).

## Deployment

Push to `main` → GitHub Actions builds `web/` and publishes `web/dist` to GitHub Pages. The custom domain is wired via the `CNAME` file in the deployed bundle.

The production `VITE_FORM_ENDPOINT` is read from a **repository variable** (Settings → Secrets and variables → Actions → Variables).

## Editing content

- **Copy** (hero, sections, FAQ, pricing): edit the matching component in `web/src/components/sections/`.
- **Specialty list** (drives the grid, the filter chips and the Apply form's `<select>`): [web/src/data/specialties.ts](web/src/data/specialties.ts).
- **Source of truth from the client**: [doc/info.md](doc/info.md).

## Design tokens

Defined in [web/src/index.css](web/src/index.css) (`@theme` block):

| Token         | Value     | Use                                |
|---------------|-----------|------------------------------------|
| `ink`         | `#0E1726` | Primary text, dark sections        |
| `bone`        | `#F5F1EA` | Main background                    |
| `paper`       | `#FBF8F2` | Cards / alt sections               |
| `claret`      | `#1B3A6A` | Primary CTAs, accents (navy)       |
| `sage`        | `#B8924A` | Trust cues, gold success accent    |
| `gold`        | `#1FA8A4` | Teal highlights                    |

Type pairing: **Fraunces** (display, variable serif) + **Inter** (UI/body), loaded from Google Fonts.

## Browser support

Modern evergreen browsers (Chrome 100+, Edge 100+, Firefox 100+, Safari 15+). Layout degrades gracefully without JS — all content is visible; only filters, accordion and form submission require JS.
