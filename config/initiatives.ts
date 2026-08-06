// Program & campaign initiatives (filesystem seed when Sanity is unset).
// Digital tools live in config/platformTools.ts (not CMS).

export type ProgramStatus = "active" | "upcoming" | "seasonal";

export type ProgramIconKey =
  | "service"
  | "sports"
  | "leadership"
  | "fellowship"
  | "environment";

export type ProgramInitiative = {
  slug: string;
  title: string;
  /** Short label e.g. "Service" | "Sports" | "Leadership" */
  category: string;
  status: ProgramStatus;
  summary: string;
  /** One-line living detail for cards */
  livingNote: string;
  icon: ProgramIconKey;
  accent: string;
  image: string;
  /** Markdown body for detail page */
  body?: string;
  featured?: boolean;
  ctaLabel?: string;
};

/** Filesystem / demo seed used when Sanity project id is not configured. */
export const programInitiatives: ProgramInitiative[] = [
  {
    slug: "south-asia-service-week",
    title: "South Asia Service Week",
    category: "Service",
    status: "active",
    summary:
      "A region-wide week of coordinated club and district service: health camps, literacy drives, and community clean-ups under one shared banner.",
    livingNote: "RY 2026–27 window · Clubs report projects through their DRR",
    icon: "service",
    accent: "#D41B69",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    ctaLabel: "Learn more",
    body: `South Asia Service Week brings clubs and districts under one coordinated service banner each Rotary Year.

## How it works
- Clubs plan local projects under the shared week window
- Districts collect impact stories and photos through their DRR
- RSAMDIO amplifies the regional narrative through News & Updates

## Who can join
Any member club in RSAMDIO nations. Coordinate timing and reporting with your District Rotaract Representative.`,
  },
  {
    slug: "rotaract-sports-meet",
    title: "Rotaract Sports Meet",
    category: "Sports",
    status: "upcoming",
    summary:
      "Inter-district sports and fellowship that bring Rotaractors together beyond boardrooms: cricket, football, athletics, and team challenges.",
    livingNote: "Hosting bids open · Tentative Q3 regional meet",
    icon: "sports",
    accent: "#F7A81B",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    ctaLabel: "Learn more",
    body: `The Rotaract Sports Meet is a fellowship-forward gathering that pairs competition with regional friendship.

## Focus areas
- Team sports and athletics open to club and district squads
- Host district hospitality and cultural evenings
- Inclusive formats for mixed skill levels

## Hosting
Districts may submit hosting bids to the Secretariat. Dates for the next meet will be published under Events once confirmed.`,
  },
  {
    slug: "leaders-series",
    title: "Leaders Series",
    category: "Leadership",
    status: "active",
    summary:
      "A continuing conversation series with Rotary leaders, alumni, and changemakers. Hybrid sessions designed for club and district boards.",
    livingNote: "Monthly sessions · Next guest announced via News",
    icon: "leadership",
    accent: "#17458F",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    ctaLabel: "Learn more",
    body: `Leaders Series is RSAMDIO's ongoing conversation programme for boards and emerging leaders.

## Format
Hybrid sessions with guest speakers from Rotary, Rotaract alumni, and partner organisations. Recordings and takeaways are shared through RSA Chronicles and the News hub when available.

## Who should attend
Club presidents, district officers, and Rotaractors preparing for leadership roles.`,
  },
  {
    slug: "fellowship-exchanges",
    title: "Cross-Border Fellowship",
    category: "Fellowship",
    status: "seasonal",
    summary:
      "Structured club twinning and short fellowship exchanges that connect Rotaractors across South Asian districts and cultures.",
    livingNote: "Seasonal cohorts · Pairing facilitated by Secretariat",
    icon: "fellowship",
    accent: "#17458F",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    ctaLabel: "Learn more",
    body: `Cross-Border Fellowship pairs clubs and small cohorts for short exchanges that build lasting regional friendship.

## What to expect
- Facilitated twinning between districts
- Host club programmes focused on culture, service, and leadership
- Seasonal application windows announced by the Secretariat`,
  },
  {
    slug: "green-south-asia",
    title: "Green South Asia",
    category: "Environment",
    status: "active",
    summary:
      "A shared environmental campaign: tree planting, climate literacy, and local conservation projects with a common regional impact story.",
    livingNote: "Year-round · District green champions coordinate locally",
    icon: "environment",
    accent: "#059669",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    ctaLabel: "Learn more",
    body: `Green South Asia is a year-round campaign that helps districts tell one regional environmental story while acting locally.

## Project types
- Tree planting and urban greening
- Climate literacy in schools and clubs
- Conservation partnerships with local organisations

Report outcomes through your DRR so RSAMDIO can amplify shared impact.`,
  },
];

export function getProgramInitiative(slug: string) {
  return programInitiatives.find((p) => p.slug === slug);
}

export function getFeaturedPrograms(limit = 3) {
  const featured = programInitiatives.filter((p) => p.featured);
  const pool = featured.length > 0 ? featured : programInitiatives;
  return pool.slice(0, limit);
}
