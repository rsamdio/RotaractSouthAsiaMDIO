import type { Timestamp } from "firebase/firestore";

// Live "Upcoming Events" are read from Firestore (collection: "events") via
// lib/firebase.ts + the useUpcomingEvents hook — see components/EventCard.tsx.
// This file holds the shared Event type plus the fallback/default event,
// signature (recurring) events, and calendar highlights used across the site.

export type Event = {
  id: string;
  title: string;
  month: string;
  year: string;
  location: string;
  description: string;
  category: "pink" | "gold" | "blue";
  link?: string;
  createdAt?: Timestamp;
};

export const defaultEvents: Event[] = [
  {
    id: "default-1",
    title: "ANANTA 2026: 17th RSA MDIO Installation Ceremony & ROAR Awards",
    month: "MAY",
    year: "2026",
    location: "Bengaluru, Karnataka, India",
    description:
      "The historic 17th Rotaract South Asia MDIO Installation Ceremony and ROAR Awards at Ramada by Wyndham Yelahanka, marking the regional leadership transition for RY 2026–27 under President Arun Teja Godavarthi.",
    category: "gold",
    link: "https://ananta.rsamdio.org/",
  },
];

export type SignatureEvent = {
  slug: string;
  title: string;
  tagline: string;
  month: string;
  year: string;
  description: string;
};

export const signatureEvents: SignatureEvent[] = [
  {
    slug: "presidents-academy",
    title: "South Asia Rotaract Presidents Academy",
    tagline: "Regional officer leadership training",
    month: "JUL",
    year: "2026",
    description:
      "An intensive training seminar equipping incoming club presidents with strategic planning, governance, and team-building fundamentals ahead of the new Rotary Year.",
  },
  {
    slug: "civic-impact-summit",
    title: "South Asia Civic Impact & CSR Summit",
    tagline: "Community project funding and allocation",
    month: "OCT",
    year: "2026",
    description:
      "A summit connecting district service chairs with CSR partners and Rotary Foundation grant officers to plan the year's flagship service initiatives.",
  },
  {
    slug: "rsacon",
    title: "South Asia Rotaract Convention (RSACon)",
    tagline: "Annual regional delegate convention",
    month: "MAY",
    year: "2027",
    description:
      "The MDIO's largest annual gathering — delegates from all 8 member nations convene for keynotes, elections, awards, and cross-district fellowship.",
  },
];

export type CalendarHighlight = {
  date: string; // day of month, 1-31
  label: string;
  color: "pink" | "gold" | "blue";
};

export const calendarHighlights: CalendarHighlight[] = [
  { date: "1", label: "Rotary Year begins", color: "pink" },
  { date: "14", label: "District dues deadline", color: "gold" },
  { date: "25", label: "Executive Board meeting", color: "blue" },
];
