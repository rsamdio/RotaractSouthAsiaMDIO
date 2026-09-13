"use client";

import { useEffect } from "react";

const STYLE_ID = "rsa-studio-list-contrast";

/**
 * Forces readable list preview text on crimson selected/pressed rows.
 * Injected into document.head so it wins over Sanity UI styled-components.
 */
const CSS = `
.admin-studio [data-ui="PreviewCard"][data-selected],
.admin-studio [data-ui="PreviewCard"][data-pressed],
.admin-studio [data-ui="PreviewCard"][aria-selected="true"] {
  --card-muted-fg-color: #ffffff !important;
  --card-fg-color: #ffffff !important;
}

.admin-studio [data-ui="PreviewCard"][data-selected] [data-ui="Text"],
.admin-studio [data-ui="PreviewCard"][data-pressed] [data-ui="Text"],
.admin-studio [data-ui="PreviewCard"][aria-selected="true"] [data-ui="Text"],
.admin-studio [data-ui="PreviewCard"][data-selected] [data-testid="default-preview"] span,
.admin-studio [data-ui="PreviewCard"][data-pressed] [data-testid="default-preview"] span,
.admin-studio [data-ui="PreviewCard"][data-selected] [data-testid="compact-preview"] span,
.admin-studio [data-ui="PreviewCard"][data-pressed] [data-testid="compact-preview"] span {
  color: #ffffff !important;
}

/* Idle list subtitles: darker muted gray on ice white */
.admin-studio [data-ui="PreviewCard"]:not([data-selected]):not([data-pressed]) {
  --card-muted-fg-color: #334155;
}
`;

export function StudioListContrast() {
  useEffect(() => {
    let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
    if (!el) {
      el = document.createElement("style");
      el.id = STYLE_ID;
      document.head.appendChild(el);
    }
    el.textContent = CSS;
    return () => {
      el?.remove();
    };
  }, []);

  return null;
}
