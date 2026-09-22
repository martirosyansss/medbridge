/// <reference types="vite/client" />

declare module "@fontsource-variable/inter"
declare module "@fontsource-variable/fraunces"

interface Window {
  /** Timer id set by the inline failsafe script in index.html (see main.tsx). */
  __mbRevealFailsafe?: number
}
