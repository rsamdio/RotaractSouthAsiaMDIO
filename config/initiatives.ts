// Initiatives directory — representing the core RSAMDIO platforms and tools.

export type Initiative = {
  slug: string;
  title: string;
  category: string;
  icon: string; // lucide-react icon name
  color: string;
  summary: string;
  highlights?: string[];
  image?: string;
  url?: string;
};

export const initiatives: Initiative[] = [
  {
    slug: "library",
    title: "Rotaract Library",
    category: "TEMPLATES, ESSENTIALS & BRAND ASSETS",
    icon: "book-open",
    color: "#D41B69",
    summary: "The regional hub for constitutions, bylaws, brand assets, induction scripts, and standardized planning canvases used by every member club.",
    url: "https://library.rsamdio.org/",
  },
  {
    slug: "invoice",
    title: "Club Invoice Calculator",
    category: "FINANCE & DUES TOOLING",
    icon: "receipt",
    color: "#10B981",
    summary: "Estimate club invoices with precision — membership dues, processing levies, and district-ready totals in one calculator.",
    url: "https://dues.rsamdio.org/",
  },
  {
    slug: "navigate",
    title: "NAVIGATE",
    category: "DISTRICT ADMINISTRATION SUITE",
    icon: "route",
    color: "#17458F",
    summary: "Guided pathways, assembly resources, and officer onboarding support for smarter district operations.",
    url: "https://navigate.rsamdio.org/",
  },
  {
    slug: "publications",
    title: "Publications Hub",
    category: "REPORTS, REVIEWS & DISCLOSURES",
    icon: "newspaper",
    color: "#7E22CE",
    summary: "District publications, regional reports, and public impact documents from across South Asia in one archive.",
    url: "https://publications.rsamdio.org/",
  },
  {
    slug: "certify",
    title: "Rotaract Certify",
    category: "DIGITAL CERTIFICATION & RECOGNITION",
    icon: "award",
    color: "#F7A81B",
    summary: "Issue and verify leadership seminar certificates, outstanding-project awards, and induction graduation badges with a cryptographic signature check.",
    url: "https://certify.rsamdio.org/",
  },
  {
    slug: "pulse",
    title: "PULSE",
    category: "LIVE SESSIONS & DISCUSSIONS",
    icon: "radio",
    color: "#D41B69",
    summary: "Live rooms for Rotaract sessions, discussions, and events — keeping clubs and districts connected in real time.",
    url: "https://pulse.rsamdio.org/",
  },
];

export function getInitiative(slug: string) {
  return initiatives.find((i) => i.slug === slug);
}
