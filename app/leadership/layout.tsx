import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadership & DRRs | RSAMDIO",
  description:
    "Meet the Rotaract South Asia MDIO Executive Board, District Rotaract Representatives (DRRs), and Committee Members leading RY 2026–27 across RI Zones 4, 5, 6, and 7.",
  openGraph: {
    title: "Leadership & DRRs | RSAMDIO",
    description:
      "Meet the Executive Board, DRRs, and Committee Members leading Rotaract South Asia for RY 2026–27.",
  },
};

export default function LeadershipLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
