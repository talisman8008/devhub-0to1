# 0to1 DevHub MVP Spec

> **Status**: `FINALIZED`

## Vision
Build a polished, responsive 0to1 by DevHub landing page that closely matches the authorized `0to1.wtf` visual reference, with a secure waitlist capture flow.

## Goals
- Present the program clearly through a single-page landing experience.
- Match the authorized 0to1.wtf look: white smoke hero, oversized black headline, dark neon sections, cards, timeline, and CTA.
- Capture waitlist emails through a separate backend API.
- Keep Supabase service credentials server-only.
- Verify implementation with concrete build, API, browser, and security evidence.

## Non-Goals
- User accounts, authentication, dashboards, payments, CMS, or admin panels.
- Editing shared GSD, ANTIGRAVITY SKILLS, or SKILL folders.

## Success Criteria
- Frontend runs at `http://localhost:3000`.
- Backend runs at `http://localhost:4000`.
- `POST /api/waitlist` validates input, rate limits abuse, and inserts through Supabase when env is configured.
- Responsive UI matches the authorized 0to1.wtf reference direction across desktop and mobile.
- Security review finds no hardcoded secrets in source and no client-side service role exposure.
