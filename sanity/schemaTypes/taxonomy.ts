import React from "react";
import { defineField, defineType } from "sanity";
import { renderProgramIcon } from "@/lib/programIcons";
import type { ProgramIconKey } from "@/config/initiatives";

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

export const eventKind = defineType({
  name: "eventKind",
  title: "Event Kind",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'e.g. "Signature", "Regional", "Training", "Session"',
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

export const initiativeIcon = defineType({
  name: "initiativeIcon",
  title: "Initiative Icon",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'Display label, e.g. "Compass / Direction", "Service (Handshake / Heart)"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "key",
      title: "Icon Key",
      type: "string",
      description:
        'Lucide icon key identifier, e.g. "compass", "service", "sports", "leadership", "fellowship", "environment", "education", "health", "peace", "globe", "award", "lightbulb", "sparkles", "calendar", "target".',
      options: {
        list: [
          { title: "Compass / Direction (compass)", value: "compass" },
          { title: "Service / Hands & Heart (service)", value: "service" },
          { title: "Sports & Athletics (sports)", value: "sports" },
          { title: "Leadership & Speaking (leadership)", value: "leadership" },
          { title: "Fellowship & Community (fellowship)", value: "fellowship" },
          { title: "Environment & Green (environment)", value: "environment" },
          { title: "Education & Literacy (education)", value: "education" },
          { title: "Health & Wellness (health)", value: "health" },
          { title: "Peace & Harmony (peace)", value: "peace" },
          { title: "Global & Cross-Border (globe)", value: "globe" },
          { title: "Recognition & Awards (award)", value: "award" },
          { title: "Innovation & Ideas (lightbulb)", value: "lightbulb" },
          { title: "Campaigns & Special Projects (sparkles)", value: "sparkles" },
          { title: "Calendar & Milestones (calendar)", value: "calendar" },
          { title: "Target & Goals (target)", value: "target" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      description: "Optional notes on where or when to use this icon.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      key: "key",
    },
    prepare({ title, key }: { title?: string; key?: string }) {
      return {
        title: title || "Untitled Icon",
        subtitle: key ? `Key: ${key}` : undefined,
        media: () =>
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                borderRadius: "6px",
                backgroundColor: "#FCE8F1",
                color: "#D41B69",
              },
            },
            renderProgramIcon((key as ProgramIconKey) || "service", undefined, {
              size: 20,
              strokeWidth: 2,
            })
          ),
      };
    },
  },
});
