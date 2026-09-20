import React from "react";
import { defineField, defineType } from "sanity";
import { renderProgramIcon } from "@/lib/programIcons";
import type { ProgramIconKey } from "@/config/initiatives";
import { seoField } from "./seo";

/** Shared markdown body, full EasyMDE toolbar via MarkdownBodyInput. */
const markdownBody = defineField({
  name: "body",
  title: "Body",
  type: "markdown",
  description:
    "Markdown body. The image button opens a preview with alt and caption; Insert uploads to Media, Cancel discards.",
});

export const story = defineType({
  name: "story",
  title: "Story",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: async (slug, context) => {
          const { document, getClient } = context;
          if (!document) return true;
          const client = getClient({ apiVersion: "2024-01-01" });
          const id = document._id.replace(/^drafts\./, "");
          const count = await client.fetch<number>(
            `count(*[_type in ["story", "announcement"] && !(_id in [$id, "drafts." + $id]) && slug.current == $slug])`,
            { id, slug }
          );
          return count === 0;
        },
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Publish date",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "categoryRef",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      description: "Select the primary category from the managed list or click + to create a new one.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags / Labels",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
      description: "Multi-select relevant tags/labels or click + to create new ones.",
    }),
    defineField({
      name: "colorRef",
      title: "Badge / Accent Color override",
      type: "reference",
      to: [{ type: "brandColor" }],
      description: "Optional custom badge color. If left empty, inherits the color from the selected Category.",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "image",
      title: "Hero / card image",
      type: "image",
      options: { hotspot: true },
      description: "Recommended: 1200 × 675 px (16:9 landscape) or 1200 × 630 px. High-resolution JPG or WebP.",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Card teaser and search/social summary.",
      validation: (r) => r.required().max(280),
    }),
    markdownBody,
    seoField,
  ],
  orderings: [
    {
      title: "Date, newest",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "date",
      categoryName: "categoryRef.title",
      colorHex: "colorRef.hex",
      media: "image",
    },
    prepare({ title, subtitle, categoryName, colorHex, media }) {
      const cat = categoryName || "Story";
      return {
        title,
        subtitle: `${cat} · ${subtitle ?? ""}`,
        media:
          media ||
          (() =>
            React.createElement("div", {
              style: {
                backgroundColor: colorHex || "#D41B69",
                width: "100%",
                height: "100%",
                borderRadius: "4px",
              },
            })),
      };
    },
  },
});

export const announcement = defineType({
  name: "announcement",
  title: "Announcement",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: async (slug, context) => {
          const { document, getClient } = context;
          if (!document) return true;
          const client = getClient({ apiVersion: "2024-01-01" });
          const id = document._id.replace(/^drafts\./, "");
          const count = await client.fetch<number>(
            `count(*[_type in ["story", "announcement"] && !(_id in [$id, "drafts." + $id]) && slug.current == $slug])`,
            { id, slug }
          );
          return count === 0;
        },
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Publish date",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "categoryRef",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      description: "Select the primary category from the managed list or click + to create a new one.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags / Labels",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
      description: "Multi-select relevant tags/labels or click + to create new ones.",
    }),
    defineField({
      name: "colorRef",
      title: "Badge / Accent Color override",
      type: "reference",
      to: [{ type: "brandColor" }],
      description: "Optional custom badge color. If left empty, inherits the color from the selected Category.",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "image",
      title: "Hero / card image",
      type: "image",
      options: { hotspot: true },
      description: "Recommended: 1200 × 675 px (16:9 landscape) or 1200 × 630 px. High-resolution JPG or WebP.",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Card teaser and search/social summary.",
      validation: (r) => r.required().max(280),
    }),
    markdownBody,
    seoField,
  ],
  orderings: [
    {
      title: "Date, newest",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "date",
      categoryName: "categoryRef.title",
      colorHex: "colorRef.hex",
      media: "image",
    },
    prepare({ title, subtitle, categoryName, colorHex, media }) {
      const cat = categoryName || "Announcement";
      return {
        title,
        subtitle: `${cat} · ${subtitle ?? ""}`,
        media:
          media ||
          (() =>
            React.createElement("div", {
              style: {
                backgroundColor: colorHex || "#D41B69",
                width: "100%",
                height: "100%",
                borderRadius: "4px",
              },
            })),
      };
    },
  },
});

export const chronicleEdition = defineType({
  name: "chronicleEdition",
  title: "RSA Chronicles edition",
  type: "document",
  fields: [
    defineField({
      name: "editionName",
      title: "Edition name",
      type: "string",
      description: 'e.g. "March 2026"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "editionName", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Release date",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "preview",
      title: "Preview blurb",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(320),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image (A4 portrait)",
      type: "image",
      options: { hotspot: true },
      description: "Upload a portrait cover (recommended 1200 × 1697 px or A4 aspect ratio 1:1.414). Shown as an A4 preview on the site.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "readerUrl",
      title: "Reader URL",
      type: "url",
      description: "External edition reader on the publications hub.",
      validation: (r) => r.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "colorRef",
      title: "Accent / Highlight Color",
      type: "reference",
      to: [{ type: "brandColor" }],
      description: "Optional custom highlight color for this edition.",
    }),
  ],
  orderings: [
    {
      title: "Release date, newest",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "editionName", subtitle: "date", media: "coverImage" },
    prepare: ({ title, subtitle, media }) => ({
      title: `RSA Chronicles, ${title}`,
      subtitle,
      media,
    }),
  },
});

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 4,
      description: "Shown in cards and the detail sidebar summary.",
      validation: (r) => r.required(),
    }),
    markdownBody,
    defineField({
      name: "image",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
      description: "Recommended: 1200 × 675 px (16:9 landscape) or 1400 × 800 px. High-resolution JPG or WebP.",
    }),
    defineField({
      name: "kindRef",
      title: "Kind",
      type: "reference",
      to: [{ type: "eventKind" }],
      description: "Select the kind from the managed list or click + to create a new one.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "colorRef",
      title: "Accent / Badge Color",
      type: "reference",
      to: [{ type: "brandColor" }],
      description: "Select an official color or click + to create a new one.",
    }),
    defineField({
      name: "signature",
      title: "Show in Signature Events",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "startDate",
      title: "Start date",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "endDate",
      title: "End date",
      type: "date",
      description: "Optional, for multi-day events.",
    }),
    defineField({
      name: "startTime",
      title: "Start time",
      type: "string",
      description: '24h local time, e.g. "09:30".',
    }),
    defineField({
      name: "endTime",
      title: "End time",
      type: "string",
      description:
        'Optional. 24h local time in the timezone below, e.g. "17:00". Leave blank if no published end time.',
    }),
    defineField({
      name: "timezoneLabel",
      title: "Timezone label",
      type: "string",
      options: {
        list: [
          { title: "IST - India / Sri Lanka (UTC+05:30)", value: "IST" },
          { title: "PKT - Pakistan (UTC+05:00)", value: "PKT" },
          { title: "MVT - Maldives (UTC+05:00)", value: "MVT" },
          { title: "NPT - Nepal (UTC+05:45)", value: "NPT" },
          { title: "BST - Bangladesh (UTC+06:00)", value: "BST" },
          { title: "BTT - Bhutan (UTC+06:00)", value: "BTT" },
          { title: "AFT - Afghanistan (UTC+04:30)", value: "AFT" },
        ],
        layout: "dropdown",
      },
      initialValue: "IST",
      description:
        "Prefer IST for regional MDIO timings. Pick another zone only when the published local time is for that country.",
    }),

    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "venue",
      title: "Venue",
      type: "string",
    }),
    defineField({
      name: "registrationUrl",
      title: "Registration / event site URL",
      type: "url",
      validation: (r) => r.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "registrationLabel",
      title: "Registration button label",
      type: "string",
      initialValue: "Register",
    }),
    seoField,
  ],
  orderings: [
    {
      title: "Start date, upcoming first",
      name: "startAsc",
      by: [{ field: "startDate", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "startDate",
      media: "image",
      kind: "kindRef.title",
    },
    prepare: ({ title, subtitle, media, kind }) => ({
      title,
      subtitle: `${kind ?? "event"} · ${subtitle ?? ""}`,
      media,
    }),
  },
});

export const programInitiative = defineType({
  name: "programInitiative",
  title: "Initiative",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "categoryRef",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      description: "Select the category from the managed list or click + to create a new one.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "colorRef",
      title: "Badge / Accent Color override",
      type: "reference",
      to: [{ type: "brandColor" }],
      description: "Optional custom badge color. If left empty, inherits the color from the selected Category.",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Ongoing", value: "ongoing" },
          { title: "Upcoming", value: "upcoming" },
          { title: "Seasonal", value: "seasonal" },
          { title: "Completed", value: "completed" },
        ],
        layout: "radio",
      },
      initialValue: "ongoing",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      description: "Card teaser and social/search summary.",
      validation: (r) => r.required().max(320),
    }),
    defineField({
      name: "livingNote",
      title: "Living note",
      type: "string",
      description: "One-line status on cards, e.g. timing or how clubs join.",
      validation: (r) => r.required().max(160),
    }),
    defineField({
      name: "iconRef",
      title: "Icon",
      type: "reference",
      to: [{ type: "initiativeIcon" }],
      description: "Select an icon from the managed list or click + to create a new one.",
    }),
    defineField({
      name: "icon",
      title: "Legacy Icon Key (Fallback)",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "image",
      title: "Hero / card image",
      type: "image",
      options: { hotspot: true },
      description: "Recommended: 1200 × 675 px (16:9 landscape) or 1200 × 630 px. High-resolution JPG or WebP.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Display priority / Order number",
      type: "number",
      description: "Priority number for ordering on the site (e.g. 1 for top priority, 2, 3...). Lower numbers appear first. If left blank, items sort alphabetically.",
    }),
    defineField({
      name: "featured",
      title: "Featured on homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "ctaLabel",
      title: "Detail page action button label",
      type: "string",
      description: 'Button text for the primary action button on the initiative detail page, e.g. "Register now", "Join cohort", "Visit website".',
      initialValue: "Learn more",
    }),
    defineField({
      name: "ctaUrl",
      title: "Detail page action link / Registration URL (optional)",
      type: "url",
      description: "Optional external or custom link (e.g. registration form, event portal, external website). Displayed as the primary action button on the initiative's detail page.",
      validation: (r) => r.uri({ scheme: ["http", "https"], allowRelative: true }),
    }),
    markdownBody,
    seoField,
  ],
  orderings: [
    {
      title: "Display Order (1, 2, 3...)",
      name: "orderAsc",
      by: [
        { field: "order", direction: "asc" },
        { field: "title", direction: "asc" },
      ],
    },
    {
      title: "Title, A–Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      categoryName: "categoryRef.title",
      colorHex: "colorRef.hex",
      catColorHex: "categoryRef.colorRef.hex",
      media: "image",
      status: "status",
      iconKey: "iconRef.key",
      legacyIcon: "icon",
      order: "order",
    },
    prepare({ title, categoryName, colorHex, catColorHex, media, status, iconKey, legacyIcon, order }) {
      const cat = categoryName || "Program";
      const icon = (iconKey || legacyIcon) as ProgramIconKey | undefined;
      const bg = colorHex || catColorHex || "#D41B69";
      const orderPrefix = typeof order === "number" ? `[#${order}] ` : "";
      return {
        title,
        subtitle: `${orderPrefix}${cat} · ${status ?? ""}`,
        media:
          media ||
          (() =>
            React.createElement(
              "div",
              {
                style: {
                  backgroundColor: bg,
                  width: "100%",
                  height: "100%",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                },
              },
              icon ? renderProgramIcon(icon, undefined, { size: 18, strokeWidth: 2 }) : null
            )),
      };
    },
  },
});
