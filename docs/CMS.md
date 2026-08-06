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

## Publish → live site

Pages are static. Wire:

1. Netlify **Build hook**
2. Sanity webhook on create/update/delete for `story`, `announcement`, `chronicleEdition`, `event`, `programInitiative` → that hook

Optional: daily scheduled rebuild so upcoming/past event buckets stay accurate.

## Demo seed (local)

```bash
npm run seed:sanity
```

Upserts sample stories, announcements, chronicles, events, and initiatives (ids prefixed `demo.*`) into the configured dataset. Safe to re-run; delete those docs in Studio when you no longer need them.

## Tokens

- Public project id + dataset are safe to expose.
- **`SANITY_API_WRITE_TOKEN`** (also accepts `SANITY_API_TOKEN`): put only in **`.env.local`** (gitignored).
  - Create at Sanity Manage → API → Tokens → add token with **Editor** (or Admin) rights.
  - Enables local API writes / seed scripts via `sanityWriteClient` in `sanity/lib/client.ts`.
  - Server fetches prefer this client when present (no CDN lag while authoring).
- Never put the write token on Netlify or in `NEXT_PUBLIC_*` vars.
