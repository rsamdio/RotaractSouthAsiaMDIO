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
import { loadAnnouncements, loadChronicles, loadStories } from "@/sanity/lib/content";

export const metadata = {
  title: "News & Updates",
  description:
    "Stories, announcements, and RSA Chronicles, the official newsletter of Rotaract South Asia MDIO.",
};

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
          eyebrow="News & Updates"
          title="Stories & Announcements"
          description="Service and leadership stories from across South Asia, plus official updates and RSA Chronicles from the Secretariat."
          crumbs={[{ label: "News & Updates" }]}
        />

        <section id="stories" className="scroll-mt-24 bg-white px-5 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <ChronicleSectionHeader
              title="Stories"
              subtitle="Field reports and leadership moments from clubs and districts."
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
              subtitle="Official updates and notices from the Secretariat."
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

        <section id="publications" className="scroll-mt-24 bg-white px-5 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <ChronicleSectionHeader
              title="Publications"
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
