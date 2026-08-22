import React from "react";
import { defineField, defineType } from "sanity";
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
          { title: "Service (Handshake / Heart)", value: "service" },
          { title: "Sports & Athletics (Trophy)", value: "sports" },
          { title: "Leadership & Speaking (Mic)", value: "leadership" },
          { title: "Fellowship & Community (Users)", value: "fellowship" },
          { title: "Environment & Green (Leaf)", value: "environment" },
          { title: "Education & Literacy (Book / Graduation)", value: "education" },
          { title: "Health & Wellness (Activity / Stethoscope)", value: "health" },
          { title: "Peace & Conflict Resolution (Dove / Shield)", value: "peace" },
          { title: "Global & Cross-Border (Globe)", value: "globe" },
          { title: "Recognition & Awards (Award)", value: "award" },
          { title: "Innovation & Ideas (Lightbulb)", value: "lightbulb" },
          { title: "Campaigns & Special Projects (Sparkles)", value: "sparkles" },
          { title: "Calendar & Milestones (Calendar)", value: "calendar" },
          { title: "Compass / Direction (Compass)", value: "compass" },
          { title: "Target & Goals (Target)", value: "target" },
        ],
        layout: "dropdown",
      },
      initialValue: "service",
      validation: (r) => r.required(),
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
      name: "featured",
      title: "Featured on homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "ctaLabel",
      title: "Card CTA button label",
      type: "string",
      description: 'Text on the card action button, e.g. "Learn more", "Explore program", "Register now".',
      initialValue: "Learn more",
    }),
    defineField({
      name: "ctaUrl",
      title: "Card CTA redirect link (optional)",
      type: "url",
      description: "Optional external or custom redirect link. If left blank, clicking goes to this initiative's detail page.",
      validation: (r) => r.uri({ scheme: ["http", "https"], allowRelative: true }),
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
      categoryName: "categoryRef.title",
      colorHex: "colorRef.hex",
      media: "image",
      status: "status",
    },
    prepare({ title, categoryName, colorHex, media, status }) {
      const cat = categoryName || "Program";
      return {
        title,
        subtitle: `${cat} · ${status ?? ""}`,
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
