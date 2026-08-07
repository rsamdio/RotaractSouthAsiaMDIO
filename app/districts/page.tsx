import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { MemberDistrictDirectory } from "@/components/MemberDistrictDirectory";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: 'Member Districts',
  description:
    'Browse Rotaract South Asia member nations and member districts: DRR details, clubs, members, coverage, and highlights.',
  path: '/districts',
});

export default function DistrictsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="South Asia Overview"
          title="Member Districts"
          description="Every member district across South Asia: DRRs, membership, coverage, and club directories."
          crumbs={[{ label: "Member Districts" }]}
        />

        <section className="relative overflow-hidden border-t border-slate-100 bg-gradient-to-b from-white via-blush/20 to-ice-cream/40 px-5 py-24 sm:px-6 lg:px-8 lg:py-28">
          <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-crimson/5 blur-[100px]" />
          <div className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-navy-dark/5 blur-[100px]" />
          <div className="relative">
            <MemberDistrictDirectory />
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
