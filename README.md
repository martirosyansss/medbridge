# MedBridge — Landing Page

Premium-editorial landing page for **MedBridge**, the international medical shadowing & clinical experience programme at Astghik Medical Center, Yerevan, Armenia.

Static HTML + Tailwind (via CDN) + vanilla JavaScript. No build step.

---

## Preview locally

Just open `index.html` in any modern browser, or serve the folder over HTTP:

```powershell
# PowerShell, from f:\New Softs\MedBridge
python -m http.server 8000
# then open http://localhost:8000
```

```bash
# Or with Node, if installed
npx serve .
```

---

## Project layout

```
MedBridge/
├── index.html           ← all page sections, Tailwind config inline
├── assets/
│   ├── styles.css       ← component classes & animations Tailwind can't express
│   └── app.js           ← nav, filters, FAQ, form, reveal animations
├── doc/
│   └── info.md          ← source-of-truth copy from the client
└── README.md            ← this file
```

---

## What you need to swap before going live

### 1. Formspree endpoint (required for real submissions)

Open `index.html` and find:

```html
<form id="apply-form" ... action="https://formspree.io/f/REPLACE_ME" method="POST" ...>
```

1. Create a free form on [formspree.io](https://formspree.io/) and verify the receiving email.
2. Copy the form's endpoint (looks like `https://formspree.io/f/abcdwxyz`).
3. Replace `https://formspree.io/f/REPLACE_ME` with your real endpoint.

While the placeholder is in place, the form **simulates** a successful submission so the UI is testable — the data is not sent anywhere. The simulation is implemented in [assets/app.js](assets/app.js) (look for `usingPlaceholder`).

### 2. Contact email

Two places to update from the placeholder `hello@medbridge.am`:

- `index.html` — "Prefer to talk first?" block in the Apply section
- `index.html` — Footer contact block
- `assets/app.js` — error message fallback ("…or email hello@medbridge.am")

### 3. Imagery (recommended)

The hero and Yerevan sections use Unsplash placeholder images. To swap them for branded photography, find these `<img>` tags in `index.html`:

- Hero photo (surgeons in OR) — search for `photo-1551601651-2a8555f1a136`
- Yerevan / Mount Ararat — search for `photo-1641914094934-ce7ec0acedb7`

Replace the `src` URL with your photo (use 4:5 portrait crop for the hero, similar for Yerevan). The page includes a graceful **CSS-only fallback** if an image fails to load — you'll see a coloured editorial card instead of a broken image icon.

### 4. Domain & social meta

In `<head>`:
- `<link rel="canonical" href="https://medbridge.example/" />` — set to your real domain.
- `og:image` — points to the hero photo; update if you swap imagery.

---

## Editing content

All copy comes from [doc/info.md](doc/info.md). The 24 specialties are defined as a data array at the top of [assets/app.js](assets/app.js):

```js
const SPECIALTIES = [
  { name: 'Maxillofacial Surgery', cats: ['surgical'], procs: [...] },
  ...
];
```

Add/edit specialties there — the grid, filter chips, and form `<select>` will all update automatically. Categories used by filter chips: `surgical`, `cardio`, `neuro`, `womens`, `diagnostic`, `other`.

---

## Design system

Defined inline in `index.html` (Tailwind config) and `assets/styles.css`:

| Token   | Value      | Use                              |
|---------|------------|----------------------------------|
| `ink`   | `#0E1726`  | Primary text, dark sections      |
| `bone`  | `#F5F1EA`  | Main background                  |
| `paper` | `#FBF8F2`  | Cards / alt sections             |
| `claret`| `#7A1F2B`  | Primary CTAs, accents            |
| `sage`  | `#3F5B4A`  | Trust cues, secondary accent     |
| `gold`  | `#B8924A`  | Subtle highlights                |

Type pairing: **Fraunces** (display, variable serif) + **Inter** (UI/body), both loaded from Google Fonts.

---

## Browser support

Modern evergreen browsers (Chrome 100+, Edge 100+, Firefox 100+, Safari 15+). Uses `IntersectionObserver`, CSS Grid, `backdrop-filter`, and the `inset` property. Layout degrades gracefully without JS — all content is visible; only filters, accordion, and form submission require JS.

---

## Acknowledgements

- Type: Fraunces by Phaedra Charles & David Berlow; Inter by Rasmus Andersson
- Placeholder photography: [Unsplash](https://unsplash.com/)
- Tailwind CSS: [tailwindcss.com](https://tailwindcss.com/)
