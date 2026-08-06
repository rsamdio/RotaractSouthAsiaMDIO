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
1. Create a free Sanity project at https://www.sanity.io/manage
2. Copy project id into `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=yourProjectId
NEXT_PUBLIC_SANITY_DATASET=production
```

3. `npm run dev` → open http://localhost:3000/admin
4. Invite editors in Sanity Manage (Editor role). Prefer **Google** login.
5. Until a project id is set, the site uses static seeds in `config/news.ts` and `config/events.ts` (`USE_FS_CONTENT` is implied when project id is missing).

## Publish → live site
Pages are static. Wire:
1. Netlify **Build hook**
2. Sanity webhook on create/update/delete for `story`, `announcement`, `chronicleEdition`, `event` → that hook

Optional: daily scheduled rebuild so upcoming/past event buckets stay accurate.

## Tokens
- Public project id + dataset are safe to expose.
- Never put `SANITY_API_WRITE_TOKEN` on Netlify.
