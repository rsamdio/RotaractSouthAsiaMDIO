import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { stories } from "@/config/news";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  if (!story) {
    return {
      title: "Story Not Found",
    };
  }
  return {
    title: `${story.title} | News & Media`,
    description: story.excerpt || `Read the latest Rotaract South Asia story: ${story.title}.`,
  };
}

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export default async function StoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  if (!story) notFound();

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow={story.category}
          title={story.title}
          description={story.excerpt}
          crumbs={[{ label: "News & Media", href: "/news" }, { label: story.title }]}
        />

      <section className="py-24 px-5 sm:px-6 lg:px-8 bg-white dark:bg-[#0B1426]">
        <div className="mx-auto max-w-3xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={story.image} alt={story.title} className="w-full rounded-[2rem] object-cover aspect-video shadow-xl mb-10" />
          <p className="text-lg leading-8 text-slate-750 font-serif">{story.body}</p>
        </div>
      </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
