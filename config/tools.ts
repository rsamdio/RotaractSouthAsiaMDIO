// Named digital products in the RSAMDIO resource ecosystem — the concrete
// tools referenced sitewide as "Featured Initiatives" / the Resources hub.

export type Tool = {
  slug: string;
  name: string;
  tagline: string;
  desc: string;
  icon: string; // lucide-react icon name
  color: string;
  url: string;
};

export const tools: Tool[] = [
  {
    slug: "library",
    name: "Rotaract Library",
    tagline: "Templates, essentials & brand assets",
    desc: "The regional hub for constitutions, bylaws, induction scripts, and standardized planning canvases used by every member club.",
    icon: "book-open",
    color: "#D41B69",
    url: "https://library.rsamdio.org/essentials",
  },
  {
    slug: "certify",
    name: "Rotaract Certify",
    tagline: "Digital certification & recognition",
    desc: "Issue and verify leadership seminar certificates, outstanding-project awards, and induction graduation badges with a cryptographic signature check.",
    icon: "award",
    color: "#F7A81B",
    url: "https://library.rsamdio.org/",
  },
  {
    slug: "brand-kit",
    name: "Brand Kit",
    tagline: "Wordmarks, palette & templates",
    desc: "Official vector logo packs, the Cranberry/Gold brand book, and ready-to-use social and event banner templates.",
    icon: "image",
    color: "#17458F",
    url: "https://library.rsamdio.org/#brand-identity",
  },
  {
    slug: "publications",
    name: "Publications Hub",
    tagline: "Reports, reviews & disclosures",
    desc: "Annual Secretariat impact reports, grants participation FAQs, and financial expense guidelines in one archive.",
    icon: "newspaper",
    color: "#7E22CE",
    url: "https://library.rsamdio.org/#publications",
  },
  {
    slug: "navigate",
    name: "NAVIGATE",
    tagline: "District administration suite",
    desc: "Dues invoice calculators, assembly schedulers, and PETS capacity-seminar decks for smarter district operations.",
    icon: "route",
    color: "#17458F",
    url: "https://library.rsamdio.org/",
  },
];

export function getTool(slug: string) {
  return tools.find((t) => t.slug === slug);
}
