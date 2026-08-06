import {
  BookOpen,
  Newspaper,
  Award,
  Route,
  Receipt,
  Radio,
  type LucideIcon,
} from "lucide-react";

export type PlatformKey =
  | "library"
  | "invoice"
  | "navigate"
  | "publications"
  | "certify"
  | "pulse";

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
    eyebrow: "Featured Core Documents",
    title: "Rotaract Library",
    copy: "Foundational constitutional models, recommended bylaws, brand assets, oaths, and operational checklists for every club and district board.",
    displayUrl: "library.rsamdio.org",
    previewUrl: "https://library.rsamdio.org/",
    embeddable: true,
    icon: BookOpen,
    checklist: [
      "Standard Club Constitution (RI approved)",
      "Rotaract Recommended Bylaws",
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
    copy: "Estimate club invoices with precision. Calculate MDIO secretariat dues, processing levies, and district-ready totals for your active membership.",
    displayUrl: "dues.rsamdio.org",
    previewUrl: "https://dues.rsamdio.org/",
    embeddable: true,
    icon: Receipt,
    checklist: [
      "Dynamic Membership-Based Dues Estimate",
      "District-Ready Invoice Totals",
      "Processing Levy Breakdown",
      "Export-Friendly Calculation Flow",
    ],
    primaryBtnText: "Open Invoice Calculator",
    primaryBtnUrl: "https://dues.rsamdio.org/",
  },
  {
    key: "navigate",
    label: "NAVIGATE",
    eyebrow: "Administration Suite",
    title: "NAVIGATE",
    copy: "Guided pathways that help Rotaractors plan their leadership journey, from club roles to district administration and capacity seminars.",
    displayUrl: "navigate.rsamdio.org",
    previewUrl: "https://navigate.rsamdio.org/",
    embeddable: true,
    icon: Route,
    checklist: [
      "Guided Pathways for Rotaract Leaders",
      "District Administration Resources",
      "Officer Onboarding Support",
      "Capacity Seminar & Training Links",
    ],
    primaryBtnText: "Launch NAVIGATE",
    primaryBtnUrl: "https://navigate.rsamdio.org/",
  },
  {
    key: "publications",
    label: "Publications Hub",
    eyebrow: "Strategic Library Assets",
    title: "Publications Hub",
    copy: "Official annual reports, strategic frameworks, service portfolios, and district publications from across South Asia.",
    displayUrl: "publications.rsamdio.org",
    previewUrl: "https://publications.rsamdio.org/",
    embeddable: true,
    previewBg: "#f6f3ed",
    icon: Newspaper,
    checklist: [
      "District Publications Archive",
      "Regional Reports & Frameworks",
      "South Asia Resource Collections",
      "Public Impact Documents",
    ],
    primaryBtnText: "Browse Publications",
    primaryBtnUrl: "https://publications.rsamdio.org/",
  },
  {
    key: "certify",
    label: "Certify",
    eyebrow: "Digital Credentials",
    title: "Rotaract Certify",
    copy: "A cryptographically secure certification engine to issue and verify participation records, seminar graduations, and outstanding service credentials.",
    displayUrl: "certify.rsamdio.org",
    previewUrl: "https://certify.rsamdio.org/",
    embeddable: true,
    icon: Award,
    checklist: [
      "Digital Leadership Seminar Certificates",
      "Outstanding Project Award Verifier",
      "Verified Activity Certificate Downloads",
      "Induction & Recognition Credentials",
    ],
    primaryBtnText: "Access Certificate Hub",
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
      "Multi-District Collaboration Spaces",
      "Lightweight Access for Clubs & Boards",
    ],
    primaryBtnText: "Open PULSE",
    primaryBtnUrl: "https://pulse.rsamdio.org/",
  },
];

export function getPlatformTool(key: PlatformKey) {
  return platformTools.find((t) => t.key === key);
}
