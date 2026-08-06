import { renderMarkdown } from "@/lib/markdown";

export function MarkdownContent({
  source,
  className = "",
}: {
  source?: string | null;
  className?: string;
}) {
  const html = renderMarkdown(source);
  if (!html) return null;
  return (
    <div
      className={`rbe-md-preview ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
