# 0to1 DevHub

0to1 DevHub is a landing page plus secure waitlist backend for the 0to1 startup program. The frontend is a Next.js app with a high-fidelity 0to1-style landing experience, smooth scrolling, motion polish, a smoke/liquid hero feel, and an expanded waitlist form. The backend is an Express API that validates submissions and writes them to Supabase using a server-only service role key.

## Project Structure

This GitHub repository root is the `codes` folder.

```text
.
├── frontend/                 # Next.js App Router frontend
├── backend/                  # Express + TypeScript API
├── .gsd/                     # Project-local GSD state and verification notes
├── DEPLOYMENT.md             # Production deployment runbook
├── render.yaml               # Render backend blueprint
├── package.json              # npm workspaces root
└── README.md
```

Shared toolkit folders outside this repo are reference-only and must not be edited.

## Stack

- Frontend: Next.js 16, React 18, Tailwind CSS, Lenis, Anime.js, Three.js, Lucide icons
- Backend: Express 5, TypeScript, Zod, Helmet, CORS, Supabase JS
- Database: Supabase Postgres

## Features

- Responsive 0to1 landing page
- White hero with smoke/liquid visual treatment
- Dark glass sections with neon aqua accents
- Smooth scrolling and reduced-motion-safe animations
- Expanded waitlist panel:
  - Full Name
  - Contact Number
  - Mail
  - College Name
  - City
  - Course Background
- Secure backend waitlist API
- Strict schema validation with unknown-field rejection
- Rate limiting on public endpoints
- Server-only Supabase writes
- Duplicate email handling

## Prerequisites

- Node.js
- npm
- A Supabase project

Install dependencies from this repo root:

```bash
npm install
```

## Environment Setup

Create local env files from the examples. Do not commit real secrets.

Frontend:

```bash
cp frontend/.env.example frontend/.env.local
```

Expected frontend values:

```env
NEXT_PUBLIC_API_URL="http://localhost:4000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

Backend:

```bash
cp backend/.env.example backend/.env.local
```

Expected backend values:

```env
SUPABASE_URL="https://YOUR_PROJECT_ID.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-server-only-service-role-key"
IP_HASH_SALT="replace-with-a-long-random-secret"
FRONTEND_ORIGIN="http://localhost:3000"
TRUST_PROXY="false"
PORT="4000"
```

Security notes:

- `SUPABASE_SERVICE_ROLE_KEY` must stay backend-only.
- Only `NEXT_PUBLIC_*` values are exposed to the browser by Next.js.
- Rotate any credentials that were pasted into chat before deployment.

## Supabase Setup

Open your Supabase project, go to SQL Editor, and run the schema from:

```text
backend/supabase/schema.sql
```

The current schema creates and updates the `public.waitlist` table, enables Row Level Security, blocks anon select/insert access, and reloads the PostgREST schema cache.

Core table fields:

```text
id
email
full_name
contact_number
college_name
city
course_background
created_at
source
ip_hash
```

The frontend does not write directly to Supabase. All waitlist writes go through the Express API using the server-side service role key.

## Development

Run both apps:

```bash
npm run dev
```

Or run them separately:

```bash
npm run dev:frontend
npm run dev:backend
```

Local URLs:

```text
Frontend: http://localhost:3000
Backend health: http://localhost:4000/health
```

Opening `http://localhost:4000/` returns `404_NOT_FOUND`. That is expected because the backend has no homepage route.

## Deployment

Deployment uses Vercel for the frontend, Render for the backend, and the existing Supabase project for the database.

Follow the production runbook in [DEPLOYMENT.md](DEPLOYMENT.md). Keep all production secrets in Vercel/Render environment variables only.

## API

### `GET /health`

Returns:

```json
{
  "success": true,
  "status": "ok",
  "service": "0to1-backend"
}
```

### `POST /api/waitlist`

Accepts only this strict JSON shape:

```json
{
  "fullName": "Student Name",
  "contactNumber": "+91 9876543210",
  "email": "student@example.com",
  "collegeName": "College Name",
  "city": "Mumbai",
  "courseBackground": "BTech AI & DS"
}
```

Expected responses:

```text
201 CREATED              Waitlist row created
409 DUPLICATE_EMAIL      Email already exists
422 VALIDATION_ERROR     Invalid, missing, or unexpected fields
429 RATE_LIMITED         Too many requests
400 INVALID_JSON         Malformed JSON or wrong content type
405 METHOD_NOT_ALLOWED   Non-POST waitlist request
404 NOT_FOUND            Unknown route
500 SERVER_ERROR         Generic server-side failure
```

## Verification Commands

Run static checks:

```bash
npm run lint
npm run type-check
npm run build
npm audit --audit-level=low
```

Backend smoke test:

```bash
curl http://localhost:4000/health
```

Example waitlist request:

```bash
curl -i -X POST http://localhost:4000/api/waitlist \
  -H "Content-Type: application/json" \
  -d "{\"fullName\":\"Test User\",\"contactNumber\":\"+91 9876543210\",\"email\":\"test-user@example.com\",\"collegeName\":\"DevHub Institute\",\"city\":\"Mumbai\",\"courseBackground\":\"BTech Computer Science\"}"
```

## Security Posture

Implemented:

- Helmet security headers
- `x-powered-by` disabled
- Strict CORS using `FRONTEND_ORIGIN`
- JSON body size limit
- Global and route-level rate limiting
- `Retry-After` for rate-limited responses
- Strict Zod schema validation
- Unknown-field rejection
- Server-only Supabase service role client
- `persistSession: false`, `autoRefreshToken: false`, `detectSessionInUrl: false`
- IP hashing with `IP_HASH_SALT`
- Generic server errors with no secret leakage

Before deployment:

- Rotate any credentials that were shared during development.
- Use production secrets from the deployment environment, not source files.
- Re-run the verification commands and security review.
- Consider Redis/Upstash-backed rate limiting if running multiple backend instances.

## Troubleshooting

### Frontend says "Something went wrong. Please try again."

Check that the backend is running:

```bash
curl http://localhost:4000/health
```

If it cannot connect, start the backend:

```bash
npm run dev:backend
```

### Backend root shows `404_NOT_FOUND`

That is expected. Use:

```text
http://localhost:4000/health
```

### Supabase says a column or table is missing

Run the latest SQL from:

```text
backend/supabase/schema.sql
```

Then run:

```sql
NOTIFY pgrst, 'reload schema';
```

### Duplicate email returns `409`

That is expected. The `email` column is unique so each email can join once.

## Project Evidence

Project-local evidence lives in:

```text
.gsd/STATE.md
.gsd/VERIFICATION.md
security-reports/security-report-2026-05-10.md
verification-screenshots/
```
