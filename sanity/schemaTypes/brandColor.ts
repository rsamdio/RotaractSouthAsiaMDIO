import React from "react";
import { defineField, defineType } from "sanity";

export const brandColor = defineType({
  name: "brandColor",
  title: "Badge / Accent Color",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Color Name",
      type: "string",
      description: 'e.g. "Crimson", "Navy Blue", "Gold", "Emerald Green", "Royal Purple"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "hex",
      title: "Hex Code",
      type: "string",
      description: 'e.g. "#D41B69", "#17458F", "#F7A81B", "#059669"',
      validation: (r) =>
        r
          .required()
          .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
            name: "hex",
            invert: false,
          })
          .error("Please enter a valid hex color starting with # (e.g. #D41B69)."),
    }),
    defineField({
      name: "description",
      title: "Usage Note / Description",
      type: "string",
      description: 'Optional note on where to use this color (e.g. "Primary RSAMDIO Brand Color").',
    }),
  ],
  preview: {
    select: {
      title: "name",
      hex: "hex",
      description: "description",
    },
    prepare({ title, hex, description }) {
      return {
        title: `${title} (${hex ?? ""})`,
        subtitle: description || hex,
        media: () =>
          React.createElement("div", {
            style: {
              backgroundColor: hex || "#D41B69",
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
