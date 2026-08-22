import { defineField, defineType } from "sanity";

/** Optional Search & social overrides for leaf documents. */
export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Meta title",
      type: "string",
      description:
        "Overrides the page title in search and social. Leave blank to use the document title. Max ~60 characters.",
      validation: (r) => r.max(60),
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "text",
      rows: 3,
      description:
        "Overrides the search/social summary. Leave blank to use the card teaser (excerpt, tagline, or summary). Max 160 characters.",
      validation: (r) => r.max(160),
    }),
    defineField({
      name: "ogImage",
      title: "Social share image",
      type: "image",
      options: { hotspot: true },
      description:
        "Recommended: 1200 × 630 px (landscape). Leave blank to use the hero/cover image, then the site default.",
    }),
  ],
});

export const seoField = defineField({
  name: "seo",
  title: "Search & social",
  type: "seo",
  description:
    "Optional. Leave blank to use the document title and card teaser. Do not claim RSAMDIO governs districts. Prefer platforms/programs language.",
  options: { collapsible: true, collapsed: true },
});
