"use client";

import { defineConfig, buildLegacyTheme } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { markdownSchema } from "sanity-plugin-markdown";
import { media } from "sanity-plugin-media";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { StudioLogo } from "./sanity/components/StudioLogo";
import { MarkdownBodyInput } from "./sanity/components/MarkdownBodyInput";
import { dataset, projectId } from "./sanity/env";
import "easymde/dist/easymde.min.css";

const brandTheme = buildLegacyTheme({
  "--black": "#0B1426",
  "--white": "#ffffff",
  "--gray": "#64748b",
  "--gray-base": "#64748b",
  "--component-bg": "#FAFAF8",
  "--component-text-color": "#0B1426",
  "--brand-primary": "#D41B69",
  "--default-button-color": "#64748b",
  "--default-button-primary-color": "#D41B69",
  "--state-info-color": "#17458F",
  "--state-success-color": "#0f766e",
  "--state-warning-color": "#F7A81B",
  "--state-danger-color": "#D41B69",
  "--main-navigation-color": "#0B1426",
  "--main-navigation-color--inverted": "#ffffff",
  "--focus-color": "#D41B69",
});

const configuredProjectId = projectId || "placeholder";

export default defineConfig({
  name: "rsamdio",
  title: "RSAMDIO Admin",
  projectId: configuredProjectId,
  dataset,
  icon: StudioLogo,
  theme: brandTheme,
  basePath: "/admin",
  plugins: [
    structureTool({ structure }),
    markdownSchema({ input: MarkdownBodyInput }),
    media(),
    visionTool({ defaultApiVersion: "2025-01-01" }),
  ],
  schema: {
    types: schemaTypes,
  },
});
