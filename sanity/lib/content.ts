import {
  announcements as fsAnnouncements,
  stories as fsStories,
  rsaChronicles as fsChronicles,
  type Announcement,
  type ChronicleEdition,
  type Story,
} from "@/config/news";
import {
  siteEvents as fsEvents,
  type SiteEvent,
  type EventAccent,
  type EventKind,
} from "@/config/events";
import {
  programInitiatives as fsPrograms,
  type ProgramIconKey,
  type ProgramInitiative,
  type ProgramStatus,
} from "@/config/initiatives";
import { useFilesystemContent } from "../env";
import { sanityFetch } from "./client";
import {
  announcementBySlugQuery,
  announcementsQuery,
  chroniclesQuery,
  eventBySlugQuery,
  eventsQuery,
  programBySlugQuery,
  programsQuery,
  storiesQuery,
  storyBySlugQuery,
} from "./queries";

type SanityPost = {
  slug: string;
  title: string;
  category?: string;
  excerpt: string;
  body?: string;
  date: string;
  featured?: boolean;
  image?: string | null;
};

type SanityChronicle = {
  slug: string;
  editionName: string;
  date: string;
  preview: string;
  heroImage?: string | null;
  readerUrl: string;
};

type SanityEvent = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  body?: string;
  startDate: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  timezoneLabel?: string;
  location?: string;
  venue?: string;
  kind: EventKind;
  accent: EventAccent;
  signature?: boolean;
  registrationUrl?: string;
  registrationLabel?: string;
  image?: string | null;
};

type SanityProgram = {
  slug: string;
  title: string;
  category: string;
  status: ProgramStatus;
  summary: string;
  livingNote: string;
  icon: ProgramIconKey;
  accent: string;
  body?: string;
  featured?: boolean;
  ctaLabel?: string;
  image?: string | null;
};

function mapPost(p: SanityPost): Story {
  return {
    slug: p.slug,
    title: p.title,
    category: p.category || "Update",
    excerpt: p.excerpt,
    body: p.body || p.excerpt,
    image: p.image || "",
    date: p.date,
    featured: p.featured,
  };
}

function mapChronicle(c: SanityChronicle): ChronicleEdition {
  return {
    slug: c.slug,
    editionName: c.editionName,
    date: c.date,
    preview: c.preview,
    heroImage: c.heroImage || "",
    readerUrl: c.readerUrl,
  };
}

function mapEvent(e: SanityEvent): SiteEvent {
  return {
    slug: e.slug,
    title: e.title,
    tagline: e.tagline,
    description: e.description,
    body: e.body,
    startDate: e.startDate,
    endDate: e.endDate,
    startTime: e.startTime,
    endTime: e.endTime,
    timezoneLabel: e.timezoneLabel,
    location: e.location,
    venue: e.venue,
    kind: e.kind,
    accent: e.accent,
    signature: e.signature,
    registrationUrl: e.registrationUrl,
    registrationLabel: e.registrationLabel,
    image: e.image || undefined,
  };
}

const programIconKeys: ProgramIconKey[] = [
  "service",
  "sports",
  "leadership",
  "fellowship",
  "environment",
];

function mapProgram(p: SanityProgram): ProgramInitiative {
  const icon = programIconKeys.includes(p.icon) ? p.icon : "service";
  return {
    slug: p.slug,
    title: p.title,
    category: p.category,
    status: p.status,
    summary: p.summary,
    livingNote: p.livingNote,
    icon,
    accent: p.accent || "#D41B69",
    image: p.image || "",
    body: p.body || p.summary,
    featured: p.featured,
    ctaLabel: p.ctaLabel,
  };
}

export async function loadStories(): Promise<Story[]> {
  if (useFilesystemContent()) return fsStories;
  const data = await sanityFetch<SanityPost[]>(storiesQuery);
  return (data ?? []).map(mapPost);
}

export async function loadStory(slug: string): Promise<Story | undefined> {
  if (useFilesystemContent()) return fsStories.find((s) => s.slug === slug);
  const data = await sanityFetch<SanityPost | null>(storyBySlugQuery, { slug });
  return data ? mapPost(data) : undefined;
}

export async function loadAnnouncements(): Promise<Announcement[]> {
  if (useFilesystemContent()) return fsAnnouncements;
  const data = await sanityFetch<SanityPost[]>(announcementsQuery);
  return (data ?? []).map(mapPost);
}

export async function loadAnnouncement(slug: string): Promise<Announcement | undefined> {
  if (useFilesystemContent()) return fsAnnouncements.find((a) => a.slug === slug);
  const data = await sanityFetch<SanityPost | null>(announcementBySlugQuery, { slug });
  return data ? mapPost(data) : undefined;
}

export async function loadChronicles(): Promise<ChronicleEdition[]> {
  if (useFilesystemContent()) return fsChronicles;
  const data = await sanityFetch<SanityChronicle[]>(chroniclesQuery);
  return (data ?? []).map(mapChronicle);
}

export async function loadEvents(): Promise<SiteEvent[]> {
  if (useFilesystemContent()) return fsEvents;
  const data = await sanityFetch<SanityEvent[]>(eventsQuery);
  return (data ?? []).map(mapEvent);
}

export async function loadEvent(slug: string): Promise<SiteEvent | undefined> {
  if (useFilesystemContent()) return fsEvents.find((e) => e.slug === slug);
  const data = await sanityFetch<SanityEvent | null>(eventBySlugQuery, { slug });
  return data ? mapEvent(data) : undefined;
}

export async function loadPrograms(): Promise<ProgramInitiative[]> {
  if (useFilesystemContent()) return fsPrograms;
  const data = await sanityFetch<SanityProgram[]>(programsQuery);
  return (data ?? []).map(mapProgram);
}

export async function loadProgram(slug: string): Promise<ProgramInitiative | undefined> {
  if (useFilesystemContent()) return fsPrograms.find((p) => p.slug === slug);
  const data = await sanityFetch<SanityProgram | null>(programBySlugQuery, { slug });
  return data ? mapProgram(data) : undefined;
}

export async function loadFeaturedPrograms(limit = 3): Promise<ProgramInitiative[]> {
  const all = await loadPrograms();
  const featured = all.filter((p) => p.featured);
  const pool = featured.length > 0 ? featured : all;
  return pool.slice(0, limit);
}

export async function loadNewsPost(slug: string): Promise<
  | { kind: "story"; post: Story }
  | { kind: "announcement"; post: Announcement }
  | undefined
> {
  const story = await loadStory(slug);
  if (story) return { kind: "story", post: story };
  const announcement = await loadAnnouncement(slug);
  if (announcement) return { kind: "announcement", post: announcement };
  return undefined;
}
