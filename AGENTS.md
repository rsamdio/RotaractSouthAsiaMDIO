# AGENTS.md — Rotaract South Asia MDIO (rsamdio.org)

Persistent context for AI agents and humans working on this repo across chats and devices. Prefer this file over reconstructed chat history.

## What this project is

Public marketing / coordination site for **Rotaract South Asia MDIO (RSAMDIO)** — regional hub for Rotaract across South Asia.

| Item | Value |
| --- | --- |
| Production | https://rsamdio.org |
| Hosting | Netlify (`@netlify/plugin-nextjs`) |
| Stack | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 |
| CMS | Sanity Studio embedded at `/admin` |
| Contact | `rsamdio@gmail.com` (no live contact form submission required) |
| Rotary year | `2026–27` in `config/site.ts` — update each July |

Firebase has been **removed** from the app. Do not reintroduce Firebase for site content or admin.

## Commands

```bash
npm run dev               # predev imports member CSVs, then next dev
npm run build             # prebuild imports member CSVs, then next build
npm run import:member-data
npm run seed:sanity       # upsert demo.* CMS docs (needs write token in .env.local)
npm run lint
npm run sanity            # standalone Studio on :3333 (optional; site uses /admin)
```

Env template: `.env.example`. Local secrets stay in `.env.local` (never commit).

## Repository map

```
app/                 Next.js routes (pages + /admin studio)
components/          UI (homepage sections, news, events, initiatives)
config/              Site chrome, leadership, history, seeds, generated member JSON
data/                Source CSVs for districts & clubs (edit these)
scripts/             CSV → JSON import; Sanity demo seed
sanity/              Schemas, queries, content loaders, Studio input + styles
styles/              Shared CSS (e.g. markdown-preview.css for site + Studio)
docs/CMS.md          Sanity setup + webhook rebuild notes
lib/                 Shared helpers (markdown, section scroll, news nav, etc.)
```

### Important routes

| Path | Purpose |
| --- | --- |
| `/` | Homepage |
| `/about`, `/leadership`, `/presidents` | Org / people |
| `/districts`, `/districts/[number]` | Member districts + clubs |
| `/initiatives` | Digital ecosystem explorer + initiatives listing |
| `/initiatives/[slug]` | Initiative (program / campaign) detail |
| `/events`, `/events/[slug]` | Events |
| `/news`, `/news/[slug]` | News & Updates hub + story/announcement detail |
| `/stories` | Full stories listing |
| `/announcements` | Full announcements listing |
| `/chronicles` | RSA Chronicles newsletter editions |
| `/contact`, `/privacy`, `/terms` | Contact + legal |
| `/admin` | Sanity Studio |

## Content ownership (do not mix)

### Sanity (editorial — publish via Studio)

Types in `sanity/schemaTypes/`: `story`, `announcement`, `chronicleEdition`, `event`, `programInitiative`.

Studio Structure labels: Stories, Announcements, RSA Chronicles, Events, **Initiatives** (`programInitiative`).

Fetch via `sanity/lib/content.ts`:

- If `NEXT_PUBLIC_SANITY_PROJECT_ID` is set → Sanity
- Else (or `USE_FS_CONTENT=1`) → filesystem seeds in `config/news.ts`, `config/events.ts`, and `config/initiatives.ts`

Site pages are largely **static**. Publish live by wiring Sanity webhooks → Netlify build hook (see `docs/CMS.md`). Never put `SANITY_API_WRITE_TOKEN` on Netlify.

Markdown bodies share one renderer (`lib/markdown.ts`) and one preview stylesheet (`styles/markdown-preview.css`) between public pages (`MarkdownContent`) and Studio EasyMDE (`MarkdownBodyInput`).

### Disk / repo (not Sanity)

| Source | Notes |
| --- | --- |
| `data/member-districts.csv`, `data/rotaract-clubs.csv` | **Only** edit CSVs. Generated `config/memberDistricts.json` + `config/memberClubs.json` are build artifacts — do not hand-edit. |
| `config/leadership.ts` | Single source of truth for Executive Board, committee, **DRRs** (photos/names/clubs). Do not put DRR names in district CSVs. |
| `config/platformTools.ts` | Shared digital-ecosystem tool definitions (home + `/initiatives`). |
| `config/history.ts` | About-page organizational history. |
| `config/site.ts`, hall of fame, hero gallery, legal copy | Code-owned |
| `config/initiatives.ts` | Filesystem **seed / fallback** for CMS initiatives only — not the live source when Sanity is configured. |

Member data workflow: replace CSVs → `npm run import:member-data` (or just `dev`/`build`). Details in `data/README.md`.

District UI conventions:

- Countries A–Z; exact club/member counts (no `+` suffix)
- DRR card = photo + name + club only
- Clubs: search + Community/University filters; list always visible (no accordion)

## Homepage composition (current)

Order in `app/page.tsx`:

1. Hero
2. About snapshot
3. Global participation (Presence)
4. Focus areas
5. Initiatives showcase (live digital-ecosystem embeds)
6. Programs & campaigns (`ProgramsInitiatives` — featured CMS initiatives)
7. Leadership snapshot
8. **News & Updates** (`NewsUpdatesPreview` — stories + announcements + latest Chronicle)
9. Upcoming events
10. CTA strip

Bottom `PillNav` section ids include `hero`, `about-snapshot`, `global` (label: Presence), `initiatives`, `leadership`, `news`, `events`.

Cross-page section jumps use hash-free scroll (`lib/scrollToSection.ts`, `SectionNavLink`, `SmoothScroll` stash) — prefer that over writing `#fragment` into the URL (e.g. home “All programs” → `/initiatives` + scroll to `programs`).

## Initiatives (two spectra)

1. **Digital ecosystem** — `config/platformTools.ts` + live iframe embeds (`InitiativesShowcase` on home, `InitiativesExplorer` on `/initiatives` under `#ecosystem`). Embeds stay visible on mobile.
2. **Programs & campaigns** — Sanity `programInitiative` (Studio: **Initiatives**; seed fallback in `config/initiatives.ts`) + `ProgramsInitiatives` on home (featured) and `/initiatives` (full list). Detail routes: `/initiatives/[slug]`.

Homepage order places Programs directly under the digital showcase. `/initiatives` hero covers both; PillNav switches Ecosystem ↔ Programs.

### Known embed issue (Publications Hub)

Embedding `publications.rsamdio.org` works for home/about inside the preview. Navigating to **Publication Series** (`/p/{seriesId}`) or especially the **Reader** (`/p/{seriesId}/e/{editionId}`) can break the preview until PubHub ships framed-safe reader behaviour. Not an RSAMDIO iframe bug — ignore unless product asks for a host-side mitigation.

## Brand & UI

Preserve the established system when editing existing surfaces:

- **CTA hierarchy:** crimson (`#D41B69` / `bg-crimson`) = primary filled actions; hover `crimson-hover` (`#9A0E4E`). Navy (`#17458F`) = stats / institutional chrome only — not primary buttons. Gold = rare highlight.
- **Surfaces:** ice white, `slate-50`, hero canvas `ice-cream` (`#F7F5F0`), soft blush `#FCE8F1`. Body ink `#0B1426` (`ink`). Tokens live in `app/globals.css` `@theme`.
- Soft rounded sections, pink eyebrow pills for marketing sections, Open Sans for UI (Sentinel only where `font-serif` is intentional, e.g. About body)
- Lenis smooth scroll via `components/SmoothScroll.tsx` — don’t add competing `scroll-behavior: smooth` on `html`
- Prefer existing patterns (`PageHero`, `Reveal`, `PillNav`, card styles) over inventing a new design language
- Avoid off-brand purple / lavender washes; green only for success or platform-native icons

Contact page: email CTA only (form UI may exist but product direction is email-first).

## Agent working rules for this repo

1. **No commits unless the user asks.** No force-push / destructive git unless explicitly requested.
2. **Edit member CSVs, not generated JSON.**
3. **Don’t put districts/clubs/leadership/platform tools into Sanity** — editorial CMS is for stories, announcements, chronicles, events, and initiatives (`programInitiative`) only.
4. **Don’t reintroduce Firebase** for app content/admin.
5. Prefer small, focused diffs; match local naming and component style.
6. After substantive TS/UI changes, run `npx tsc --noEmit` (or project lint/build) before claiming done.
7. Netlify: use `Netlify.env.get` in Functions if adding serverless code; keep `.netlify` gitignored.
8. When unsure about CMS/deploy, read `docs/CMS.md` and `.env.example` first.

## Related ecosystem (external — separate codebases)

These appear as live embeds / links from Initiatives; they are **not** this Next app:

- library.rsamdio.org
- dues.rsamdio.org
- navigate.rsamdio.org
- publications.rsamdio.org (PubHub — see embed note above)
- certify.rsamdio.org
- pulse.rsamdio.org

## Docs to update when architecture changes

- This file (`AGENTS.md`) — durable agent context
- `README.md` — human-oriented project overview
- `docs/CMS.md` — Sanity / webhook / rebuild
- `data/README.md` — CSV columns and import
- `.env.example` — env surface area
