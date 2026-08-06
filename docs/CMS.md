# Sanity CMS (editorial publishing)

Secretariat content is managed in **Sanity Studio** at [`/admin`](https://rsamdio.org/admin).

## What lives in Sanity
- Stories
- Announcements
- RSA Chronicles editions
- Events

## What stays on disk
- Member districts / clubs CSVs (`data/`) → JSON on build
- Leadership, site chrome, legal, initiatives platforms

## Setup
1. Project is already linked: `gsebaki2` / `production` (see `netlify.toml` + `.env.local`).
2. Local: copy `.env.example` → `.env.local` (or use the existing file) and add `SANITY_API_WRITE_TOKEN` if you need API writes.
3. `npm run dev` → open http://localhost:3000/admin
4. Invite editors in Sanity Manage (Editor role). Prefer **Google** login.
5. Until a project id is set, the site uses static seeds in `config/news.ts` and `config/events.ts` (`USE_FS_CONTENT` is implied when project id is missing).

## Netlify
Public Sanity vars live in **`netlify.toml`** `[build.environment]` — no need to re-enter them in the Netlify UI:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`

Never add `SANITY_API_WRITE_TOKEN` to Netlify or `netlify.toml`.

## Publish → live site
Pages are static. Wire:
1. Netlify **Build hook**
2. Sanity webhook on create/update/delete for `story`, `announcement`, `chronicleEdition`, `event` → that hook

Optional: daily scheduled rebuild so upcoming/past event buckets stay accurate.

## Demo seed (local)
```bash
npm run seed:sanity
```
Upserts sample stories, announcements, chronicles, and events (ids prefixed `demo.*`) into the configured dataset. Safe to re-run; delete those docs in Studio when you no longer need them.

## Tokens
- Public project id + dataset are safe to expose.
- **`SANITY_API_WRITE_TOKEN`** (also accepts `SANITY_API_TOKEN`): put only in **`.env.local`** (gitignored).
  - Create at Sanity Manage → API → Tokens → add token with **Editor** (or Admin) rights.
  - Enables local API writes / seed scripts via `sanityWriteClient` in `sanity/lib/client.ts`.
  - Server fetches prefer this client when present (no CDN lag while authoring).
- Never put the write token on Netlify or in `NEXT_PUBLIC_*` vars.
