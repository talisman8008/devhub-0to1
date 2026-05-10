# Verification Notes

Date: 2026-05-10

## Frontend
- Scroll-synced Journey timeline animation:
  - `npm.cmd run type-check -w frontend`: passed.
  - `npm.cmd run lint -w frontend`: passed.
  - `npm.cmd run build -w frontend`: passed.
  - Headless Chrome DevTools desktop probe confirmed `--journey-progress` changed from `0.3338` to `0.5214` while scrolling the Journey section.
  - Desktop active line evidence: `--journey-progress-y` moved from `33.38%` to `52.14%`, active line height from `591.188px` to `923.453px`, dot display `block`.
  - Mobile probe at 390px confirmed simplified left rail: `markerLeft: 28px`, active line and dot display `block`, `--journey-progress: 0.3302`.
  - Reduced-motion emulation confirmed active line and moving dot are hidden: `activeDisplay: none`, `dotDisplay: none`, `--journey-progress: 0.0000`.
  - Temporary verification screenshots captured at `C:\Users\HP\AppData\Local\Temp\devhub-journey-verify\desktop-journey-mid.png` and `C:\Users\HP\AppData\Local\Temp\devhub-journey-verify\mobile-journey.png`.
  - Follow-up tuning delayed the Journey progress curve so the line does not appear mostly completed before the roadmap cards are scrolled.
  - `npm.cmd run type-check -w frontend`: passed after progress tuning.
  - `npm.cmd run build -w frontend`: passed after progress tuning.
  - `..\node_modules\.bin\eslint.cmd components/animation-boot.tsx --max-warnings=0`: passed after progress tuning.
  - Second follow-up tuning moved the Journey progress start lower in the viewport and slightly extended the travel distance for a slower line fill.
- Animation smoothness fix:
  - `node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run type-check -w frontend`: passed.
  - `node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run lint -w frontend`: passed.
  - `node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run build -w frontend`: passed.
  - Headless Chrome screenshot captured nonblank desktop hero smoke at `.codex-temp/animation-check/desktop-hero.png`.
  - Headless Chrome screenshot captured mobile hero at `.codex-temp/animation-check/mobile-hero.png`.
  - Headless Chrome DevTools scroll probe on `http://localhost:3000`: `#about` visible after scrolling, `scrollY: 854`, `navDark: true`, canvas size `749x680`, reveal transform `matrix(1, 0, 0, 1, 0, 0)`.
- `node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run lint --workspace frontend --cache .\.npm-cache`: passed.
- `node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run type-check --workspace frontend --cache .\.npm-cache`: passed.
- `node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run build --workspace frontend --cache .\.npm-cache`: passed.
- Expanded waitlist panel desktop screenshot: `codes/verification-screenshots/waitlist-expanded-desktop-cdp.png`.
- Expanded waitlist panel mobile screenshot: `codes/verification-screenshots/waitlist-expanded-mobile-cdp.png`.
- Headless Chrome visual verification confirmed the full "Secure Your Future" panel, rounded glass inputs, responsive mobile headline without clipping, and final CTA button styling.
- Synthetic headless form filling did not reliably update React controlled input state; API submission was verified directly with the same expanded payload.
- Screenshots:
  - `codes/verification-screenshots/hero.png`
  - `codes/verification-screenshots/about.png`
  - `codes/verification-screenshots/outcomes.png`
  - `codes/verification-screenshots/journey.png`
  - `codes/verification-screenshots/waitlist.png`
  - `codes/verification-screenshots/mobile.png`
  - `codes/verification-screenshots/hero-font-check-2.png`

## Backend API
- `node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run type-check --workspace backend --cache .\.npm-cache`: passed.
- `node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run build --workspace backend --cache .\.npm-cache`: passed.
- `node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" audit --audit-level=low --workspace backend --cache .\.npm-cache`: `found 0 vulnerabilities`.
- `GET /health`: `200`, success `true`, `X-RateLimit-Limit: 100`.
- `POST /api/waitlist` full expanded payload after Supabase column update: `201`, success `true`.
- `POST /api/waitlist` repeated full expanded payload: `409 DUPLICATE_EMAIL`.
- `POST /api/waitlist` missing `fullName`: `422 VALIDATION_ERROR`.
- `POST /api/waitlist` email-only body: `422 VALIDATION_ERROR`.
- `POST /api/waitlist` fresh valid email after Supabase schema setup: `201`, success `true`.
- `POST /api/waitlist` repeated same email after Supabase schema setup: `409 DUPLICATE_EMAIL`.
- `POST /api/waitlist` invalid email: `422 VALIDATION_ERROR`, route limit header present.
- `POST /api/waitlist` unexpected field: `422 VALIDATION_ERROR`, strict schema rejection confirmed.
- `POST /api/waitlist` malformed JSON: `400 INVALID_JSON`, global limit header present.
- `GET /api/waitlist`: `405 METHOD_NOT_ALLOWED`.
- `GET /missing-route`: `404 NOT_FOUND`.
- Repeated waitlist requests: `429 RATE_LIMITED`, `Retry-After: 900`, route limit header present.
- CORS allowed origin response uses `Access-Control-Allow-Origin: http://localhost:3000`.
- Bad-origin browser requests are not granted their own origin; response remains configured to `http://localhost:3000`.
- Earlier live insert blocker was resolved by applying `codes/backend/supabase/schema.sql` through the Supabase dashboard.

## Security
- `npm audit --audit-level=low --cache .\.npm-cache`: `found 0 vulnerabilities`.
- `npm audit --audit-level=low --workspace frontend --workspace backend --cache .\.npm-cache`: `found 0 vulnerabilities`.
- Secret scan for Supabase JWTs, direct Postgres URLs, Context7 keys, Perplexity keys, TestSprite keys, and publishable Supabase keys: no matches in source.
- Service role key is referenced only as `process.env.SUPABASE_SERVICE_ROLE_KEY` on the backend.
- Frontend uses only `NEXT_PUBLIC_API_URL` and does not write directly to Supabase.
- `DOCUMENTATION/`, `SCREENSHOTS/`, and `codes/backend/.env.local` are confirmed ignored by git.
- No verification backend process was left running on port `4000`.

## Deployment Prep
- `node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run lint`: passed.
- `node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run type-check`: passed.
- `node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run build`: passed.
- `node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" audit --audit-level=low`: `found 0 vulnerabilities`.
- Secret scan over git-included files: no Supabase JWTs, Supabase publishable keys, direct Postgres URLs, Context7 keys, Perplexity keys, TestSprite keys, or Google API keys found.
- `codes` repository remote: `https://github.com/WisdomKingAR/DevHub_0to1.git`.
- Added deployment artifacts at repo root: `README.md`, `DEPLOYMENT.md`, and `render.yaml`.
- Render deploy failure diagnosis: `NODE_ENV=production` caused npm to omit dev dependencies required by TypeScript build.
- Updated Render build command to `npm ci --include=dev && npm run build -w backend`.
- `node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run build -w backend`: passed after build command update.
- Production backend health endpoint reached at `https://zeroto1-devhub-api.onrender.com/health`: `200`.
- CORS check before fix returned `Access-Control-Allow-Origin: http://localhost:3000`; `render.yaml` now sets `FRONTEND_ORIGIN` to `https://dev-hub-0to1-frontend.vercel.app`.
- After manual Render env update, CORS health request returns `Access-Control-Allow-Origin: https://dev-hub-0to1-frontend.vercel.app`.
- Production preflight `OPTIONS /api/waitlist`: `204`, allows `GET,POST,OPTIONS` and `Content-Type`.
- Production `POST /api/waitlist` full payload: `201`, success `true`.
- Production duplicate `POST /api/waitlist` same email: `409 DUPLICATE_EMAIL`.
- Production Vercel bundle API URL check: `https://zeroto1-devhub-api.onrender.com` found, old `https://0to1-devhub-api.onrender.com` not found.
- User-confirmed live form submission works after Vercel env update and redeploy.
- cron-job.org keep-awake job configured for `https://zeroto1-devhub-api.onrender.com/health` every 5 minutes.
- cron-job.org test run returned `200 OK`.
