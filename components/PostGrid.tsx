import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Story } from "@/config/news";

type Props = {
  posts: Story[];
  featuredCta: string;
  secondaryCta: string;
  /** Base path for post links — default `/news` */
  hrefBase?: string;
  /**
   * Cap cards in the side column (featured stays posts[0]).
   * When set, posts beyond 1 + sideLimit are not rendered here — use an overflow grid.
   */
  sideLimit?: number;
};

export function PostSecondaryCard({
  post,
  cta,
  hrefBase = "/news",
}: {
  post: Story;
  cta: string;
  hrefBase?: string;
}) {
  return (
    <Link
      href={`${hrefBase}/${post.slug}`}
      className="block rounded-[2rem] bg-slate-50 p-7 shadow-xl transition hover:-translate-y-1"
    >
      <div className="flex flex-wrap items-center gap-1.5">
        <span
          className={
            post.customColor
              ? "rounded-full px-3 py-1 text-xs font-bold"
              : "rounded-full bg-blush px-3 py-1 text-xs font-bold text-crimson"
          }
          style={
            post.customColor
              ? {
                  backgroundColor: `${post.customColor}18`,
                  color: post.customColor,
                }
              : undefined
          }
        >
          {post.category}
        </span>
        {post.tags?.slice(0, 2).map((t) => (
          <span key={t} className="rounded-full bg-slate-200/70 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
            #{t}
          </span>
        ))}
      </div>
      <h3 className="mt-5 text-xl font-bold tracking-tight text-ink">{post.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{post.excerpt}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-crimson">
        {cta} <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

export function PostGrid({
  posts,
  featuredCta,
  secondaryCta,
  hrefBase = "/news",
  sideLimit,
}: Props) {
  if (posts.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        Stories will appear here as they are published.
      </p>
    );
  }

  const sidePosts =
    sideLimit == null ? posts.slice(1) : posts.slice(1, 1 + sideLimit);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
      {posts[0] && (
        <Link
          href={`${hrefBase}/${posts[0].slug}`}
          className="group block overflow-hidden rounded-[2.5rem] bg-slate-50 shadow-2xl"
        >
          <div className="relative h-96 overflow-hidden">
            {posts[0].image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={posts[0].image}
                alt={posts[0].title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="h-full w-full bg-slate-200" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide"
                  style={{
                    backgroundColor: posts[0].customColor || "#F7A81B",
                    color: "#0B1426",
                  }}
                >
                  {posts[0].category}
                </span>
                {posts[0].tags?.slice(0, 2).map((t) => (
                  <span key={t} className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    #{t}
                  </span>
                ))}
              </div>
              <h3 className="mt-4 text-3xl font-bold tracking-tight text-white">
                {posts[0].title}
              </h3>
            </div>
          </div>
          <div className="p-8">
            <p className="text-lg leading-8 text-slate-700">{posts[0].excerpt}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-crimson">
              {featuredCta} <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </Link>
      )}
      {sidePosts.length > 0 && (
        <div className="grid gap-6">
          {sidePosts.map((post) => (
            <PostSecondaryCard
              key={post.slug}
              post={post}
              cta={secondaryCta}
              hrefBase={hrefBase}
            />
          ))}
        </div>
      )}
    </div>
  );
}
