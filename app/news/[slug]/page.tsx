import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PostAdjacentNav } from "@/components/PostAdjacentNav";
import { ShareBar } from "@/components/ShareBar";
import { MarkdownContent } from "@/components/MarkdownContent";
import { getAdjacentFromList } from "@/lib/newsNav";
import {
  loadAnnouncements,
  loadNewsPost,
  loadStories,
} from "@/sanity/lib/content";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resolved = await loadNewsPost(slug);
  if (!resolved) return { title: "Post Not Found" };
  return {
    title: `${resolved.post.title} | News & Stories`,
    description: resolved.post.excerpt,
  };
}

export async function generateStaticParams() {
  const [stories, announcements] = await Promise.all([
    loadStories(),
    loadAnnouncements(),
  ]);
  return [...stories, ...announcements].map((p) => ({ slug: p.slug }));
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const resolved = await loadNewsPost(slug);
  if (!resolved) notFound();

  const { kind, post } = resolved;
  const stream =
    kind === "story" ? await loadStories() : await loadAnnouncements();
  const adjacent = getAdjacentFromList(stream, slug, kind);
  const kindCrumb =
    kind === "story"
      ? { label: "Stories", href: "/stories" }
      : { label: "Announcements", href: "/news#announcements" };

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow={post.category}
          title={post.title}
          description={post.excerpt}
          crumbs={[
            { label: "News & Stories", href: "/news" },
            kindCrumb,
            { label: post.title },
          ]}
        />

        <section className="bg-white px-5 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {post.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.image}
                alt={post.title}
                className="mb-10 aspect-video w-full rounded-[2rem] object-cover shadow-xl"
              />
            ) : null}
            <MarkdownContent source={post.body} className="text-lg" />
            <ShareBar
              path={`/news/${post.slug}`}
              title={post.title}
              tag={post.category}
            />
            {adjacent && (
              <PostAdjacentNav
                kind={adjacent.kind}
                newer={adjacent.newer}
                older={adjacent.older}
                indexLabel={adjacent.indexLabel}
              />
            )}
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
