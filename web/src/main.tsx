import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import '@fontsource-variable/fraunces'
import './index.css'
import App from './App.tsx'

// Cancel the no-hydration failsafe set by the inline script in index.html.
window.clearTimeout(window.__mbRevealFailsafe)

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Production HTML is prerendered by scripts/prerender.mjs, so we hydrate.
// In `vite dev` the container is empty and we render from scratch.
if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
