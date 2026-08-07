import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: 'College of Presidents',
  description:
    'Hall of Fame of past RSAMDIO Presidents by Rotary Year, preserving institutional memory for Rotaract South Asia.',
  path: '/presidents',
});

export default function PresidentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
