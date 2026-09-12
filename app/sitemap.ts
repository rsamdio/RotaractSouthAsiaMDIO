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
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      lastModified: HUB_LASTMOD,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/news`,
      lastModified: HUB_LASTMOD,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/events`,
      lastModified: HUB_LASTMOD,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/districts`,
      lastModified: HUB_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/initiatives`,
      lastModified: HUB_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: HUB_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/leadership`,
      lastModified: HUB_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/stories`,
      lastModified: HUB_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/announcements`,
      lastModified: HUB_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/chronicles`,
      lastModified: HUB_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/presidents`,
      lastModified: HUB_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: HUB_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: HUB_LASTMOD,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: HUB_LASTMOD,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const districtRoutes: MetadataRoute.Sitemap = memberDistricts.map((d) => ({
    url: `${SITE_URL}/districts/${d.number}`,
    lastModified: HUB_LASTMOD,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const [stories, announcements, events, programs] = await Promise.all([
    loadStories(),
    loadAnnouncements(),
    loadEvents(),
    loadPrograms(),
  ]);

  const newsRoutes: MetadataRoute.Sitemap = [...stories, ...announcements].map((p) => ({
    url: `${SITE_URL}/news/${p.slug}`,
    lastModified: parseDate(p.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const eventRoutes: MetadataRoute.Sitemap = events.map((e) => ({
    url: `${SITE_URL}/events/${e.slug}`,
    lastModified: parseDate(e.startDate),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const programRoutes: MetadataRoute.Sitemap = programs.map((p) => ({
    url: `${SITE_URL}/initiatives/${p.slug}`,
    lastModified: HUB_LASTMOD,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...districtRoutes,
    ...newsRoutes,
    ...eventRoutes,
    ...programRoutes,
  ];
}
