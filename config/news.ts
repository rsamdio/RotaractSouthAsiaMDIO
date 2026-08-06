// News directory — stories & announcements (same post shape; CMS will replace later).
// RSA Chronicles is the official monthly newsletter (external reader on publications hub).

export type NewsKind = "story" | "announcement";

export type Story = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  body: string;
  image: string;
  date: string; // ISO date
  featured?: boolean;
};

/** Alias — announcements use the same post shape as stories. */
export type Announcement = Story;

export type NewsPost = Story & { kind: NewsKind };

export const stories: Story[] = [
  {
    slug: "rebuilding-after-floods-district-3220",
    title: "Rebuilding After Floods in District 3220",
    category: "Service",
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
    category: "Service",
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
    excerpt:
      "The 17th RSA MDIO Installation Ceremony and ROAR Awards will be hosted in Bengaluru, India, marking the start of RY 2026–27.",
    body: "Rotaract South Asia MDIO is pleased to announce ANANTA 2026 — the 17th RSA MDIO Installation Ceremony and ROAR Awards — to be hosted in Bengaluru, India. The gathering will mark the formal start of Rotary Year 2026–27 and bring together District Rotaract Representatives, Executive Board members, and Rotaractors from across the region.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    date: "2026-01-10",
    featured: true,
  },
  {
    slug: "new-drr-appointments",
    title: "DRR Appointments Confirmed for RY 2026–27",
    category: "Announcement",
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
      "New year priorities, DRR confirmations, and the first look at regional programmes for the term.",
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
