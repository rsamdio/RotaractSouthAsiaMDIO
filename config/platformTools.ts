import {
  BookOpen,
  Newspaper,
  Award,
  Route,
  Receipt,
  Radio,
  MapPin,
  type LucideIcon,
} from "lucide-react";

export type PlatformKey =
  | "library"
  | "invoice"
  | "publications"
  | "clubs"
  | "certify"
  | "pulse"
  | "navigate";

export type PlatformTool = {
  key: PlatformKey;
  label: string;
  eyebrow: string;
  title: string;
  copy: string;
  displayUrl: string;
  previewUrl: string;
  /** false when the host blocks framing */
  embeddable: boolean;
  fallbackImage?: string;
  previewBg?: string;
  icon: LucideIcon;
  checklist: string[];
  primaryBtnText: string;
  primaryBtnUrl: string;
};

/** Guest layout width — wide enough to trigger desktop CSS breakpoints. */
export const DESKTOP_VIEWPORT_WIDTH = 1440;

export const platformTools: PlatformTool[] = [
  {
    key: "library",
    label: "Rotaract Library",
    eyebrow: "Rotaract Knowledge Base",
    title: "Rotaract Library",
    copy: "A curated library of official documents, assets, templates, guides, checklists, and tools for Rotaract leaders.",
    displayUrl: "library.rsamdio.org",
    previewUrl: "https://library.rsamdio.org/",
    embeddable: true,
    icon: BookOpen,
    checklist: [
      "Standard Documents & Assets",
      "Rotaract Recommended Guides",
      "Brand Assets & RSAMDIO Identity",
      "Club Essentials, Roles & Learning Materials",
    ],
    primaryBtnText: "Browse Full Library",
    primaryBtnUrl: "https://library.rsamdio.org/",
  },
  {
    key: "invoice",
    label: "Invoice Calculator",
    eyebrow: "Finance Toolkit",
    title: "Club Invoice Calculator",
    copy: "Estimate your Rotaract club's January Club Invoice with breakdowns for Annual Dues, Pro Rata Dues, local tax, and local currency.",
    displayUrl: "dues.rsamdio.org",
    previewUrl: "https://dues.rsamdio.org/",
    embeddable: true,
    icon: Receipt,
    checklist: [
      "8-Step Learning Pathway",
      "Dynamic Membership-Based Dues Estimate",
      "Import and Save your Club Roster",
      "Per-Member Detailed View",
    ],
    primaryBtnText: "Open Calculator",
    primaryBtnUrl: "https://dues.rsamdio.org/",
  },
  {
    key: "publications",
    label: "Publications Hub",
    eyebrow: "Publications & Editions",
    title: "Publications Hub",
    copy: "The digital space for publications from Districts of Rotaract South Asia.",
    displayUrl: "publications.rsamdio.org",
    previewUrl: "https://publications.rsamdio.org/",
    embeddable: true,
    previewBg: "#f6f3ed",
    icon: Newspaper,
    checklist: [
      "District Publications",
      "Regional Publications",
      "RSA Chronicles",
      "One Designation for All",
    ],
    primaryBtnText: "Browse Publications",
    primaryBtnUrl: "https://publications.rsamdio.org/",
  },
  {
    key: "clubs",
    label: "Club Finder",
    eyebrow: "Discover Clubs",
    title: "Club Finder",
    copy: "Explore Rotaract clubs across South Asia on an interactive map. Search by city, district, or club name and find a club near you.",
    displayUrl: "clubs.rsamdio.org",
    previewUrl: "https://clubs.rsamdio.org/",
    embeddable: true,
    icon: MapPin,
    checklist: [
      "Map-Based Club Discovery",
      "Search by City, District & Club Name",
      "Community & Institution Filters",
      "Near Me Discovery",
    ],
    primaryBtnText: "Open Club Finder",
    primaryBtnUrl: "https://clubs.rsamdio.org/",
  },
  {
    key: "navigate",
    label: "NAVIGATE",
    eyebrow: "Guides & Walkthroughs",
    title: "NAVIGATE",
    copy: "Step-by-step interactive walkthroughs and demos for Rotaractors to navigate with confidence.",
    displayUrl: "navigate.rsamdio.org",
    previewUrl: "https://navigate.rsamdio.org/",
    embeddable: true,
    icon: Route,
    checklist: [
      "Guided Pathways",
      "Interactive Demos",
      "MyRotary Guides",
      "Club Officer Guides",
    ],
    primaryBtnText: "Launch NAVIGATE",
    primaryBtnUrl: "https://navigate.rsamdio.org/",
  },
  {
    key: "certify",
    label: "Rotaract Certify",
    eyebrow: "Digital Credentials",
    title: "Rotaract Certify",
    copy: "Issue reconitions and certification, credentials for Rotaractors across South Asia.",
    displayUrl: "certify.rsamdio.org",
    previewUrl: "https://certify.rsamdio.org/",
    embeddable: true,
    icon: Award,
    checklist: [
      "Digital Certificates",
      "Redeem Code Based Certificate",
      "Verified Certificate Generation",
      "Multi-type Certificate Issuance",
    ],
    primaryBtnText: "Access Certify",
    primaryBtnUrl: "https://certify.rsamdio.org/",
  },
  {
    key: "pulse",
    label: "PULSE",
    eyebrow: "Live Collaboration",
    title: "PULSE",
    copy: "Live rooms for Rotaract sessions, discussions, and events. Keep districts connected in real time across South Asia.",
    displayUrl: "pulse.rsamdio.org",
    previewUrl: "https://pulse.rsamdio.org/",
    embeddable: true,
    icon: Radio,
    checklist: [
      "Live Session & Event Rooms",
      "Real-Time District Discussions",
      "Ask & Upvote Questions",
      "Multi-District Collaboration",
    ],
    primaryBtnText: "Open PULSE",
    primaryBtnUrl: "https://pulse.rsamdio.org/",
  },
];

export function getPlatformTool(key: PlatformKey) {
  return platformTools.find((t) => t.key === key);
}
