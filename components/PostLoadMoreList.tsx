"use client";

import { useState } from "react";
import type { Story } from "@/config/news";
import { PostGrid, PostSecondaryCard } from "@/components/PostGrid";
import { LoadMoreButton } from "@/components/LoadMoreButton";

const DEFAULT_PAGE_SIZE = 9;
/** Featured + this many in the side column; rest go to the overflow grid. */
const HERO_SIDE_LIMIT = 2;

type Props = {
  posts: Story[];
  featuredCta: string;
  secondaryCta: string;
  hrefBase?: string;
  pageSize?: number;
  itemLabel?: string;
};

export function PostLoadMoreList({
  posts,
  featuredCta,
  secondaryCta,
  hrefBase = "/news",
  pageSize = DEFAULT_PAGE_SIZE,
  itemLabel = "posts",
}: Props) {
  const [visibleCount, setVisibleCount] = useState(() =>
    Math.min(pageSize, posts.length),
  );

  if (posts.length === 0) {
    return (
      <PostGrid
        posts={posts}
        featuredCta={featuredCta}
        secondaryCta={secondaryCta}
        hrefBase={hrefBase}
      />
    );
  }

  const visible = posts.slice(0, visibleCount);
  const overflow = visible.slice(1 + HERO_SIDE_LIMIT);

  return (
    <div>
      <PostGrid
        posts={visible}
        featuredCta={featuredCta}
        secondaryCta={secondaryCta}
        hrefBase={hrefBase}
        sideLimit={HERO_SIDE_LIMIT}
      />

      {overflow.length > 0 && (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {overflow.map((post) => (
            <PostSecondaryCard
              key={post.slug}
              post={post}
              cta={secondaryCta}
              hrefBase={hrefBase}
            />
          ))}
        </div>
      )}

      {posts.length > pageSize && (
        <LoadMoreButton
          showing={visibleCount}
          total={posts.length}
          itemLabel={itemLabel}
          onLoadMore={() =>
            setVisibleCount((n) => Math.min(n + pageSize, posts.length))
          }
        />
      )}
    </div>
  );
}
