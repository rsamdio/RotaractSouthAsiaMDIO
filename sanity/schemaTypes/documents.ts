import { defineField, defineType } from "sanity";

const markdownBody = defineField({
  name: "body",
  title: "Body",
  type: "markdown",
  description: "Full article body (markdown). Preview in Studio mirrors the public site.",
});

export const story = defineType({
  name: "story",
  title: "Story",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "meta", title: "Meta" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "meta",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category label",
      type: "string",
      group: "meta",
      description: 'Short label on cards, e.g. "Service" or "Leadership".',
      initialValue: "Service",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      group: "content",
      description: "Card teaser & search/social summary.",
      validation: (r) => r.required().max(280),
    }),
    defineField({
      name: "image",
      title: "Hero / card image",
      type: "image",
      group: "content",
      options: { hotspot: true },
    }),
    defineField({
      name: "date",
      title: "Publish date",
      type: "date",
      group: "meta",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "meta",
      initialValue: false,
    }),
    markdownBody,
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
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "meta", title: "Meta" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "meta",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category label",
      type: "string",
      group: "meta",
      initialValue: "Announcement",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      group: "content",
      description: "Card teaser & search/social summary.",
      validation: (r) => r.required().max(280),
    }),
    defineField({
      name: "image",
      title: "Hero / card image",
      type: "image",
      group: "content",
      options: { hotspot: true },
    }),
    defineField({
      name: "date",
      title: "Publish date",
      type: "date",
      group: "meta",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "meta",
      initialValue: false,
    }),
    markdownBody,
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
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "schedule", title: "Schedule & place" },
    { name: "registration", title: "Registration" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 4,
      group: "content",
      description: "Shown in cards and the detail sidebar summary.",
      validation: (r) => r.required(),
    }),
    markdownBody,
    defineField({
      name: "image",
      title: "Hero image",
      type: "image",
      group: "content",
      options: { hotspot: true },
    }),
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      group: "content",
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
      group: "content",
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
      group: "content",
      initialValue: false,
    }),
    defineField({
      name: "startDate",
      title: "Start date",
      type: "date",
      group: "schedule",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "endDate",
      title: "End date",
      type: "date",
      group: "schedule",
      description: "Optional — for multi-day events.",
    }),
    defineField({
      name: "startTime",
      title: "Start time",
      type: "string",
      group: "schedule",
      description: '24h local time, e.g. "09:30".',
    }),
    defineField({
      name: "endTime",
      title: "End time",
      type: "string",
      group: "schedule",
    }),
    defineField({
      name: "timezoneLabel",
      title: "Timezone label",
      type: "string",
      group: "schedule",
      initialValue: "IST",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      group: "schedule",
    }),
    defineField({
      name: "venue",
      title: "Venue",
      type: "string",
      group: "schedule",
    }),
    defineField({
      name: "registrationUrl",
      title: "Registration / event site URL",
      type: "url",
      group: "registration",
      validation: (r) => r.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "registrationLabel",
      title: "Registration button label",
      type: "string",
      group: "registration",
      initialValue: "Register",
    }),
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
