import { MetadataRoute } from "next";
import { memberDistricts } from "@/config/memberDistricts";
import { SITE_URL } from "@/lib/seo";
import {
  loadAnnouncements,
  loadEvents,
  loadPrograms,
  loadStories,
} from "@/sanity/lib/content";

/** Stable lastmod for evergreen hub pages (avoid build-time "now"). */
const HUB_LASTMOD = new Date("2026-08-01T00:00:00.000Z");

function parseDate(value?: string): Date {
  if (!value) return HUB_LASTMOD;
  const d = new Date(`${value}T12:00:00.000Z`);
  return Number.isNaN(d.getTime()) ? HUB_LASTMOD : d;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/about",
    "/leadership",
    "/presidents",
    "/districts",
    "/initiatives",
    "/news",
    "/stories",
    "/announcements",
    "/chronicles",
    "/events",
    "/contact",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: HUB_LASTMOD,
  }));

  const districtRoutes = memberDistricts.map((d) => ({
    url: `${SITE_URL}/districts/${d.number}`,
    lastModified: HUB_LASTMOD,
  }));

  const [stories, announcements, events, programs] = await Promise.all([
    loadStories(),
    loadAnnouncements(),
    loadEvents(),
    loadPrograms(),
  ]);

  const newsRoutes = [...stories, ...announcements].map((p) => ({
    url: `${SITE_URL}/news/${p.slug}`,
    lastModified: parseDate(p.date),
  }));

  const eventRoutes = events.map((e) => ({
    url: `${SITE_URL}/events/${e.slug}`,
    lastModified: parseDate(e.startDate),
  }));

  const programRoutes = programs.map((p) => ({
    url: `${SITE_URL}/initiatives/${p.slug}`,
    lastModified: HUB_LASTMOD,
  }));

  return [
    ...staticRoutes,
    ...districtRoutes,
    ...newsRoutes,
    ...eventRoutes,
    ...programRoutes,
  ];
}
