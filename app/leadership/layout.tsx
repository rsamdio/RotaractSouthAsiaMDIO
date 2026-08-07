import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Leadership & DRRs",
  description: `Meet the Rotaract South Asia MDIO Executive Board, District Rotaract Representatives (DRRs), and Committee Members serving Rotaract South Asia for RY ${siteConfig.rotaryYear}.`,
  path: "/leadership",
});

export default function LeadershipLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
