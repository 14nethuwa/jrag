# JRAG

JRAG is a Next.js App Router project scaffold for the approved JRAG public website and admin back-office architecture.

## Current State

- route-first Next.js scaffold is in place
- public, utility, legal, and admin routes are created
- pages are intentionally minimal placeholders
- information architecture and route planning docs live in `docs/ia/`

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `components/` - minimal shared scaffold components
- `scripts/verify-routes.cjs` - route-file verification script
- `docs/ia/` - source-of-truth IA, routes, page briefs, and diagrams

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run linting:

```bash
npm run lint
```

Build the app:

```bash
npm run build
```

## Key Documentation

- `docs/ia/navigation-schema.json`
- `docs/ia/routes.md`
- `docs/ia/page-briefs.md`
- `docs/ia/homepage-structure.md`
- `docs/ia/landing-pages.md`
- `docs/ia/admin-architecture.md`
- `docs/ia/implementation-checklist.md`
- `docs/ia/public-sitemap-derived.mmd`
- `docs/ia/admin-sitemap.mmd`
