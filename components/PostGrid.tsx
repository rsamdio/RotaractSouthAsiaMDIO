import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Story } from "@/config/news";

type Props = {
  posts: Story[];
  featuredCta: string;
  secondaryCta: string;
  /** Base path for post links — default `/news` */
  hrefBase?: string;
};

export function PostGrid({
  posts,
  featuredCta,
  secondaryCta,
  hrefBase = "/news",
}: Props) {
  if (posts.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        No posts yet. Publish from{" "}
        <Link href="/admin" className="font-semibold text-[#D41B69] hover:underline">
          /admin
        </Link>
        .
      </p>
    );
  }

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
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1426]/80 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <span className="rounded-full bg-[#F7A81B] px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#0B1426]">
                {posts[0].category}
              </span>
              <h3
                className="mt-5 text-3xl font-bold tracking-tight text-white"
              >
                {posts[0].title}
              </h3>
            </div>
          </div>
          <div className="p-8">
            <p className="text-lg leading-8 text-slate-700">{posts[0].excerpt}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#D41B69]">
              {featuredCta} <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </Link>
      )}
      <div className="grid gap-6">
        {posts.slice(1).map((post) => (
          <Link
            key={post.slug}
            href={`${hrefBase}/${post.slug}`}
            className="block rounded-[2rem] bg-slate-50 p-7 shadow-xl transition hover:-translate-y-1"
          >
            <span className="rounded-full bg-[#FCE8F1] px-3 py-1 text-xs font-bold text-[#D41B69]">
              {post.category}
            </span>
            <h3
              className="mt-5 text-xl font-bold tracking-tight text-[#0B1426]"
            >
              {post.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{post.excerpt}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#D41B69]">
              {secondaryCta} <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
