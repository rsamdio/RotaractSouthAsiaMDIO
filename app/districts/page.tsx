import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { MemberDistrictDirectory } from "@/components/MemberDistrictDirectory";

export const metadata = {
  title: "Member Districts | RSAMDIO",
  description:
    "Browse Rotaract South Asia member countries and member districts — DRR details, clubs, members, coverage, and highlights.",
};

export default function DistrictsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="South Asia Overview"
          title="Member Districts"
          description="Every member district across South Asia — DRRs, membership, coverage, and club directories."
          crumbs={[{ label: "Member Districts" }]}
        />

        <section className="py-24 px-5 sm:px-6 lg:px-8 bg-white">
          <MemberDistrictDirectory />
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
