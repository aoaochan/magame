# AGENTS.md — Working Rules for Codex

These instructions apply to the entire repository. Follow them whenever you edit or add files.

## Scope & Goals
- Keep the project’s current toolchain and structure intact unless the user requests changes.
- Make minimal, focused diffs; don’t refactor broadly without being asked.
- Prefer clarity and reproducibility over cleverness.

## Tech Stack (do not change unless asked)
- Package manager: pnpm (use repo scripts; do not switch to npm/yarn).
- Desktop runtime: Electron 38.
- Desktop dev: Electron Forge (start/package/make).
- Desktop distribution: electron-builder (mac ZIP, win portable EXE).
- App build model:
  - Main/Preload: TypeScript compiled by `tsc` to CJS in `build/`.
  - Renderer (Electron): TypeScript bundled by esbuild to ESM in `build/frontend/renderer.js`.
- Web build/dev: Vite from `src/web` to `www/`.

## Directory Conventions
- `src/backend`   → Electron main process (TypeScript, CJS output to `build/backend`).
- `src/frontend`  → Electron renderer assets (ESM) and preload. HTML is copied to `build/frontend`.
- `src/web`       → Web-only renderer (served/built by Vite to `www/`).
- `src/types`     → Global/ambient type declarations (e.g., `window.versions`).
- Do not relocate these folders unless requested.

## Build & Scripts
- Use existing scripts; add new ones with clear prefixes:
  - Electron app: `app:*` (e.g., `app:build`, `app:dev`, `app:dist:*`).
  - Web: `web:*`.
  - Cleaning: `clean:*`.
- When adding scripts that shell out, use `shx`/cross‑platform flags.
- Keep `.npmrc` with `node-linker=hoisted` (Forge requirement).

## Electron App Rules
- Main HTML path must resolve to `build/frontend/index.html` at runtime.
- Preload script path must resolve to `build/frontend/preload.js`.
- Preload imports must be from `electron` (NOT `electron/renderer`).
- Recommended security defaults when editing `BrowserWindow`:
  - `contextIsolation: true`, `sandbox: true`, `nodeIntegration: false`.
- IPC:
  - Expose only whitelisted methods via `contextBridge` in preload.
  - Validate inputs in `ipcMain.handle` handlers.

## Renderer (Electron) Rules
- Keep renderer as ESM bundled via esbuild; do not switch to CJS.
- If adding renderer TS files, ensure they are bundled by esbuild (not tsc).
- HTML must load renderer with `<script type="module" src="./renderer.js"></script>`.
- Global typing:
  - Augment `window` in `src/types/global.d.ts` (or reference it in source).
  - Use `tsconfig.renderer.json` (`pnpm run typecheck:renderer`) for IDE checks.

## Web (Vite) Rules
- Vite root: `src/web`; output: `www/`; `base: './'`.
- Don’t reference Electron-only globals (`window.versions`) in web code.
- Keep Vite separate from Electron renderer; share code only via a `src/shared/` module if requested.

## Distribution Rules
- macOS: `electron-builder` produces ZIP containing `.app` (no installer).
- Windows: `electron-builder` portable `.exe`; build on Windows/CI—don’t attempt on macOS unless user accepts Wine/extra setup.
- Don’t remove Forge config; Forge is used for dev and packaging.

## Changes & Quality
- Keep changes small and localized; don’t rename files or move directories unless necessary for the task.
- If you need additional assets (icons, etc.), place them under `assets/` and update `electron-builder` config accordingly.
- Provide sourcemaps in development when adding new bundles.
- Don’t add new tooling (linters/formatters/tests) unless requested; if added, wire into scripts consistently.

## CSP & External Resources
- Current HTML uses a strict CSP (`default-src 'self'; script-src 'self'`).
- If external assets are required, update CSP explicitly and explain the implications.

## Platform Notes
- Use pnpm scripts for all actions (`pnpm run …`).
- Don’t downgrade Electron or change major versions without approval.
- Prefer Windows runner/host to build Windows artifacts.