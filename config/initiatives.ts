// Program & campaign initiatives — physical/online programmes (not digital platforms).
// Digital tools live in config/platformTools.ts.
// Detail pages (/initiatives/[slug]) can come later; cards link to the programs section for now.

import {
  HeartHandshake,
  Trophy,
  Mic2,
  UsersRound,
  Leaf,
  type LucideIcon,
} from "lucide-react";

export type ProgramStatus = "active" | "upcoming" | "seasonal";

export type ProgramInitiative = {
  slug: string;
  title: string;
  /** Short label e.g. "Service" | "Sports" | "Leadership" */
  category: string;
  status: ProgramStatus;
  summary: string;
  /** One-line living detail for cards */
  livingNote: string;
  icon: LucideIcon;
  accent: string;
  image: string;
  href?: string;
  ctaLabel?: string;
};

export const programInitiatives: ProgramInitiative[] = [
  {
    slug: "south-asia-service-week",
    title: "South Asia Service Week",
    category: "Service",
    status: "active",
    summary:
      "A region-wide week of coordinated club and district service — health camps, literacy drives, and community clean-ups under one shared banner.",
    livingNote: "RY 2026–27 window · Clubs report projects through their DRR",
    icon: HeartHandshake,
    accent: "#D41B69",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    href: "/initiatives#programs",
    ctaLabel: "Learn more",
  },
  {
    slug: "rotaract-sports-meet",
    title: "Rotaract Sports Meet",
    category: "Sports",
    status: "upcoming",
    summary:
      "Inter-district sports and fellowship that bring Rotaractors together beyond boardrooms — cricket, football, athletics, and team challenges.",
    livingNote: "Hosting bids open · Tentative Q3 regional meet",
    icon: Trophy,
    accent: "#F7A81B",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba6851?auto=format&fit=crop&w=1200&q=80",
    href: "/initiatives#programs",
    ctaLabel: "Learn more",
  },
  {
    slug: "leaders-series",
    title: "Leaders Series",
    category: "Leadership",
    status: "active",
    summary:
      "A continuing conversation series with Rotary leaders, alumni, and changemakers — hybrid sessions designed for club and district boards.",
    livingNote: "Monthly sessions · Next guest announced via News",
    icon: Mic2,
    accent: "#17458F",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
    href: "/initiatives#programs",
    ctaLabel: "Learn more",
  },
  {
    slug: "fellowship-exchanges",
    title: "Cross-Border Fellowship",
    category: "Fellowship",
    status: "seasonal",
    summary:
      "Structured club twinning and short fellowship exchanges that connect Rotaractors across South Asian districts and cultures.",
    livingNote: "Seasonal cohorts · Pairing facilitated by Secretariat",
    icon: UsersRound,
    accent: "#7E22CE",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    href: "/initiatives#programs",
    ctaLabel: "Learn more",
  },
  {
    slug: "green-south-asia",
    title: "Green South Asia",
    category: "Environment",
    status: "active",
    summary:
      "A shared environmental campaign — tree planting, climate literacy, and local conservation projects with a common regional impact story.",
    livingNote: "Year-round · District green champions coordinate locally",
    icon: Leaf,
    accent: "#059669",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
    href: "/initiatives#programs",
    ctaLabel: "Learn more",
  },
];

export function getProgramInitiative(slug: string) {
  return programInitiatives.find((p) => p.slug === slug);
}

export function getFeaturedPrograms(limit = 3) {
  return programInitiatives.slice(0, limit);
}
