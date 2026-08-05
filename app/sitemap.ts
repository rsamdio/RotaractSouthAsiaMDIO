import { MetadataRoute } from "next";
import { memberDistricts } from "@/config/memberDistricts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rsamdio.org";

  const staticRoutes = [
    "",
    "/about",
    "/leadership",
    "/presidents",
    "/districts",
    "/initiatives",
    "/news",
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

  const newsRoutes = [
    "rebuilding-after-floods-district-3220",
    "south-asia-summit-record-attendance",
    "clean-water-project-nepal",
  ].map((slug) => ({
    url: `${baseUrl}/news/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...districtRoutes, ...newsRoutes];
}
