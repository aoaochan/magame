# magame

Electron + Web (Vite) app. Single renderer code is shared across desktop and web; platform specifics are abstracted behind a small API layer.

## Prerequisites
- Node.js 18+ (LTS recommended)
- pnpm 10+
- macOS for mac build; Windows machine/runner for Windows portable EXE

## Install
```
pnpm install
```

## Develop
- Desktop (Electron):
  - `pnpm start` (alias of `pnpm run app:dev`)
  - Hot rebuild of main/preload (tsc), renderer (esbuild), HTML copy; auto-reload is enabled
- Web (Vite):
  - `pnpm run web:dev` (opens http://localhost:5173)

## Build
- Desktop app (production assets):
  - `pnpm run app:build`
- Distribute (desktop installers/archives):
  - macOS ZIP: `pnpm run app:dist:mac` → `dist/`
  - Windows portable EXE: `pnpm run app:dist:win` (run on Windows) → `dist/`
- Web (static site):
  - `pnpm run web:build` → `www/`

## Useful Scripts
- Clean outputs: `pnpm run clean` (or `clean:app`, `clean:web`)
- Package via Forge: `pnpm run app:package`
- Make via Forge: `pnpm run app:make`
- Type-check renderer only: `pnpm run typecheck:renderer`

## Project Structure
```
src/
  backend/    # Electron main (TypeScript → build/backend)
  frontend/   # Shared renderer (ESM via esbuild) + preload + index.html
  platform/   # Platform adapters (electron/web) selected at runtime
  shared/     # Platform-agnostic interfaces/types
  web/        # (Optional) web entry for Vite (currently using frontend/ as root)
```
Outputs:
- `build/` (compiled/bundled app assets)
- `dist/` (electron-builder distributables)
- `www/` (Vite web build)

## Notes
- Windows builds are best produced on Windows (Wine on macOS/ARM is unreliable).
- `.npmrc` sets `node-linker=hoisted` for Electron Forge compatibility.
- See `AGENTS.md` for repo working rules. For developer workflow details, see CODEX.md (optional).
