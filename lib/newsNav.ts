import type { NewsKind, Story } from "@/config/news";

function byDateDesc(a: Story, b: Story) {
  return b.date.localeCompare(a.date);
}

export function getAdjacentFromList(
  posts: Story[],
  slug: string,
  kind: NewsKind
): {
  kind: NewsKind;
  newer: Story | null;
  older: Story | null;
  indexLabel: string;
} | null {
  const stream = [...posts].sort(byDateDesc);
  const index = stream.findIndex((p) => p.slug === slug);
  if (index === -1) return null;
  const kindLabel = kind === "story" ? "Story" : "Announcement";
  return {
    kind,
    newer: index > 0 ? stream[index - 1] : null,
    older: index < stream.length - 1 ? stream[index + 1] : null,
    indexLabel: `${index + 1} of ${stream.length} ${kindLabel}${stream.length === 1 ? "" : "s"}`,
  };
}
