import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PostLoadMoreList } from "@/components/PostLoadMoreList";
import { loadAnnouncements } from "@/sanity/lib/content";

export const metadata = {
  title: "Announcements",
  description:
    "Official announcements and updates from the Rotaract South Asia MDIO Secretariat.",
};

export default async function AnnouncementsPage() {
  const announcements = [...(await loadAnnouncements())].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Secretariat"
          title="Announcements"
          description="Official updates, appointments, and program notices from Rotaract South Asia MDIO."
          crumbs={[
            { label: "News & Updates", href: "/news" },
            { label: "Announcements" },
          ]}
        />

        <section className="bg-white px-5 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <p className="max-w-xl text-sm leading-6 text-slate-500">
                {announcements.length === 0
                  ? "New announcements will appear here as they are published."
                  : `${announcements.length} announcement${announcements.length === 1 ? "" : "s"} from the Secretariat.`}
              </p>
              <Link
                href="/stories"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-crimson transition hover:underline"
              >
                Stories
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <PostLoadMoreList
              posts={announcements}
              featuredCta="Read Announcement"
              secondaryCta="Read Announcement"
              itemLabel="announcements"
            />
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
