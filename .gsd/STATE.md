# 0to1 DevHub MVP State

## Current Position
- Phase: MVP implementation
- Status: Expanded animated waitlist panel complete; full-form Supabase insert verified

## Constraints
- Shared toolkit folders are read-only references.
- Context7 was used for current Next.js, Express, Supabase, and Zod implementation guidance.
- Stitch UI design skill was used for responsive frontend polish.
- Secrets must remain in local environment files only.

## Latest Snapshot

**Objective:** Smooth frontend scrolling and remove jumpy section reveals.

**Changes:**
- Optimized the hero smoke canvas to cache sizing, cap redraw work, and pause when hidden/off-screen.
- Tuned Lenis so it uses a lighter lerp, pauses while the tab is hidden, and skips coarse-touch devices.
- Throttled nav scroll-state updates with `requestAnimationFrame`.
- Changed section reveal behavior from vertical movement to opacity-only reveal, removing the small jump seen while scrolling.

**Verification:**
- `npm run type-check -w frontend`: passed.
- `npm run lint -w frontend`: passed.
- `npm run build -w frontend`: passed.
- Headless Chrome DevTools scroll probe: `#about` visible after scroll, nav dark state active, hero canvas nonblank, reveal transform final state `matrix(1, 0, 0, 1, 0, 0)`.

**Risks/Debt:**
- Manual browser feel-check is still recommended before pushing to production because animation smoothness is partly device/GPU-dependent.

**Objective:** Prepare `codes` repo root for production deployment.

**Changes:**
- Added `codes/render.yaml` Render blueprint for the Express backend.
- Added `codes/DEPLOYMENT.md` with Vercel, Render, Supabase, CORS, and smoke-test steps.
- Added `codes/README.md` for the GitHub repo root.

**Verification:**
- `npm run lint`: passed.
- `npm run type-check`: passed.
- `npm run build`: passed.
- `npm audit --audit-level=low`: 0 vulnerabilities.
- Secret scan over git-included files: no Supabase JWTs, publishable keys, DB URLs, Context7 keys, Perplexity keys, TestSprite keys, or Google API keys found.
- `codes` git remote is `https://github.com/WisdomKingAR/DevHub_0to1.git`.

**Risks/Debt:**
- Production deployment still requires entering secrets manually in Render and public frontend URLs in Vercel/Render.
- Rotate pasted credentials before serious public launch.

## Render Build Fix Snapshot

**Objective:** Fix Render backend deployment failure during TypeScript build.

**Changes:**
- Updated Render backend build command to `npm ci --include=dev && npm run build -w backend` so TypeScript and Express type packages are available during build even with `NODE_ENV=production`.
- Updated deployment guide to match the Render blueprint.

**Verification:**
- `npm run build -w backend`: passed locally.
- Secret scan over deployment docs/config/GSD: no known key patterns found.

## Production CORS Snapshot

**Objective:** Point Render backend CORS to the deployed Vercel frontend.

**Changes:**
- Updated `render.yaml` `FRONTEND_ORIGIN` from a manual sync value to the public Vercel URL.
- Updated deployment guide with the current production frontend origin.

**Verification:**
- Backend `/health` was live before this change.
- CORS previously returned `http://localhost:3000`; this commit is intended to trigger a Render blueprint sync/redeploy with `https://dev-hub-0to1-frontend.vercel.app`.

## Production Smoke Test Snapshot

**Objective:** Verify deployed frontend/backend integration after Render env update.

**Verification:**
- `GET https://zeroto1-devhub-api.onrender.com/health`: `200`, `success: true`.
- CORS health request from `https://dev-hub-0to1-frontend.vercel.app`: `Access-Control-Allow-Origin` matches the Vercel origin.
- `OPTIONS /api/waitlist` preflight from Vercel origin: `204`, correct CORS methods and headers.
- `POST /api/waitlist` with full payload from Vercel origin: `201`.
- Repeated same production payload: `409 DUPLICATE_EMAIL`.
- Vercel environment was corrected from the old API URL to `https://zeroto1-devhub-api.onrender.com`.
- Deployed frontend bundle now contains the correct backend URL and no longer contains the old wrong API URL.

## Uptime Cron Snapshot

**Objective:** Keep the Render free backend warm.

**Operational Setup:**
- External cron provider: cron-job.org.
- Schedule: every 5 minutes.
- Target: `https://zeroto1-devhub-api.onrender.com/health`.

**Verification:**
- cron-job.org test run returned `200 OK`.
- Test response included expected backend/CORS headers.

## Previous Snapshot

**Objective:** Add the missing screenshot-style waitlist panel, micro animations, and expanded waitlist data capture.

**Changes:**
- Rebuilt the final waitlist section as a dark glass "Secure Your Future" panel matching the provided screenshot.
- Added full form fields: full name, contact number, mail, college name, city, and course background.
- Added micro-interactions for section reveal, title/form stagger, card hover lift, input focus glow, and submit arrow movement.
- Extended backend Zod validation and Supabase insert mapping for the full form payload.
- Updated `codes/backend/supabase/schema.sql` with the new columns and PostgREST schema reload notification.

**Verification:**
- `npm run lint --workspace frontend`: passed.
- `npm run type-check --workspace frontend`: passed.
- `npm run build --workspace frontend`: passed.
- `npm run type-check --workspace backend`: passed.
- `npm run build --workspace backend`: passed.
- `npm audit --audit-level=low --workspace frontend --workspace backend`: 0 vulnerabilities.
- Expanded API matrix passed for health, full-form valid insert, duplicate email, missing required field, and email-only strict rejection.
- Desktop and mobile screenshots captured for the expanded waitlist panel.
- Secret scan for pasted keys/JWT/DB URL patterns: no matches in source.
- `DOCUMENTATION/`, `SCREENSHOTS/`, and `codes/backend/.env.local` are ignored.

**Risks/Debt:**
- Rotate pasted Supabase/database credentials before any non-local deployment.
- Headless Chrome synthetic form filling was unreliable for React controlled inputs; the public API path was verified directly with the same expanded payload.
