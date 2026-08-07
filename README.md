# Rotaract South Asia MDIO (rsamdio.org)

Public marketing and coordination site for **Rotaract South Asia MDIO (RSAMDIO)** — the regional hub for Rotaract across South Asia.

[![Netlify Status](https://api.netlify.com/api/v1/badges/4d538e49-2059-4937-85e1-f6f6bf117435/deploy-status)](https://app.netlify.com/projects/rsamdio/deploys)

| | |
| --- | --- |
| Production | https://rsamdio.org |
| Hosting | Netlify (`@netlify/plugin-nextjs`) |
| Stack | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 |
| CMS | Sanity Studio at [`/admin`](https://rsamdio.org/admin) |
| Rotary year | `2026–27` in `config/site.ts` (update each July) |

Agent-oriented durable context lives in [`AGENTS.md`](./AGENTS.md). Sanity setup and webhooks: [`docs/CMS.md`](./docs/CMS.md). Member CSV workflow: [`data/README.md`](./data/README.md).

## Quick start

```bash
cp .env.example .env.local   # add Sanity project id (optional write token for fresher local fetches)
npm install
npm run dev                  # imports member CSVs, then next dev → http://localhost:3000
```

## Commands

| Script | Purpose |
| --- | --- |
| `npm run dev` | Import member CSVs, then Next.js dev server |
| `npm run build` | Import member CSVs, then production build |
| `npm run import:member-data` | CSV → `config/memberDistricts.json` / `memberClubs.json` |
| `npm run lint` | ESLint |
| `npm run sanity` | Standalone Studio on `:3333` (optional; site embeds Studio at `/admin`) |

## Content ownership

**Sanity (edit in Studio → `/admin`)**

- Stories, Announcements, RSA Chronicles, Events
- Initiatives (schema type `programInitiative` — Studio label **Initiatives**)

**Repo / disk (not Sanity)**

- Member districts & clubs — edit CSVs in `data/` only (JSON is generated)
- Leadership / DRRs — `config/leadership.ts`
- Digital ecosystem tools — `config/platformTools.ts`
- Site chrome, history, hero gallery, legal copy — `config/`

Until `NEXT_PUBLIC_SANITY_PROJECT_ID` is set (or with `USE_FS_CONTENT=1`), public pages fall back to seeds in `config/news.ts`, `config/events.ts`, and `config/initiatives.ts`.

Never put `SANITY_API_WRITE_TOKEN` on Netlify. Details in [`docs/CMS.md`](./docs/CMS.md).

## Key routes

| Path | Purpose |
| --- | --- |
| `/` | Homepage |
| `/about`, `/leadership`, `/presidents` | Org / people |
| `/districts`, `/districts/[number]` | Member districts + clubs |
| `/initiatives` | Digital ecosystem + initiatives listing |
| `/initiatives/[slug]` | Initiative detail |
| `/events`, `/events/[slug]` | Events |
| `/news`, `/news/[slug]` | News hub + story/announcement detail |
| `/stories`, `/announcements`, `/chronicles` | Full listings |
| `/contact`, `/privacy`, `/terms` | Contact + legal |
| `/admin` | Sanity Studio |

## Markdown bodies

Editorial bodies (stories, announcements, events, initiatives) are Markdown. Public pages and the Studio EasyMDE preview share `lib/markdown.ts` and `styles/markdown-preview.css`, so preview matches the live site.

## Related platforms (external)

Live embeds / links from Initiatives — separate codebases:

- library.rsamdio.org · dues.rsamdio.org · navigate.rsamdio.org
- publications.rsamdio.org · certify.rsamdio.org · pulse.rsamdio.org
