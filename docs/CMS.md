# Sanity CMS (editorial publishing)

Secretariat content is managed in **Sanity Studio** at [`/admin`](https://rsamdio.org/admin).

## What lives in Sanity

- Stories
- Announcements
- RSA Chronicles editions
- Events
- Initiatives (`programInitiative` — Studio Structure label **Initiatives**)

## What stays on disk

- Member districts / clubs CSVs (`data/`) → JSON on build
- Leadership, site chrome, history, legal, digital-ecosystem platforms (`config/platformTools.ts`)
- Initiative **seed / fallback** only: `config/initiatives.ts` (used when Sanity is not configured)

## Setup

1. Project is already linked: `gsebaki2` / `production` (see `netlify.toml` + `.env.local`).
2. Local: copy `.env.example` → `.env.local` (or use the existing file) and add `SANITY_API_WRITE_TOKEN` if you need API writes.
3. `npm run dev` → open http://localhost:3000/admin
4. Invite editors in Sanity Manage (Editor role). Prefer **Google** login.
5. Until a project id is set (or with `USE_FS_CONTENT=1`), the site uses static seeds in `config/news.ts`, `config/events.ts`, and `config/initiatives.ts`.

## Markdown preview

Body fields use EasyMDE via `MarkdownBodyInput`. Preview HTML comes from the same `renderMarkdown` helper as public pages (`lib/markdown.ts`), styled with `styles/markdown-preview.css` (also imported by the site). Keep those two files as the single source of truth for body appearance.

## Netlify

Public Sanity vars live in **`netlify.toml`** `[build.environment]` — no need to re-enter them in the Netlify UI:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`

Never add `SANITY_API_WRITE_TOKEN` to Netlify or `netlify.toml`.

## Search & social (SEO)

Stories, announcements, events, and initiatives include an optional **Search & social** fieldset (`seo`):

- `title` — overrides document title in `<title>` / Open Graph (max ~60)
- `description` — overrides card teaser for SERP/social (max 160)
- `ogImage` — share image; else hero image; else site default `/img/og-default.webp`

Leave blank to use title + excerpt/tagline/summary. Do **not** claim RSAMDIO governs districts. Chronicle editions have **no** on-site SEO pages (external reader URLs on Publications Hub).

Canonical meta and JSON-LD live in `lib/seo.ts`. Definitional copy for Organization schema comes from `siteConfig.description`.

## Publish → live site (On-Demand ISR Webhook)

Publishing uses **On-Demand Incremental Static Regeneration (ISR)** via Next.js App Router (`/api/revalidate`), eliminating full CI/CD builds for editorial updates while updating live pages in under 1 second.

### Setup in Sanity Manage (`sanity.io/manage` → Project `gsebaki2` → API → Webhooks):

1. **Name:** `RSAMDIO Live Revalidate`
2. **URL:** `https://rsamdio.org/api/revalidate`
3. **Dataset:** `production`
4. **Trigger on:** Create, Update, Delete
5. **Filter:**
   ```groq
   !(_id in path("drafts.**")) && _type in ["story", "announcement", "chronicleEdition", "event", "programInitiative", "category", "tag", "eventKind", "initiativeIcon"]
   ```
6. **Projection:**
   ```groq
   {
     _type,
     "slug": coalesce(slug.current, before().slug.current),
     "previousSlug": before().slug.current
   }
   ```
7. **Secret:** Generate a random 32-character secret. Enter it in Sanity Manage and add it as **`SANITY_REVALIDATE_SECRET`** in Netlify (`Site configuration → Environment variables`) and `.env.local`.

Live updates are instantaneous (< 1s) and consume 0 Netlify build minutes. IndexNow is also automatically alerted with only the exact URLs that changed.

Code deployments (Git pushes) and member CSV updates continue to run full builds via Netlify CI as normal.

## Tokens

- Public project id + dataset are safe to expose.
- **`SANITY_API_WRITE_TOKEN`** (also accepts `SANITY_API_TOKEN`): put only in **`.env.local`** (gitignored).
  - Create at Sanity Manage → API → Tokens → add token with **Editor** (or Admin) rights.
  - Optional: enables fresher local server fetches via `sanityWriteClient` in `sanity/lib/client.ts` (no CDN lag while authoring).
  - Server fetches prefer this client when present.
- Never put the write token on Netlify or in `NEXT_PUBLIC_*` vars.
