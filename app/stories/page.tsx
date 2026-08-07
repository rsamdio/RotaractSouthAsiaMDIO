import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PostLoadMoreList } from "@/components/PostLoadMoreList";
import { loadStories } from "@/sanity/lib/content";

export const metadata = {
  title: "Stories",
  description:
    "Stories of impact from Rotaract clubs and districts across South Asia.",
};

export default async function StoriesPage() {
  const stories = [...(await loadStories())].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="From the Field"
          title="Stories"
          description="Stories of impact from clubs and districts across South Asia."
          crumbs={[
            { label: "News & Updates", href: "/news" },
            { label: "Stories" },
          ]}
        />

        <section className="bg-white px-5 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <p className="max-w-xl text-sm leading-6 text-slate-500">
                {stories.length === 0
                  ? "New stories will appear here as they are published."
                  : `${stories.length} stor${stories.length === 1 ? "y" : "ies"} from across the region.`}
              </p>
              <Link
                href="/announcements"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-crimson transition hover:underline"
              >
                Announcements
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <PostLoadMoreList
              posts={stories}
              featuredCta="Read Story"
              secondaryCta="Read Story"
              itemLabel="stories"
            />
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
