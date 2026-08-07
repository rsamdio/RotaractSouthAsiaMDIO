import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Leadership & DRRs",
  description: `Meet the Rotaract South Asia MDIO Executive Board, District Rotaract Representatives (DRRs), and Committee Members serving Rotaract South Asia for RY ${siteConfig.rotaryYear}.`,
  openGraph: {
    title: "Leadership & DRRs | Rotaract South Asia MDIO",
    description: `Meet the Executive Board, DRRs, and Committee Members serving Rotaract South Asia for RY ${siteConfig.rotaryYear}.`,
  },
};

export default function LeadershipLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
