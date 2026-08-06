import { MetadataRoute } from "next";
import { memberDistricts } from "@/config/memberDistricts";
import { loadAnnouncements, loadEvents, loadStories } from "@/sanity/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://rsamdio.org";

  const staticRoutes = [
    "",
    "/about",
    "/leadership",
    "/presidents",
    "/districts",
    "/initiatives",
    "/news",
    "/stories",
    "/chronicles",
    "/events",
    "/contact",
    "/privacy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const districtRoutes = memberDistricts.map((d) => ({
    url: `${baseUrl}/districts/${d.number}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const [stories, announcements, events] = await Promise.all([
    loadStories(),
    loadAnnouncements(),
    loadEvents(),
  ]);

  const newsRoutes = [...stories, ...announcements].map((p) => ({
    url: `${baseUrl}/news/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const eventRoutes = events.map((e) => ({
    url: `${baseUrl}/events/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...districtRoutes, ...newsRoutes, ...eventRoutes];
}
