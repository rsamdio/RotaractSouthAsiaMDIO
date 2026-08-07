import { defineField, defineType } from "sanity";
import { seoField } from "./seo";

/** Shared markdown body — full EasyMDE toolbar via MarkdownBodyInput. */
const markdownBody = defineField({
  name: "body",
  title: "Body",
  type: "markdown",
  description:
    "Markdown body — toolbar covers headings, strike, lists, checklist, table, HR, code, and images. The image button opens a preview (alt + optional caption); Insert uploads to Media, Cancel discards.",
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
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Publish date",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category label",
      type: "string",
      description: 'Short label on cards, e.g. "Service" or "Leadership".',
      initialValue: "Service",
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
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Card teaser & search/social summary.",
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
    select: { title: "title", subtitle: "date", media: "image" },
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
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Publish date",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category label",
      type: "string",
      initialValue: "Announcement",
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
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Card teaser & search/social summary.",
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
    select: { title: "title", subtitle: "date", media: "image" },
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
      description: "Upload a portrait cover — shown as an A4 preview on the site.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "readerUrl",
      title: "Reader URL",
      type: "url",
      description: "External edition reader (publications hub).",
      validation: (r) => r.required().uri({ scheme: ["http", "https"] }),
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
      title: `RSA Chronicles — ${title}`,
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
    }),
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      options: {
        list: [
          { title: "Signature", value: "signature" },
          { title: "Regional", value: "regional" },
          { title: "Training", value: "training" },
          { title: "Session", value: "session" },
        ],
        layout: "radio",
      },
      initialValue: "session",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "accent",
      title: "Accent color",
      type: "string",
      options: {
        list: [
          { title: "Pink", value: "pink" },
          { title: "Gold", value: "gold" },
          { title: "Blue", value: "blue" },
        ],
        layout: "radio",
      },
      initialValue: "pink",
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
      description: "Optional — for multi-day events.",
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
    }),
    defineField({
      name: "timezoneLabel",
      title: "Timezone label",
      type: "string",
      initialValue: "IST",
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
      kind: "kind",
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
      name: "category",
      title: "Category label",
      type: "string",
      description: 'Short label on cards, e.g. "Service" or "Sports".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Upcoming", value: "upcoming" },
          { title: "Seasonal", value: "seasonal" },
        ],
        layout: "radio",
      },
      initialValue: "active",
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
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          { title: "Service", value: "service" },
          { title: "Sports", value: "sports" },
          { title: "Leadership", value: "leadership" },
          { title: "Fellowship", value: "fellowship" },
          { title: "Environment", value: "environment" },
        ],
        layout: "dropdown",
      },
      initialValue: "service",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "accent",
      title: "Accent color",
      type: "string",
      description: "Hex color for badges, e.g. #D41B69.",
      initialValue: "#D41B69",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Hero / card image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured on homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "ctaLabel",
      title: "Card CTA label",
      type: "string",
      initialValue: "Learn more",
    }),
    markdownBody,
    seoField,
  ],
  orderings: [
    {
      title: "Title, A–Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image",
      status: "status",
    },
    prepare: ({ title, subtitle, media, status }) => ({
      title,
      subtitle: `${subtitle ?? "Program"} · ${status ?? ""}`,
      media,
    }),
  },
});
