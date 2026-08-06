import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { NewsKind, Story } from "@/config/news";

type Props = {
  kind: NewsKind;
  newer: Story | null;
  older: Story | null;
  indexLabel: string;
};

export function PostAdjacentNav({ kind, newer, older, indexLabel }: Props) {
  const streamLabel = kind === "story" ? "Stories" : "Announcements";
  const streamHref =
    kind === "story" ? "/news#stories" : "/news#announcements";
  const olderLabel = kind === "story" ? "Older story" : "Older announcement";
  const newerLabel = kind === "story" ? "Newer story" : "Newer announcement";

  return (
    <nav
      aria-label={`${streamLabel} navigation`}
      className="mt-14 border-t border-slate-200 pt-10"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
          {indexLabel}
        </p>
        <Link
          href={streamHref}
          className="text-sm font-semibold text-slate-500 transition hover:text-[#D41B69]"
        >
          All {streamLabel}
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {older ? (
          <Link
            href={`/news/${older.slug}`}
            className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-[#D41B69]/30 hover:bg-[#FCE8F1]/40"
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-[#D41B69]">
              <ArrowLeft className="h-3.5 w-3.5" />
              {olderLabel}
            </span>
            <p className="mt-2 text-base font-bold leading-snug text-[#0B1426] group-hover:text-[#D41B69]">
              {older.title}
            </p>
          </Link>
        ) : (
          <div className="hidden sm:block" aria-hidden />
        )}

        {newer ? (
          <Link
            href={`/news/${newer.slug}`}
            className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 text-right transition hover:border-[#D41B69]/30 hover:bg-[#FCE8F1]/40 sm:justify-self-stretch"
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-[#D41B69]">
              {newerLabel}
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
            <p className="mt-2 text-base font-bold leading-snug text-[#0B1426] group-hover:text-[#D41B69]">
              {newer.title}
            </p>
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
