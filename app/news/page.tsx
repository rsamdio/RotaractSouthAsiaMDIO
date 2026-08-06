import Link from "next/link";
import { ArrowRight, Megaphone } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PillNav } from "@/components/PillNav";
import {
  ChronicleCards,
  ChronicleSectionHeader,
} from "@/components/ChronicleCards";
import { loadAnnouncements, loadChronicles, loadStories } from "@/sanity/lib/content";
import type { Story } from "@/config/news";

export const metadata = {
  title: "News & Stories | RSAMDIO",
  description:
    "Stories, announcements, and RSA Chronicles — the official newsletter of Rotaract South Asia MDIO.",
};

function PostGrid({
  posts,
  featuredCta,
  secondaryCta,
}: {
  posts: Story[];
  featuredCta: string;
  secondaryCta: string;
}) {
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
          href={`/news/${posts[0].slug}`}
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
                style={{ fontFamily: "General Sans, sans-serif" }}
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
            href={`/news/${post.slug}`}
            className="block rounded-[2rem] bg-slate-50 p-7 shadow-xl transition hover:-translate-y-1"
          >
            <span className="rounded-full bg-[#FCE8F1] px-3 py-1 text-xs font-bold text-[#D41B69]">
              {post.category}
            </span>
            <h3
              className="mt-5 text-xl font-bold tracking-tight text-[#0B1426]"
              style={{ fontFamily: "General Sans, sans-serif" }}
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

export default async function NewsPage() {
  const [stories, announcements, chronicles] = await Promise.all([
    loadStories(),
    loadAnnouncements(),
    loadChronicles(),
  ]);
  const recentChronicles = [...chronicles]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <PillNav
        items={[
          { id: "stories", label: "Stories" },
          { id: "announcements", label: "Announcements" },
          { id: "publications", label: "Publications" },
        ]}
      />
      <main id="main-content">
        <PageHero
          eyebrow="News & Stories"
          title="Stories & Announcements"
          description="Service and leadership stories from across South Asia — plus official updates and RSA Chronicles from the Secretariat."
          crumbs={[{ label: "News & Stories" }]}
        />

        <section id="stories" className="scroll-mt-24 bg-white px-5 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2
              className="mb-8 text-2xl font-bold text-[#0B1426]"
              style={{ fontFamily: "General Sans, sans-serif" }}
            >
              Stories
            </h2>
            <PostGrid posts={stories} featuredCta="Read Story" secondaryCta="Read Story" />
          </div>
        </section>

        <section id="announcements" className="scroll-mt-24 bg-slate-50 px-5 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-center gap-2">
              <Megaphone className="h-4 w-4 text-[#D41B69]" />
              <h2
                className="text-2xl font-bold text-[#0B1426]"
                style={{ fontFamily: "General Sans, sans-serif" }}
              >
                Announcements
              </h2>
            </div>
            <PostGrid
              posts={announcements}
              featuredCta="Read Announcement"
              secondaryCta="Read Announcement"
            />
          </div>
        </section>

        <section id="publications" className="scroll-mt-24 bg-white px-5 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <ChronicleSectionHeader
              title="Publications"
              subtitle="RSA Chronicles — the official monthly newsletter of Rotaract South Asia MDIO."
              href="/chronicles"
              linkLabel="View all editions →"
            />
            <ChronicleCards editions={recentChronicles} featuredFirst />
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
