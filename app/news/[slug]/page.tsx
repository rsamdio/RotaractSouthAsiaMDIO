import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PostAdjacentNav } from "@/components/PostAdjacentNav";
import { ShareBar } from "@/components/ShareBar";
import { MarkdownContent } from "@/components/MarkdownContent";
import { JsonLd } from "@/components/JsonLd";
import { getAdjacentFromList } from "@/lib/newsNav";
import {
  articleNode,
  breadcrumbNode,
  buildPageMetadata,
  graph,
  organizationNode,
  resolveSeo,
  webSiteNode,
} from "@/lib/seo";
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
  if (!resolved) {
    return { title: "Post Not Found", robots: { index: false, follow: false } };
  }
  const { post } = resolved;
  const seo = resolveSeo({
    title: post.title,
    description: post.excerpt,
    image: post.image,
    seo: post.seo,
  });
  return buildPageMetadata({
    title: seo.title,
    description: seo.description,
    path: `/news/${post.slug}`,
    image: seo.image,
    type: "article",
  });
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
      : { label: "Announcements", href: "/announcements" };
  const path = `/news/${post.slug}`;

  return (
    <>
      <JsonLd
        data={graph(
          organizationNode(),
          webSiteNode(),
          articleNode({
            title: post.title,
            description: post.excerpt,
            path,
            datePublished: post.date,
            image: post.seo?.ogImage || post.image,
            kind,
          }),
          breadcrumbNode([
            { name: "News & Updates", path: "/news" },
            { name: kindCrumb.label, path: kindCrumb.href },
            { name: post.title, path },
          ])
        )}
      />
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow={post.category}
          title={post.title}
          description={post.excerpt}
          crumbs={[
            { label: "News & Updates", href: "/news" },
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
              path={path}
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
