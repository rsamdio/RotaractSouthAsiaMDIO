import districtRaw from "@/config/memberDistricts.json";
import clubsRaw from "@/config/memberClubs.json";
import { drrs, type LeadershipMember } from "@/config/leadership";

export type MemberDistrict = {
  number: string;
  /** Display label derived from countryCodes, e.g. "Sri Lanka · Maldives" */
  countriesLabel: string;
  /** ISO flag codes — order matters (e.g. lk;mv) */
  countryCodes: string[];
  clubs: string;
  members: string;
  coverage?: string | null;
  highlights?: string | null;
};

export type MemberClub = {
  id: string;
  name: string;
  /** Community | University | Other */
  base: string;
  members: number | null;
  country: string;
};

export const memberDistricts: MemberDistrict[] = districtRaw as MemberDistrict[];

const clubsByDistrict = clubsRaw as Record<string, MemberClub[]>;

/** Member nations shown in the country flag strip (alphabetical). */
export const memberNations = [
  { name: "Afghanistan", code: "af" },
  { name: "Bangladesh", code: "bd" },
  { name: "Bhutan", code: "bt" },
  { name: "India", code: "in" },
  { name: "Maldives", code: "mv" },
  { name: "Nepal", code: "np" },
  { name: "Pakistan", code: "pk" },
  { name: "Sri Lanka", code: "lk" },
] as const;

function parseCount(value: string) {
  return Number(value.replace(/,/g, "").replace(/\+/g, "")) || 0;
}

function formatCount(value: number) {
  return value.toLocaleString("en-US");
}

const totalClubs = memberDistricts.reduce((sum, d) => sum + parseCount(d.clubs), 0);
const totalMembers = memberDistricts.reduce((sum, d) => sum + parseCount(d.members), 0);

export const memberDistrictSummary = {
  countries: memberNations.length,
  districts: memberDistricts.length,
  clubs: formatCount(totalClubs),
  members: formatCount(totalMembers),
};

export function getMemberDistrict(number: string): MemberDistrict | undefined {
  return memberDistricts.find((d) => d.number === number);
}

export function getDistrictClubs(number: string): MemberClub[] {
  return clubsByDistrict[number] ?? [];
}

export function getClubBaseCounts(clubs: MemberClub[]) {
  const counts = { community: 0, university: 0, other: 0, total: clubs.length };
  for (const club of clubs) {
    const base = club.base.toLowerCase();
    if (base === "community") counts.community += 1;
    else if (base === "university") counts.university += 1;
    else counts.other += 1;
  }
  return counts;
}

/** Match DRR leadership profile (name, photo, home club) for a member district. */
export function getDrrProfile(number: string): LeadershipMember | undefined {
  return drrs.find((d) => {
    const match = d.district.match(/\d+/);
    return match?.[0] === number;
  });
}

export function formatClubDisplayName(name: string) {
  const trimmed = name.trim();
  if (/^rotaract\b/i.test(trimmed)) return trimmed;
  return `Rotaract Club of ${trimmed}`;
}
