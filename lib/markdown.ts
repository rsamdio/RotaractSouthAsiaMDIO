import { marked } from "marked";

marked.setOptions({
  gfm: true,
  breaks: true,
});

/** Shared markdown → HTML (Studio preview + public pages). */
export function renderMarkdown(source: string | undefined | null): string {
  if (!source?.trim()) return "";
  return marked.parse(source, { async: false }) as string;
}
