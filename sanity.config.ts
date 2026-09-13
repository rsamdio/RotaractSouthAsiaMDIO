"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { markdownSchema } from "sanity-plugin-markdown";
import { media } from "sanity-plugin-media";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { StudioLogo } from "./sanity/components/StudioLogo";
import { StudioLayout } from "./sanity/components/StudioLayout";
import { MarkdownBodyInput } from "./sanity/components/MarkdownBodyInput";
import { brandTheme } from "./sanity/lib/brandTheme";
import { dataset, projectId } from "./sanity/env";
import { initialValueTemplates } from "./sanity/templates";
import "easymde/dist/easymde.min.css";

const configuredProjectId = projectId || "placeholder";

export default defineConfig({
  name: "rsamdio",
  title: "RSAMDIO Admin",
  projectId: configuredProjectId,
  dataset,
  icon: StudioLogo,
  theme: brandTheme,
  basePath: "/admin",
  studio: {
    components: {
      layout: StudioLayout,
    },
  },
  plugins: [
    structureTool({ structure }),
    markdownSchema({ input: MarkdownBodyInput }),
    media(),
    visionTool({ defaultApiVersion: "2025-01-01" }),
  ],
  schema: {
    types: schemaTypes,
    templates: (prev) => [...prev, ...initialValueTemplates],
  },
});
