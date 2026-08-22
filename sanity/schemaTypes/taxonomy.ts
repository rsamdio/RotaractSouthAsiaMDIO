import React from "react";
import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'e.g. "Community Service", "Professional Development", "Leadership"',
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
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "colorRef",
      title: "Badge / Accent Color",
      type: "reference",
      to: [{ type: "brandColor" }],
      description: "Select an official color or click + to create a new one.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      colorName: "colorRef.name",
      colorHex: "colorRef.hex",
    },
    prepare({ title, subtitle, colorName, colorHex }) {
      return {
        title,
        subtitle: colorName ? `${colorName} (${colorHex})` : subtitle,
        media: () =>
          React.createElement("div", {
            style: {
              backgroundColor: colorHex || "#D41B69",
              width: "100%",
              height: "100%",
              borderRadius: "4px",
              border: "1px solid rgba(0,0,0,0.15)",
            },
          }),
      };
    },
  },
});

export const tag = defineType({
  name: "tag",
  title: "Tag",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'e.g. "Announcement", "Awareness", "Campaigns", "Hosting", "Joint Project"',
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
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `#${subtitle}` : undefined,
      };
    },
  },
});
