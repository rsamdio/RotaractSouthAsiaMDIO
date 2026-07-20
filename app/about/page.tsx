import Link from "next/link";
import { Target, Globe, Landmark, ArrowRight, Clock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PillNav } from "@/components/PillNav";
import { countryList } from "@/config/districts";

export const metadata = {
  title: "About RSAMDIO | Rotaract South Asia",
  description: "About RSAMDIO, our vision, mission, and governance structure.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <PillNav
        items={[
          { id: "overview", label: "Overview" },
          { id: "vision-mission", label: "Vision & Mission" },
        ]}
      />
      <main id="main-content">
        <PageHero
          eyebrow="Who We Are"
          title="About RSAMDIO"
          description="The Rotaract South Asia Multi-District Information Organization is the official sub-regional coordination body of Rotary International."
          crumbs={[{ label: "About" }]}
        />

      <section id="overview" className="py-24 bg-white dark:bg-[#0D1825] px-5 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-lg leading-relaxed text-slate-650 font-serif">
              The <strong className="text-[#0B1426] dark:text-white font-serif">Rotaract South Asia Multi-District Information Organization</strong>{" "}
              (RSAMDIO) is the official sub-regional coordination body of Rotary International, serving the South Asia region spanning Afghanistan, Pakistan, India, Nepal, Bhutan, Bangladesh, Sri Lanka, and the Maldives.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-slate-650 font-serif">
              Established to bridge the gap between RI global standards and district-level implementation, RSAMDIO operates as the primary knowledge-sharing and governance hub for over{" "}
              <strong className="text-[#0B1426] dark:text-white font-serif">3,500 Rotaract clubs</strong> and{" "}
              <strong className="text-[#0B1426] dark:text-white font-serif font-bold">120,000+ members</strong> across 38+ districts.
            </p>

            {/* Districts & Countries teaser */}
            <div className="mt-10 rounded-[2rem] border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-7">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-xl bg-[#D41B69]/10 dark:bg-[#D41B69]/15 flex items-center justify-center text-[#D41B69]">
                  <Globe className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-[#0B1426] dark:text-white text-lg">Districts & Countries</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-white/60 leading-relaxed mb-4">
                Explore the {countryList.length} member nations and district directory that make up the RSAMDIO network.
              </p>
              <Link
                href="/districts"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#D41B69] hover:text-[#8A0F3E] transition"
              >
                View District Directory <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* History & Legacy — coming soon */}
            <div className="mt-5 rounded-[2rem] border border-dashed border-slate-200 dark:border-white/15 p-7">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-500 dark:text-white/50">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-[#0B1426] dark:text-white text-lg">History & Legacy</h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-white/50 leading-relaxed">
                A full retrospective of RSAMDIO&apos;s founding and past Rotary Years is in development. Coming soon.
              </p>
            </div>
          </div>

          {/* Vision & Mission cards */}
          <div id="vision-mission" className="space-y-5">
            <div className="rounded-2xl border border-[#D41B69]/20 bg-[#D41B69]/5 dark:bg-[#D41B69]/10 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-xl bg-[#D41B69]/15 flex items-center justify-center text-[#D41B69]">
                  <Target className="h-4 w-4" />
                </div>
                <h3 className="font-bold text-[#0B1426] dark:text-white">Our Vision</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-white/65 leading-relaxed">
                A unified, empowered Rotaract South Asia where every club has access to world-class resources, strong governance, and a vibrant community of service-minded youth leaders.
              </p>
            </div>

            <div className="rounded-2xl border border-[#F7A81B]/20 bg-[#F7A81B]/5 dark:bg-[#F7A81B]/10 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-xl bg-[#F7A81B]/15 flex items-center justify-center text-[#F7A81B]">
                  <Globe className="h-4 w-4" />
                </div>
                <h3 className="font-bold text-[#0B1426] dark:text-white">Our Mission</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-white/65 leading-relaxed">
                To coordinate, support, and amplify district-level Rotaract efforts by providing standardized resources, leadership development, and cross-regional collaboration platforms.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 dark:border-white/10 bg-white dark:bg-white/5 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center">
                  <Landmark className="h-4 w-4 text-slate-600 dark:text-white/60" />
                </div>
                <h3 className="font-bold text-[#0B1426] dark:text-white">Governance</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-white/65 leading-relaxed">
                RSAMDIO is governed by an elected Executive Board including a President, Vice Chairperson, Secretary General, and Treasurer, operating under the oversight of Rotary International Zones 6A and 6B.
              </p>
              <Link
                href="/leadership"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#D41B69] hover:text-[#8A0F3E] transition"
              >
                Meet the Board <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
