import Link from "next/link";
import { ArrowRight, ExternalLink, Megaphone, Newspaper } from "lucide-react";
import {
  loadAnnouncements,
  loadChronicles,
  loadStories,
} from "@/sanity/lib/content";
import type { ChronicleEdition, NewsKind, Story } from "@/config/news";
import { Reveal } from "./Reveal";

type FeedItem = Story & { kind: NewsKind };

function byDateDesc(a: { date: string }, b: { date: string }) {
  return b.date.localeCompare(a.date);
}

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function buildFeed(stories: Story[], announcements: Story[]): FeedItem[] {
  return [
    ...stories.map((p) => ({ ...p, kind: "story" as const })),
    ...announcements.map((p) => ({ ...p, kind: "announcement" as const })),
  ].sort(byDateDesc);
}

export async function NewsUpdatesPreview() {
  const [stories, announcements, chronicles] = await Promise.all([
    loadStories(),
    loadAnnouncements(),
    loadChronicles(),
  ]);

  const feed = buildFeed(stories, announcements);
  const [featured, ...rest] = feed;
  const sidePosts = rest.slice(0, 3);
  const shownSlugs = new Set(
    [featured, ...sidePosts].filter(Boolean).map((p) => p!.slug)
  );
  const railAnnouncements = [...announcements]
    .sort(byDateDesc)
    .filter((a) => !shownSlugs.has(a.slug))
    .slice(0, 2);
  // If the feed already ate both announcements, still surface the latest one
  const announcementItems =
    railAnnouncements.length > 0
      ? railAnnouncements
      : [...announcements].sort(byDateDesc).slice(0, 1);
  const latestChronicle = [...chronicles].sort(byDateDesc)[0];

  if (!featured && !latestChronicle) return null;

  return (
    <section
      id="news"
      className="relative scroll-mt-24 bg-white px-5 py-20 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-[#D41B69]/6 blur-[100px]" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#17458F]/6 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4 sm:mb-12">
          <div>
            <span className="mb-4 inline-block rounded-full border border-[#D41B69]/20 bg-[#D41B69]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#D41B69]">
              News & Updates
            </span>
            <h2
              className="text-3xl font-bold text-[#0B1426] sm:text-4xl"
              style={{ fontFamily: "General Sans, sans-serif" }}
            >
              Stories, Announcements & Chronicles
            </h2>
            <p className="mt-3 max-w-xl text-sm text-slate-500 sm:text-base">
              The latest from across South Asia — field stories, secretariat
              updates, and the RSA Chronicles newsletter.
            </p>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B1426] transition-colors hover:text-[#D41B69]"
          >
            View all news
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="flex flex-col gap-5 lg:gap-6">
          {/* Top: featured + chronicle */}
          <div className="grid items-stretch gap-5 lg:grid-cols-12 lg:gap-6">
            {featured && (
              <Reveal className="lg:col-span-8">
                <FeaturedPost post={featured} />
              </Reveal>
            )}
            {latestChronicle && (
              <Reveal delay={0.08} className="lg:col-span-4">
                <ChronicleRail edition={latestChronicle} />
              </Reveal>
            )}
          </div>

          {/* Bottom: posts + announcements share one row — fills desktop width */}
          {(sidePosts.length > 0 || announcementItems.length > 0) && (
            <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {sidePosts.map((post, i) => (
                <Reveal key={`${post.kind}-${post.slug}`} delay={0.04 * (i + 1)}>
                  <CompactPost post={post} />
                </Reveal>
              ))}
              {announcementItems.length > 0 && (
                <Reveal delay={0.16}>
                  <AnnouncementsRail items={announcementItems} />
                </Reveal>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function KindBadge({ kind, category }: { kind: NewsKind; category: string }) {
  if (kind === "announcement") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-[#FCE8F1] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#D41B69]">
        <Megaphone className="h-3 w-3" />
        Announcement
      </span>
    );
  }
  return (
    <span className="inline-flex rounded-full bg-[#F7A81B]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8A5A00]">
      {category}
    </span>
  );
}

function FeaturedPost({ post }: { post: FeedItem }) {
  return (
    <Link
      href={`/news/${post.slug}`}
      className="group relative flex min-h-[280px] flex-col overflow-hidden rounded-[2rem] bg-slate-100 shadow-soft sm:min-h-[320px] lg:h-full lg:min-h-[360px]"
    >
      {post.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="absolute inset-0 bg-slate-200" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1426]/90 via-[#0B1426]/35 to-transparent" />
      <div className="relative mt-auto p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <KindBadge kind={post.kind} category={post.category} />
          <span className="text-[11px] font-semibold text-white/70">
            {formatDate(post.date)}
          </span>
        </div>
        <h3
          className="mt-3 text-xl font-bold leading-snug text-white sm:text-2xl"
          style={{ fontFamily: "General Sans, sans-serif" }}
        >
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/75">
          {post.excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#F7A81B]">
          Read {post.kind === "announcement" ? "announcement" : "story"}
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

function CompactPost({ post }: { post: FeedItem }) {
  return (
    <Link
      href={`/news/${post.slug}`}
      className="group flex h-full flex-col rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-4 transition hover:border-[#D41B69]/25 hover:shadow-md sm:p-5"
    >
      <KindBadge kind={post.kind} category={post.category} />
      <h3
        className="mt-3 line-clamp-3 text-sm font-bold leading-snug text-[#0B1426] transition group-hover:text-[#D41B69]"
        style={{ fontFamily: "General Sans, sans-serif" }}
      >
        {post.title}
      </h3>
      <p className="mt-auto pt-3 text-[11px] font-semibold text-slate-400">
        {formatDate(post.date)}
      </p>
    </Link>
  );
}

function ChronicleRail({ edition }: { edition: ChronicleEdition }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-[#FBF6EC] to-white p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D41B69]/10 text-[#D41B69]">
          <Newspaper className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D41B69]">
            RSA Chronicles
          </p>
          <p className="text-xs font-semibold text-slate-500">Latest edition</p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[150px] lg:max-w-[170px]">
        <div className="relative aspect-[210/297] overflow-hidden rounded-sm bg-white shadow-[0_12px_40px_-12px_rgba(11,20,38,0.35)] ring-1 ring-black/5">
          {edition.heroImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={edition.heroImage}
              alt={`RSA Chronicles — ${edition.editionName} cover`}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          ) : (
            <div className="absolute inset-0 bg-slate-200" />
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-col text-center">
        <h3
          className="text-base font-bold text-[#0B1426] sm:text-lg"
          style={{ fontFamily: "General Sans, sans-serif" }}
        >
          {edition.editionName}
        </h3>
        <p className="mt-1 text-xs text-slate-400">
          Released {formatDate(edition.date)}
        </p>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
          {edition.preview}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <a
            href={edition.readerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#D41B69] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#9A0E4E]"
          >
            Read edition
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <Link
            href="/chronicles"
            className="text-xs font-bold text-[#D41B69] transition hover:underline"
          >
            All editions
          </Link>
        </div>
      </div>
    </article>
  );
}

function AnnouncementsRail({ items }: { items: Story[] }) {
  return (
    <div className="flex h-full flex-col rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 sm:rounded-[1.75rem] sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D41B69]">
          Announcements
        </p>
        <Link
          href="/news#announcements"
          className="text-xs font-bold text-slate-500 transition hover:text-[#D41B69]"
        >
          See all
        </Link>
      </div>
      <ul className="flex flex-1 flex-col justify-center space-y-2.5">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/news/${item.slug}`}
              className="group block rounded-2xl border border-transparent bg-white px-3.5 py-2.5 transition hover:border-[#D41B69]/20 hover:shadow-sm"
            >
              <p className="text-[11px] font-semibold text-slate-400">
                {formatDate(item.date)}
              </p>
              <p className="mt-1 text-sm font-bold leading-snug text-[#0B1426] transition group-hover:text-[#D41B69]">
                {item.title}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
