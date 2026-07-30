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
    summary: "The regional hub for constitutions, bylaws, induction scripts, and standardized planning canvases used by every member club.",
    url: "https://library.rsamdio.org/essentials",
  },
  {
    slug: "certify",
    title: "Rotaract Certify",
    category: "DIGITAL CERTIFICATION & RECOGNITION",
    icon: "award",
    color: "#F7A81B",
    summary: "Issue and verify leadership seminar certificates, outstanding-project awards, and induction graduation badges with a cryptographic signature check.",
    url: "https://library.rsamdio.org/",
  },
  {
    slug: "brand-kit",
    title: "Brand Kit",
    category: "WORDMARKS, PALETTE & TEMPLATES",
    icon: "image",
    color: "#17458F",
    summary: "Official vector logo packs, the Cranberry/Gold brand book, and ready-to-use social and event banner templates.",
    url: "https://library.rsamdio.org/#brand-identity",
  },
  {
    slug: "publications",
    title: "Publications Hub",
    category: "REPORTS, REVIEWS & DISCLOSURES",
    icon: "newspaper",
    color: "#7E22CE",
    summary: "Annual Secretariat impact reports, grants participation FAQs, and financial expense guidelines in one archive.",
    url: "https://library.rsamdio.org/#publications",
  },
  {
    slug: "navigate",
    title: "NAVIGATE",
    category: "DISTRICT ADMINISTRATION SUITE",
    icon: "route",
    color: "#17458F",
    summary: "Dues invoice calculators, assembly schedulers, and PETS capacity-seminar decks for smarter district operations.",
    url: "https://library.rsamdio.org/",
  },
];

export function getInitiative(slug: string) {
  return initiatives.find((i) => i.slug === slug);
}

