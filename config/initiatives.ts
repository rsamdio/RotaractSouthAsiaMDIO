// Initiatives directory — signature programs and the four Rotaract focus areas.

export type Initiative = {
  slug: string;
  title: string;
  category: string;
  icon: string; // lucide-react icon name
  color: string;
  summary: string;
  highlights: string[];
  image: string;
};

export const initiatives: Initiative[] = [
  {
    slug: "signature-initiatives",
    title: "Signature Initiatives",
    category: "FLAGSHIP",
    icon: "sparkles",
    color: "#D41B69",
    summary:
      "The MDIO's flagship cross-border programs — from the ROAR Awards to the annual South Asia Rotaract Convention — that bring the region together each year.",
    highlights: [
      "ANANTA: Annual RSAMDIO Installation Ceremony & ROAR Awards",
      "South Asia Rotaract Convention (RSACon)",
      "Chairperson's Roundtable for DRR strategic alignment",
      "Regional Officer Leadership Academies",
    ],
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "leadership-development",
    title: "Leadership Development",
    category: "CAPACITY BUILDING",
    icon: "graduation-cap",
    color: "#D41B69",
    summary:
      "Specialized operational training to certify regional officers and build lasting management skill across every district.",
    highlights: [
      "PETS: President-Elect Training Seminars",
      "RZI Elect Workbook — theory into verified district action",
      "DRR induction ceremonies and onboarding scripts",
      "Strategic planning & goal-setting canvases",
    ],
    image: "https://images.unsplash.com/photo-1560439514-4e9645039924?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "service-impact",
    title: "Service & Impact",
    category: "COMMUNITY SERVICE",
    icon: "hand-heart",
    color: "#17458F",
    summary:
      "Large-scale civic projects targeting the region's most pressing challenges: clean environment, education access, and public health.",
    highlights: [
      "Green South Asia environmental conservation drives",
      "CSR partnerships aligning corporate grants with local needs",
      "Rotary Global Grants pathways for district-scale projects",
      "Mega medical camps and blood donation drives",
    ],
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "public-image",
    title: "Public Image",
    category: "PUBLIC RELATIONS",
    icon: "megaphone",
    color: "#F7A81B",
    summary:
      "Consistent branding that increases the visibility and credibility of the Rotaract movement across every member nation.",
    highlights: [
      "Unified wordmark, brand wheel, and Cranberry/Gold palette",
      "Social media announcement and event banner templates",
      "Regional media inquiry and press coordination",
      "Public image guide for district-level communications teams",
    ],
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "fellowship-exchange",
    title: "Fellowship & Cross-Border Collaboration",
    category: "FELLOWSHIP",
    icon: "heart-handshake",
    color: "#7E22CE",
    summary:
      "Bilateral youth exchange programs and cross-district friendship conventions that build lifelong bonds across the region.",
    highlights: [
      "Cultural homestays between member nations",
      "Regional exchange delegations for district assemblies",
      "Consolidated fellowship networking meetups",
      "Sister-club agreements across borders",
    ],
    image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "youth-engagement",
    title: "Youth Learning & Engagement",
    category: "YOUTH DEVELOPMENT",
    icon: "rocket",
    color: "#17458F",
    summary:
      "Equipping young changemakers with mentorship, digital tools, and learning pathways designed for the next generation of leaders.",
    highlights: [
      "Career mentorship pairings with alumni Rotarians",
      "Digital literacy and project-management workshops",
      "Interactive learning modules for new members",
      "Youth innovation challenges across districts",
    ],
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
  },
];

export function getInitiative(slug: string) {
  return initiatives.find((i) => i.slug === slug);
}
