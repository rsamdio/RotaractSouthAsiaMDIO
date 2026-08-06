import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ChronicleCards } from "@/components/ChronicleCards";
import { loadChronicles } from "@/sanity/lib/content";

export const metadata = {
  title: "RSA Chronicles | RSAMDIO",
  description:
    "RSA Chronicles — the official monthly newsletter of Rotaract South Asia MDIO. Preview editions and open the full reader.",
};

export default async function ChroniclesPage() {
  const editions = [...(await loadChronicles())].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Publications"
          title="RSA Chronicles"
          description="The official monthly newsletter of Rotaract South Asia MDIO — regional updates, district highlights, and programmes worth knowing."
          crumbs={[
            { label: "News & Stories", href: "/news" },
            { label: "RSA Chronicles" },
          ]}
        />

        <section className="bg-white px-5 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <ChronicleCards editions={editions} featuredFirst />
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
