import { siteConfig } from "@/config/site";
import type { FaqItem } from "@/lib/seo";

/** Visible About FAQ + FAQPage JSON-LD (keep in sync). */
export const aboutFaqs: FaqItem[] = [
  {
    question: "What is RSAMDIO?",
    answer: siteConfig.description,
  },
  {
    question: "Is RSAMDIO a governing body for districts?",
    answer:
      "No. RSAMDIO is a Multi-District Information Organization. It disseminates information and facilitates communication among Rotaract clubs. It does not govern or replace district leadership.",
  },
  {
    question: "Who is it for?",
    answer:
      "Rotaractors, Rotaract clubs, and member districts across South Asia. The site is also useful for global visitors learning about the regional MDIO.",
  },
  {
    question: "What does RSAMDIO offer?",
    answer:
      "Information, communication, leadership learning, and multidistrict programs, plus platforms that support clubs and districts.",
  },
  {
    question: "How do we contact RSAMDIO?",
    answer: `Email ${siteConfig.contact.general} for general questions, district updates, partnerships, and media.`,
  },
];
