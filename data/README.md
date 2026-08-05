# Member data sources (CSV → JSON on build)

Replace these files when Rotary / Secretariat exports update. Do **not** hand-edit
`config/memberDistricts.json` or `config/memberClubs.json` — they are generated.

DRR names, photos, and home clubs come from [`config/leadership.ts`](../config/leadership.ts)
(`drrs`). Keep that roster as the single source of truth for DRRs.

## Files

| File | Purpose |
| --- | --- |
| `member-districts.csv` | Member districts: country codes, clubs+/members+, coverage, highlights |
| `rotaract-clubs.csv` | Club directory for those districts (Community / University) |

## Workflow

1. Keep the column headers exactly as in these CSVs (use them as the template).
2. Replace row data (Excel → Save as CSV UTF-8 is fine).
3. Run:

```bash
npm run import:member-data
```

Or just `npm run build` / `npm run dev` — both run the import first.

## Column notes

**member-districts.csv**

- `country_codes` — ISO flag codes, semicolon-separated for multi-nation districts.
  - `3220` → `lk;mv` (Sri Lanka · Maldives)
  - `3292` → `np;bt` (Nepal · Bhutan)
  - Most Indian districts → `in`
- Display labels are generated from these codes on import (no separate country / label columns).
- `clubs` / `members` — exact counts without a `+` suffix (`95`, `4,063`).
- `coverage` / `highlights` — optional; leave blank if unknown.
- Do **not** put DRR names here — manage DRRs in leadership.

**rotaract-clubs.csv**

- Only rows whose `district` appears in `member-districts.csv` are imported.
- `club_base` — typically `Community` or `University`.
- `club_id` — shown on the district page club list.
