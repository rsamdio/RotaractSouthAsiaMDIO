// News directory — stories & announcements (same post shape; CMS will replace later).
// RSA Chronicles is the official monthly newsletter (external reader on publications hub).

export type NewsKind = "story" | "announcement";

export type ContentSeo = {
  title?: string;
  description?: string;
  ogImage?: string;
};

export type Story = {
  slug: string;
  title: string;
  category: string;
  tags?: string[];
  customColor?: string;
  excerpt: string;
  body: string;
  image: string;
  date: string; // ISO date
  featured?: boolean;
  seo?: ContentSeo;
};

/** Alias — announcements use the same post shape as stories. */
export type Announcement = Story;

export type NewsPost = Story & { kind: NewsKind };

export const standardColors = [
  // Rotary & RSAMDIO Core Brand
  { name: "Crimson (Primary Brand)", hex: "#D41B69", description: "Primary RSAMDIO Brand Color" },
  { name: "Crimson Dark", hex: "#9A0E4E", description: "Hover state / deep accent" },
  { name: "Navy Blue (Institutional)", hex: "#17458F", description: "Rotary Royal Blue / institutional chrome" },
  { name: "Navy Deep", hex: "#0B1426", description: "Ink / dark headers" },
  { name: "Rotary Gold", hex: "#F7A81B", description: "Rotary Gold / awards / highlights" },
  { name: "Amber Gold", hex: "#D97706", description: "Warm amber for alerts and milestones" },

  // Service & Programs Palette
  { name: "Emerald Green", hex: "#059669", description: "Community service / environment" },
  { name: "Forest Green", hex: "#15803D", description: "Sustainability & ecology" },
  { name: "Teal", hex: "#0F766E", description: "Certify / health / water" },
  { name: "Cyan / Aqua", hex: "#0891B2", description: "Innovation / youth projects" },
  { name: "Sky Blue", hex: "#0284C7", description: "Regional summits / fellowship" },
  { name: "Royal Purple", hex: "#7C3AED", description: "International service / leadership" },
  { name: "Indigo", hex: "#4F46E5", description: "Digital ecosystem & technology" },
  { name: "Fuchsia / Magenta", hex: "#C026D3", description: "Campaigns & public image" },
  { name: "Rose Coral", hex: "#E11D48", description: "Youth exchange & fellowship" },
  { name: "Warm Orange", hex: "#EA580C", description: "Disaster response & athletics" },

  // Neutrals / Slate
  { name: "Slate Blue", hex: "#475569", description: "Neutral editorial / announcements" },
  { name: "Charcoal Slate", hex: "#334155", description: "Governance & constitutional models" },
];

export const standardCategories = [
  { title: "Community Service", slug: "community-service", color: "#D41B69" },
  { title: "Professional Development", slug: "professional-development", color: "#17458F" },
  { title: "Leadership & Training", slug: "leadership-training", color: "#F7A81B" },
  { title: "Fellowship & Networking", slug: "fellowship-networking", color: "#0284C7" },
  { title: "Sports & Athletics", slug: "sports-athletics", color: "#EA580C" },
  { title: "Environment & Sustainability", slug: "environment-sustainability", color: "#059669" },
  { title: "International Service", slug: "international-service", color: "#7C3AED" },
  { title: "Peace & Conflict Resolution", slug: "peace-conflict-resolution", color: "#0F766E" },
  { title: "Health & Wellness", slug: "health-wellness", color: "#E11D48" },
  { title: "Public Image & Brand", slug: "public-image-brand", color: "#C026D3" },
  { title: "Youth Exchange & RYLA", slug: "youth-exchange-ryla", color: "#0891B2" },
  { title: "Disaster Relief & Response", slug: "disaster-relief", color: "#EA580C" },
];

export const standardTags = [
  { title: "Announcement", slug: "announcement" },
  { title: "Awareness Campaign", slug: "awareness-campaign" },
  { title: "Campaigns & Initiatives", slug: "campaigns" },
  { title: "Hosting & Exchange", slug: "hosting-exchange" },
  { title: "Joint Project", slug: "joint-project" },
  { title: "Awards & Recognition", slug: "awards-recognition" },
  { title: "District Conference", slug: "district-conference" },
  { title: "Training Seminar", slug: "training-seminar" },
  { title: "Youth Exchange", slug: "youth-exchange" },
  { title: "Disaster Relief", slug: "disaster-relief" },
  { title: "Clean Water & Sanitation", slug: "clean-water" },
  { title: "Regional Summit", slug: "regional-summit" },
  { title: "Digital Platform", slug: "digital-platform" },
  { title: "Ecosystem Tool", slug: "ecosystem-tool" },
  { title: "Bylaws & Governance", slug: "governance" },
  { title: "Official Guide", slug: "official-guide" },
];

export const stories: Story[] = [
  {
    slug: "rebuilding-after-floods-district-3220",
    title: "Rebuilding After Floods in District 3220",
    category: "Community Service",
    tags: ["Disaster Relief", "Joint Project", "Campaigns"],
    customColor: "#D41B69",
    excerpt:
      "A joint effort that provided temporary housing for over 500 displaced families across coastal Sri Lanka.",
    body: "Clubs across District 3220 mobilized within 48 hours of seasonal flooding, coordinating temporary housing, clean water access, and school-supply drives for over 500 displaced families. The relief effort drew volunteers from 12 clubs and was supported by a Rotary Foundation disaster-response grant.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    date: "2026-03-02",
    featured: true,
  },
  {
    slug: "south-asia-summit-record-attendance",
    title: "South Asia Summit Concludes With Record Attendance",
    category: "Leadership",
    tags: ["Regional Summit", "Training Seminar", "Awareness"],
    customColor: "#F7A81B",
    excerpt:
      "Over 1,200 delegates from 8 nations gathered for three days of leadership training and fellowship.",
    body: "This year's regional summit drew the largest delegate turnout in MDIO history, with representatives from every member nation attending workshops on governance, public image, and cross-border project design.",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
    date: "2026-02-18",
  },
  {
    slug: "clean-water-project-nepal",
    title: "Clean Water Access Reaches Three Himalayan Villages",
    category: "Community Service",
    tags: ["Clean Water", "Joint Project", "Campaigns"],
    customColor: "#059669",
    excerpt:
      "District 3292 clubs installed sand-filtration systems benefiting over 450 schoolchildren.",
    body: "Rotaractors in District 3292 partnered with local health authorities to install heavy-duty sand filtration systems in three rural schools, providing safe drinking water to more than 450 children daily.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&crop=entropy&fit=crop&w=1200&q=80",
    date: "2026-01-22",
  },
];

export const announcements: Announcement[] = [
  {
    slug: "ananta-2026-announcement",
    title: "RSAMDIO Announces ANANTA 2026 Installation Ceremony",
    category: "Announcement",
    tags: ["Announcement", "Hosting", "Awards & Recognition"],
    customColor: "#D41B69",
    excerpt:
      "The 17th RSAMDIO Installation Ceremony and ROAR Awards will be hosted in Bengaluru, India, marking the start of RY 2026–27.",
    body: "Rotaract South Asia MDIO is pleased to announce ANANTA 2026, the 17th RSAMDIO Installation Ceremony and ROAR Awards, to be hosted in Bengaluru, India. The gathering will mark the formal start of Rotary Year 2026–27 and bring together District Rotaract Representatives, Executive Board members, and Rotaractors from across the region.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    date: "2026-01-10",
    featured: true,
  },
  {
    slug: "new-drr-appointments",
    title: "DRR Appointments Confirmed for RY 2026–27",
    category: "Announcement",
    tags: ["Announcement", "Leadership"],
    customColor: "#17458F",
    excerpt:
      "District Rotaract Representatives have been confirmed across the region's member nations for the incoming Rotary Year.",
    body: "RSAMDIO has confirmed District Rotaract Representative appointments for Rotary Year 2026–27 across member nations. DRRs will coordinate district-level Rotaract activity, represent their districts in regional forums, and work with the Executive Board on shared priorities for the year ahead.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    date: "2025-12-15",
  },
];

/** Official monthly newsletter — reader lives on publications.rsamdio.org */
export type ChronicleEdition = {
  slug: string;
  /** e.g. "March 2026" or "Edition 12" */
  editionName: string;
  /** ISO date of release */
  date: string;
  /** Short preview / blurb */
  preview: string;
  heroImage: string;
  /** External edition reader URL */
  readerUrl: string;
};

export const rsaChronicles: ChronicleEdition[] = [
  {
    slug: "march-2026",
    editionName: "March 2026",
    date: "2026-03-01",
    preview:
      "ANANTA countdown, district highlights from across South Asia, and the month ahead for Rotaract leaders.",
    heroImage:
      "https://images.unsplash.com/photo-1504711434719-2267e9a93af5?auto=format&fit=crop&w=1200&q=80",
    readerUrl: "https://publications.rsamdio.org/",
  },
  {
    slug: "february-2026",
    editionName: "February 2026",
    date: "2026-02-01",
    preview:
      "Summit reflections, service stories from the field, and Secretariat updates for RY 2026–27.",
    heroImage:
      "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80",
    readerUrl: "https://publications.rsamdio.org/",
  },
  {
    slug: "january-2026",
    editionName: "January 2026",
    date: "2026-01-01",
    preview:
      "New year priorities, DRR confirmations, and the first look at regional programs for the term.",
    heroImage:
      "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80",
    readerUrl: "https://publications.rsamdio.org/",
  },
];

function byDateDesc<T extends { date: string }>(a: T, b: T) {
  return b.date.localeCompare(a.date);
}

export function getSortedStories() {
  return [...stories].sort(byDateDesc);
}

export function getSortedAnnouncements() {
  return [...announcements].sort(byDateDesc);
}

export function getRecentChronicles(limit = 3) {
  return [...rsaChronicles].sort(byDateDesc).slice(0, limit);
}

export function getSortedChronicles() {
  return [...rsaChronicles].sort(byDateDesc);
}

export function getStory(slug: string) {
  return stories.find((s) => s.slug === slug);
}

export function getAnnouncement(slug: string) {
  return announcements.find((a) => a.slug === slug);
}

/** Resolve a news post by slug (story or announcement). */
export function getNewsPost(slug: string): NewsPost | undefined {
  const story = getStory(slug);
  if (story) return { ...story, kind: "story" };
  const announcement = getAnnouncement(slug);
  if (announcement) return { ...announcement, kind: "announcement" };
  return undefined;
}

export function getAllNewsSlugs() {
  return [...stories, ...announcements].map((p) => p.slug);
}

/**
 * Adjacent posts within the same stream (stories ↔ stories, announcements ↔ announcements),
 * ordered newest → oldest. `newer` is the more recent post; `older` is the earlier one.
 */
export function getAdjacentNewsPosts(slug: string): {
  kind: NewsKind;
  newer: Story | null;
  older: Story | null;
  indexLabel: string;
} | null {
  const post = getNewsPost(slug);
  if (!post) return null;

  const stream =
    post.kind === "story" ? getSortedStories() : getSortedAnnouncements();
  const index = stream.findIndex((p) => p.slug === slug);
  if (index === -1) return null;

  const kindLabel = post.kind === "story" ? "Story" : "Announcement";

  return {
    kind: post.kind,
    // Newer = earlier in newest-first list
    newer: index > 0 ? stream[index - 1] : null,
    older: index < stream.length - 1 ? stream[index + 1] : null,
    indexLabel: `${index + 1} of ${stream.length} ${kindLabel}${stream.length === 1 ? "" : "s"}`,
  };
}
