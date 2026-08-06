import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "College of Presidents",
  description:
    "Hall of Fame of past RSAMDIO Presidents by Rotary Year, preserving institutional memory for Rotaract South Asia.",
};

export default function PresidentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
