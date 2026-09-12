import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PillNav } from "@/components/PillNav";
import { PostGrid } from "@/components/PostGrid";
import {
  ChronicleCards,
  ChronicleSectionHeader,
} from "@/components/ChronicleCards";
import { JsonLd } from "@/components/JsonLd";
import { loadAnnouncements, loadChronicles, loadStories } from "@/sanity/lib/content";
import type { Metadata } from "next";
import {
  breadcrumbNode,
  buildPageMetadata,
  collectionPageNode,
  graph,
  organizationNode,
  webSiteNode,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: 'News & Updates',
  description:
    'Stories of impact from across South Asia, plus official updates and RSA Chronicles from Rotaract South Asia MDIO.',
  path: '/news',
});

export default async function NewsPage() {
  const [stories, announcements, chronicles] = await Promise.all([
    loadStories(),
    loadAnnouncements(),
    loadChronicles(),
  ]);
  const recentStories = [...stories]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);
  const recentAnnouncements = [...announcements]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);
  const recentChronicles = [...chronicles]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  const newsItems = [
    ...recentStories.map((s) => ({
      name: s.title,
      path: `/news/${s.slug}`,
      description: [s.date, s.category, s.excerpt].filter(Boolean).join(" · "),
    })),
    ...recentAnnouncements.map((a) => ({
      name: a.title,
      path: `/news/${a.slug}`,
      description: [a.date, a.category, a.excerpt].filter(Boolean).join(" · "),
    })),
  ];

  return (
    <>
      <JsonLd
        data={graph(
          organizationNode(),
          webSiteNode(),
          breadcrumbNode([{ name: "News & Updates", path: "/news" }]),
          collectionPageNode({
            name: "News & Updates",
            description:
              "Stories of impact from across South Asia, plus official updates and RSA Chronicles from Rotaract South Asia MDIO.",
            path: "/news",
            items: newsItems,
          })
        )}
      />
      <Navbar />
      <PillNav
        items={[
          { id: "stories", label: "Stories" },
          { id: "announcements", label: "Announcements" },
          { id: "chronicles", label: "RSA Chronicles" },
        ]}
      />
      <main id="main-content">
        <PageHero
          eyebrow="News & Updates"
          title="Stories, Announcements & Chronicles"
          description="Stories of service, impact, and leadership from across South Asia, plus official updates from the RSAMDIO Secretariat and RSA Chronicles."
          crumbs={[{ label: "News & Updates" }]}
        />

        <section id="stories" className="scroll-mt-24 bg-white px-5 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <ChronicleSectionHeader
              title="Stories"
              subtitle="Stories of impact from clubs and districts across South Asia."
              href="/stories"
              linkLabel="View all stories →"
            />
            <PostGrid
              posts={recentStories}
              featuredCta="Read Story"
              secondaryCta="Read Story"
            />
          </div>
        </section>

        <section id="announcements" className="scroll-mt-24 bg-slate-50 px-5 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <ChronicleSectionHeader
              title="Announcements"
              subtitle="Official updates and notices from the RSAMDIO Secretariat."
              href="/announcements"
              linkLabel="View all announcements →"
            />
            <PostGrid
              posts={recentAnnouncements}
              featuredCta="Read Announcement"
              secondaryCta="Read Announcement"
            />
          </div>
        </section>

        <section id="chronicles" className="scroll-mt-24 bg-white px-5 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <ChronicleSectionHeader
              title="RSA Chronicles"
              subtitle="RSA Chronicles, the official monthly newsletter of Rotaract South Asia MDIO."
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
