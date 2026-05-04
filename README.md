# ReadyAI Website

Marketing site and CMS for ReadyAI, an enterprise AI governance platform.

- **Frontend** — React 18 + TypeScript + Vite + Tailwind, deployed to Netlify (`readyai.dev`)
- **CMS** — Strapi 5 + PostgreSQL, deployed to Render (`readyai-strapi-cms.onrender.com`)
- **Auth** — Firebase
- **Forms** — Netlify Functions write to eWay CRM and send transactional email via Office 365 SMTP
- **Media** — Cloudinary

## Quick start

```bash
# Frontend
npm install
npm run dev          # http://localhost:5173

# CMS (separate terminal)
cd readyai-cms
npm install
npm run develop      # http://localhost:1337
```

Copy `.env` values from a teammate or the deployment dashboards. The frontend needs `VITE_FIREBASE_*` and `VITE_STRAPI_URL`. The CMS and Netlify Functions need their own — see [`docs/deployment.md`](docs/deployment.md).

## Layout

```
src/                  React app
  components/
    sections/         Page sections
    ui/               Reusable UI
    layout/           Header, Footer, ContactForm
  pages/              Route components
  hooks/              Shared hooks
  utils/              Helpers (Strapi client, animation, security)
  middleware/         Firebase init
  types/              Shared TS types

readyai-cms/          Strapi 5 backend (own package.json)
netlify/functions/    Serverless functions (eway-crm, send-email)
public/               Static assets
docs/                 Deployment + integration runbooks
```

## Scripts

| Command                   | What it does                          |
| ------------------------- | ------------------------------------- |
| `npm run dev`             | Vite dev server                       |
| `npm run build`           | Production build to `dist/`           |
| `npm run preview`         | Preview the production build          |
| `npm run lint`            | ESLint over `src/`                    |
| `npm test`                | Run Vitest test suite                 |
| `npm run security:audit`  | `npm audit`                           |

## Docs

- [`docs/strapi.md`](docs/strapi.md) — CMS architecture, custom controller, content types, deployment, cost analysis
- [`docs/deployment.md`](docs/deployment.md) — Netlify + Render deploy steps, required env vars, HubSpot tracking
- [`docs/eway-crm.md`](docs/eway-crm.md) — eWay CRM lead-form integration
- [`readyai-cms/README.md`](readyai-cms/README.md) — Strapi-specific notes
</content>
</invoke>