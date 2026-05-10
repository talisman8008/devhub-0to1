# Deployment Guide

This repository root is the `codes` folder.

- Frontend: Vercel, from `frontend`
- Backend: Render Web Service, from this repo root
- Database: existing Supabase project

Never commit real `.env` files, Supabase service-role keys, JWTs, database URLs, or database passwords.

## 1. Pre-Deploy Checks

Run from this repo root:

```bash
npm run lint
npm run type-check
npm run build
npm audit --audit-level=low
```

## 2. Backend On Render

Use the root `render.yaml` blueprint, or create a Web Service manually with:

- Runtime: Node
- Build command: `npm ci --include=dev && npm run build -w backend`
- Start command: `npm run start -w backend`
- Health check path: `/health`

Set these Render environment variables:

```env
NODE_ENV=production
TRUST_PROXY=1
FRONTEND_ORIGIN=https://your-vercel-domain.vercel.app
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<server-only-secret>
IP_HASH_SALT=<long-random-secret>
```

After the Render service is live, verify:

```bash
curl https://your-render-service.onrender.com/health
```

## 3. Frontend On Vercel

Import the same GitHub repository into Vercel and set:

- Framework preset: Next.js
- Root directory: `frontend`
- Build command: `npm run build`

Set these Vercel environment variables:

```env
NEXT_PUBLIC_API_URL=https://your-render-service.onrender.com
NEXT_PUBLIC_APP_URL=https://your-vercel-domain.vercel.app
```

Current production frontend origin:

```text
https://dev-hub-0to1-frontend.vercel.app
```

If the Vercel production URL changes, update Render `FRONTEND_ORIGIN` to exactly the new URL and redeploy the backend.

## 4. Production Smoke Tests

Replace the URLs before running:

```bash
curl https://your-render-service.onrender.com/health
curl -i -X POST https://your-render-service.onrender.com/api/waitlist \
  -H "Content-Type: application/json" \
  -H "Origin: https://your-vercel-domain.vercel.app" \
  -d "{\"fullName\":\"Deploy Test\",\"contactNumber\":\"9999999999\",\"email\":\"deploy-test@example.com\",\"collegeName\":\"Test College\",\"city\":\"Mumbai\",\"courseBackground\":\"B.Tech\"}"
```

Expected API behavior:

- Valid full form: `201`
- Duplicate email: `409 DUPLICATE_EMAIL`
- Invalid email or missing fields: `422 VALIDATION_ERROR`
- Too many requests: `429 RATE_LIMITED`
- Unknown route: `404 NOT_FOUND`

## 5. Security Checklist

- Service-role key exists only on Render.
- Frontend uses only `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_APP_URL`.
- Supabase row-level security remains enabled.
- Backend CORS allows only the deployed Vercel origin.
- Render `TRUST_PROXY=1` is set so rate limiting uses the proxy chain safely.
- Secrets are rotated before serious public launch if they were ever pasted into chat or stored outside a secrets manager.
