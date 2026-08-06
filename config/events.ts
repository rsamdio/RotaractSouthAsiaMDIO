/**
 * Public site event shape + static fallback seed (USE_FS_CONTENT=1 or no Sanity env).
 * Live editorial content comes from Sanity (`event` documents).
 */

export type EventAccent = "pink" | "gold" | "blue";
export type EventKind = "signature" | "regional" | "training" | "session";

export type SiteEvent = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  /** Markdown body (optional; falls back to description on detail pages) */
  body?: string;
  startDate: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  timezoneLabel?: string;
  location?: string;
  venue?: string;
  image?: string;
  kind: EventKind;
  accent: EventAccent;
  registrationUrl?: string;
  registrationLabel?: string;
  signature?: boolean;
};

export const siteEvents: SiteEvent[] = [
  {
    slug: "ananta-2026",
    title: "ANANTA 2026",
    tagline: "17th RSA MDIO Installation Ceremony & ROAR Awards",
    description:
      "The historic 17th Rotaract South Asia MDIO Installation Ceremony and ROAR Awards at Ramada by Wyndham Yelahanka, marking the regional leadership transition for RY 2026–27 under President Arun Teja Godavarthi.",
    startDate: "2026-05-23",
    endDate: "2026-05-25",
    startTime: "09:00",
    endTime: "21:00",
    timezoneLabel: "IST",
    location: "Bengaluru, Karnataka, India",
    venue: "Ramada by Wyndham Yelahanka",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80",
    kind: "signature",
    accent: "gold",
    signature: true,
    registrationUrl: "https://ananta.rsamdio.org/",
    registrationLabel: "Visit ANANTA site",
  },
  {
    slug: "presidents-academy-2026",
    title: "South Asia Rotaract Presidents Academy",
    tagline: "Regional officer leadership training",
    description:
      "An intensive training seminar equipping incoming club presidents with strategic planning, governance, and team-building fundamentals ahead of the new Rotary Year.",
    startDate: "2026-07-18",
    endDate: "2026-07-20",
    startTime: "08:30",
    endTime: "18:00",
    timezoneLabel: "IST",
    location: "Hyderabad, India",
    venue: "To be announced",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1400&q=80",
    kind: "training",
    accent: "pink",
    signature: true,
    registrationUrl: "https://rsamdio.org/contact",
    registrationLabel: "Request details",
  },
  {
    slug: "civic-impact-summit-2026",
    title: "South Asia Civic Impact & CSR Summit",
    tagline: "Community project funding and allocation",
    description:
      "A summit connecting district service chairs with CSR partners and Rotary Foundation grant officers to plan the year's flagship service initiatives.",
    startDate: "2026-10-10",
    endDate: "2026-10-11",
    startTime: "09:00",
    endTime: "17:30",
    timezoneLabel: "IST",
    location: "Colombo, Sri Lanka",
    image:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1400&q=80",
    kind: "regional",
    accent: "blue",
    signature: true,
  },
  {
    slug: "rsacon-2027",
    title: "South Asia Rotaract Convention (RSACon)",
    tagline: "Annual regional delegate convention",
    description:
      "The MDIO's largest annual gathering — delegates from all 8 member nations convene for keynotes, elections, awards, and cross-district fellowship.",
    startDate: "2027-05-14",
    endDate: "2027-05-16",
    startTime: "09:00",
    timezoneLabel: "IST",
    location: "South Asia — host city TBA",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1400&q=80",
    kind: "signature",
    accent: "gold",
    signature: true,
  },
  {
    slug: "drr-onboarding-webinar-aug-2026",
    title: "DRR Onboarding Webinar",
    tagline: "Virtual session for newly confirmed DRRs",
    description:
      "A focused virtual briefing covering MDIO reporting rhythms, brand standards, and how districts plug into regional programmes for RY 2026–27.",
    startDate: "2026-08-08",
    startTime: "19:00",
    endTime: "20:30",
    timezoneLabel: "IST",
    location: "Online",
    venue: "Zoom",
    kind: "session",
    accent: "pink",
    registrationUrl: "https://rsamdio.org/contact",
    registrationLabel: "Register via Secretariat",
  },
  {
    slug: "public-image-clinic-sep-2026",
    title: "Public Image Clinic",
    tagline: "Storytelling & brand clinic for club editors",
    description:
      "A short evening clinic for club and district public-image chairs — framing service stories, photo standards, and how to submit updates to RSA Chronicles.",
    startDate: "2026-09-12",
    startTime: "18:30",
    endTime: "20:00",
    timezoneLabel: "IST",
    location: "Online",
    kind: "session",
    accent: "blue",
    registrationUrl: "https://rsamdio.org/contact",
    registrationLabel: "Save your seat",
  },
  {
    slug: "ananta-installation-prep-2026",
    title: "ANANTA Host Committee Briefing",
    tagline: "Pre-event coordination for Bengaluru hosts",
    description:
      "Coordination call with the Bengaluru host committee covering venue flow, volunteer roles, and delegate hospitality for ANANTA 2026.",
    startDate: "2026-04-12",
    startTime: "17:00",
    endTime: "18:00",
    timezoneLabel: "IST",
    location: "Online",
    kind: "session",
    accent: "gold",
  },
  {
    slug: "south-asia-summit-2026",
    title: "South Asia Leadership Summit",
    tagline: "Record regional delegate turnout",
    description:
      "Three days of leadership training and fellowship with representatives from every member nation.",
    startDate: "2026-02-14",
    endDate: "2026-02-16",
    startTime: "09:00",
    location: "South Asia",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1400&q=80",
    kind: "regional",
    accent: "pink",
    signature: true,
  },
  {
    slug: "year-end-secretariat-sync-2025",
    title: "Year-End Secretariat Sync",
    tagline: "Closing RY 2025–26 operations review",
    description:
      "Internal sync for the outgoing and incoming Secretariat teams — handovers, open programmes, and calendar priorities for the next Rotary Year.",
    startDate: "2025-12-20",
    startTime: "16:00",
    endTime: "17:30",
    timezoneLabel: "IST",
    location: "Online",
    kind: "session",
    accent: "blue",
  },
];

function todayIso() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function byStartAsc(a: SiteEvent, b: SiteEvent) {
  return a.startDate.localeCompare(b.startDate);
}
function byStartDesc(a: SiteEvent, b: SiteEvent) {
  return b.startDate.localeCompare(a.startDate);
}

export function getSiteEvent(slug: string) {
  return siteEvents.find((e) => e.slug === slug);
}
export function getAllEventSlugs() {
  return siteEvents.map((e) => e.slug);
}
export function getUpcomingEvents(limit?: number) {
  const today = todayIso();
  const list = siteEvents.filter((e) => (e.endDate ?? e.startDate) >= today).sort(byStartAsc);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}
export function getPastEvents(limit?: number) {
  const today = todayIso();
  const list = siteEvents.filter((e) => (e.endDate ?? e.startDate) < today).sort(byStartDesc);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}
export function getSignatureEvents() {
  return siteEvents.filter((e) => e.signature).sort(byStartAsc);
}
export function getEventsForMonth(year: number, monthIndex: number) {
  const prefix = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;
  return siteEvents.filter((e) => {
    if (e.startDate.startsWith(prefix) || e.endDate?.startsWith(prefix)) return true;
    if (!e.endDate) return false;
    const start = new Date(`${e.startDate}T12:00:00`);
    const end = new Date(`${e.endDate}T12:00:00`);
    const monthStart = new Date(year, monthIndex, 1);
    const monthEnd = new Date(year, monthIndex + 1, 0, 23, 59, 59);
    return start <= monthEnd && end >= monthStart;
  });
}
export function formatEventDateRange(event: SiteEvent) {
  const start = new Date(`${event.startDate}T12:00:00`);
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
  if (!event.endDate || event.endDate === event.startDate) {
    return start.toLocaleDateString("en-US", opts);
  }
  const end = new Date(`${event.endDate}T12:00:00`);
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })}–${end.getDate()}, ${end.getFullYear()}`;
  }
  return `${start.toLocaleDateString("en-US", opts)} – ${end.toLocaleDateString("en-US", opts)}`;
}
export function formatEventTime(event: SiteEvent) {
  if (!event.startTime) return null;
  const label = event.endTime ? `${event.startTime} – ${event.endTime}` : event.startTime;
  return event.timezoneLabel ? `${label} ${event.timezoneLabel}` : label;
}
export function eventMonthYear(event: SiteEvent) {
  const d = new Date(`${event.startDate}T12:00:00`);
  return {
    month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    year: String(d.getFullYear()),
    day: d.getDate(),
  };
}
export function isPastEvent(event: SiteEvent) {
  return (event.endDate ?? event.startDate) < todayIso();
}

/** Helpers that operate on an arbitrary list (Sanity or FS seed). */
export function filterUpcoming(events: SiteEvent[], limit?: number) {
  const today = todayIso();
  const list = events.filter((e) => (e.endDate ?? e.startDate) >= today).sort(byStartAsc);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}
export function filterPast(events: SiteEvent[], limit?: number) {
  const today = todayIso();
  const list = events.filter((e) => (e.endDate ?? e.startDate) < today).sort(byStartDesc);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}
export function filterSignature(events: SiteEvent[]) {
  return events.filter((e) => e.signature).sort(byStartAsc);
}
export function filterMonth(events: SiteEvent[], year: number, monthIndex: number) {
  const prefix = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;
  return events.filter((e) => {
    if (e.startDate.startsWith(prefix) || e.endDate?.startsWith(prefix)) return true;
    if (!e.endDate) return false;
    const start = new Date(`${e.startDate}T12:00:00`);
    const end = new Date(`${e.endDate}T12:00:00`);
    const monthStart = new Date(year, monthIndex, 1);
    const monthEnd = new Date(year, monthIndex + 1, 0, 23, 59, 59);
    return start <= monthEnd && end >= monthStart;
  });
}
