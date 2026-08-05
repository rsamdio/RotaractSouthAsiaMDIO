#!/usr/bin/env python3
"""Build config JSON from data/*.csv sources.

Sources (edit / replace these):
  data/member-districts.csv  → config/memberDistricts.json
  data/rotaract-clubs.csv    → config/memberClubs.json (member districts only)

DRR name / home club / photo come from config/leadership.ts (drrs) at runtime —
do not put DRR fields in the districts CSV.
"""

from __future__ import annotations

import csv
import json
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
OUT_DISTRICTS = ROOT / "config" / "memberDistricts.json"
OUT_CLUBS = ROOT / "config" / "memberClubs.json"

DISTRICTS_CSV = DATA / "member-districts.csv"
CLUBS_CSV = DATA / "rotaract-clubs.csv"

# ISO codes → display names (order in country_codes drives the label)
COUNTRY_NAMES = {
    "af": "Afghanistan",
    "pk": "Pakistan",
    "in": "India",
    "np": "Nepal",
    "bt": "Bhutan",
    "bd": "Bangladesh",
    "lk": "Sri Lanka",
    "mv": "Maldives",
}


def fail(msg: str) -> None:
    print(f"import-member-data: {msg}", file=sys.stderr)
    sys.exit(1)


def read_csv(path: Path) -> list[dict[str, str]]:
    if not path.exists():
        fail(f"missing {path.relative_to(ROOT)}")
    with path.open(newline="", encoding="utf-8-sig") as f:
        return list(csv.DictReader(f))


def countries_label(codes: list[str]) -> str:
    names: list[str] = []
    for code in codes:
        name = COUNTRY_NAMES.get(code)
        if not name:
            fail(f"unknown country code '{code}' (expected one of {sorted(COUNTRY_NAMES)})")
        names.append(name)
    return " · ".join(names)


def import_districts() -> list[dict]:
    rows = read_csv(DISTRICTS_CSV)
    required = {"district_number", "country_codes", "clubs", "members"}
    if not rows:
        fail(f"{DISTRICTS_CSV.name} has no data rows")
    missing_cols = required - set(rows[0].keys())
    if missing_cols:
        fail(f"{DISTRICTS_CSV.name} missing columns: {sorted(missing_cols)}")

    districts: list[dict] = []
    seen: set[str] = set()
    for row in rows:
        number = (row.get("district_number") or "").strip()
        if not number:
            continue
        if number in seen:
            fail(f"duplicate district_number {number}")
        seen.add(number)
        codes = [c.strip().lower() for c in (row.get("country_codes") or "").split(";") if c.strip()]
        if not codes:
            fail(f"district {number} needs country_codes (e.g. in or lk;mv)")
        coverage = (row.get("coverage") or "").strip() or None
        highlights = (row.get("highlights") or "").strip() or None

        def clean_count(raw: str) -> str:
            value = (raw or "").strip().rstrip("+").strip()
            return value

        districts.append(
            {
                "number": number,
                "countriesLabel": countries_label(codes),
                "countryCodes": codes,
                "clubs": clean_count(row.get("clubs") or ""),
                "members": clean_count(row.get("members") or ""),
                "coverage": coverage,
                "highlights": highlights,
            }
        )

    districts.sort(key=lambda d: int(d["number"]))
    OUT_DISTRICTS.write_text(json.dumps(districts, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"wrote {OUT_DISTRICTS.relative_to(ROOT)} ({len(districts)} districts)")
    return districts


def import_clubs(member_numbers: set[str]) -> None:
    rows = read_csv(CLUBS_CSV)
    required = {"district", "club_name", "club_base"}
    if not rows:
        fail(f"{CLUBS_CSV.name} has no data rows")
    missing_cols = required - set(rows[0].keys())
    if missing_cols:
        fail(f"{CLUBS_CSV.name} missing columns: {sorted(missing_cols)}")

    by_district: dict[str, list[dict]] = defaultdict(list)
    skipped = 0
    for row in rows:
        dist = (row.get("district") or "").strip()
        if not dist:
            continue
        if dist not in member_numbers:
            skipped += 1
            continue
        name = (row.get("club_name") or "").strip()
        if not name:
            continue
        members_raw = (row.get("members") or "").strip()
        members = int(members_raw) if members_raw.isdigit() else None
        base = (row.get("club_base") or "").strip() or "Other"
        by_district[dist].append(
            {
                "id": (row.get("club_id") or "").strip(),
                "name": name,
                "base": base,
                "members": members,
                "country": (row.get("country") or "").strip(),
            }
        )

    for dist, clubs in by_district.items():
        clubs.sort(key=lambda c: c["name"].lower())

    ordered = {d: by_district[d] for d in sorted(by_district.keys(), key=int)}
    OUT_CLUBS.write_text(json.dumps(ordered, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    total = sum(len(v) for v in ordered.values())
    print(
        f"wrote {OUT_CLUBS.relative_to(ROOT)} "
        f"({total} clubs across {len(ordered)} districts; skipped {skipped} non-member rows)"
    )


def main() -> None:
    districts = import_districts()
    import_clubs({d["number"] for d in districts})


if __name__ == "__main__":
    main()
