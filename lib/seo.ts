import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { platformTools } from "@/config/platformTools";

export const SITE_URL = siteConfig.url.replace(/\/$/, "");
export const DEFAULT_OG_PATH = "/img/og-default.png";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export type SeoOverride = {
  title?: string;
  description?: string;
  ogImage?: string;
};

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

/** Absolute public URL for a site path. */
export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") return SITE_URL;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function truncateMeta(text: string, max = 160): string {
  const trimmed = text.replace(/\s+/g, " ").trim();
  if (trimmed.length <= max) return trimmed;
  const slice = trimmed.slice(0, max - 1);
  const lastSpace = slice.lastIndexOf(" ");
  return `${(lastSpace > 80 ? slice.slice(0, lastSpace) : slice).trimEnd()}...`;
}

export function resolveSeo(input: {
  title: string;
  description: string;
  image?: string | null;
  seo?: SeoOverride | null;
}): { title: string; description: string; image: string } {
  return {
    title: input.seo?.title?.trim() || input.title,
    description: truncateMeta(
      input.seo?.description?.trim() || input.description
    ),
    image: input.seo?.ogImage || input.image || DEFAULT_OG_PATH,
  };
}

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  /** Use absolute document title (home) instead of template segment. */
  absoluteTitle?: boolean;
  type?: "website" | "article";
  robots?: Metadata["robots"];
};

export function buildPageMetadata({
  title,
  description,
  path,
  image,
  absoluteTitle = false,
  type = "website",
  robots,
}: BuildPageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const desc = truncateMeta(description);
  const imagePath = image || DEFAULT_OG_PATH;
  const ogImages = [
    {
      url: imagePath,
      width: 1200,
      height: 630,
      alt: title,
    },
  ];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: desc,
      url,
      siteName: siteConfig.fullName,
      locale: "en_US",
      type,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [imagePath],
    },
    ...(robots ? { robots } : {}),
  };
}

export function graph(...nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

export function organizationNode(): Record<string, unknown> {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: siteConfig.fullName,
    alternateName: [siteConfig.name, "Rotaract South Asia Multi-District Information Organization"],
    url: SITE_URL,
    description: siteConfig.description,
    email: siteConfig.contact.general,
    logo: absoluteUrl("/img/favicon.png"),
    sameAs: Object.values(siteConfig.social),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: siteConfig.contact.general,
        availableLanguage: ["English"],
      },
    ],
  };
}

export function webSiteNode(includePlatformParts = false): Record<string, unknown> {
  const node: Record<string, unknown> = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: siteConfig.fullName,
    description: siteConfig.description,
    inLanguage: "en-US",
    publisher: { "@id": ORGANIZATION_ID },
  };

  if (includePlatformParts) {
    node.hasPart = platformTools.map((tool) => ({
      "@type": "WebApplication",
      name: tool.title,
      url: tool.primaryBtnUrl || tool.previewUrl,
      description: tool.copy,
      applicationCategory: "BusinessApplication",
      provider: { "@id": ORGANIZATION_ID },
    }));
  }

  return node;
}

export function breadcrumbNode(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleNode(input: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  image?: string | null;
  kind?: "story" | "announcement";
}): Record<string, unknown> {
  const image = input.image || DEFAULT_OG_PATH;
  return {
    "@type": input.kind === "announcement" ? "NewsArticle" : "Article",
    headline: input.title,
    description: truncateMeta(input.description),
    datePublished: input.datePublished,
    dateModified: input.datePublished,
    mainEntityOfPage: absoluteUrl(input.path),
    image: [image.startsWith("http") ? image : absoluteUrl(image)],
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    isPartOf: { "@id": WEBSITE_ID },
  };
}

export function eventNode(input: {
  title: string;
  description: string;
  path: string;
  startDate: string;
  endDate?: string;
  location?: string;
  venue?: string;
  image?: string | null;
  registrationUrl?: string;
}): Record<string, unknown> {
  const image = input.image || DEFAULT_OG_PATH;
  const node: Record<string, unknown> = {
    "@type": "Event",
    name: input.title,
    description: truncateMeta(input.description),
    startDate: input.startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: absoluteUrl(input.path),
    image: [image.startsWith("http") ? image : absoluteUrl(image)],
    organizer: { "@id": ORGANIZATION_ID },
  };

  if (input.endDate) node.endDate = input.endDate;

  if (input.location || input.venue) {
    node.location = {
      "@type": "Place",
      name: input.venue || input.location,
      address: input.location || input.venue,
    };
  }

  if (input.registrationUrl) {
    node.offers = {
      "@type": "Offer",
      url: input.registrationUrl,
      availability: "https://schema.org/InStock",
    };
  }

  return node;
}

export function faqPageNode(faqs: FaqItem[]): Record<string, unknown> {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
