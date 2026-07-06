import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { countryList } from "@/config/districts";

export const metadata = {
  title: "Districts | RSAMDIO",
  description: "Explore the South Asia district directory across 8 member nations.",
};

export default function DistrictsPage() {
  return (
    <>
      <Navbar />
      <PageHero
        eyebrow="South Asia Overview"
        title="District Directory"
        description="Discover the vibrant network of 38+ Rotary districts across South Asia. Connect with local leaders and find clubs near you."
        crumbs={[{ label: "Districts" }]}
      />

      <section className="py-24 px-5 sm:px-6 lg:px-8 bg-white dark:bg-[#0B1426]">
        <div className="mx-auto max-w-6xl grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {countryList.map(([key, c]) => (
            <Link
              key={key}
              href={`/districts/${c.slug}`}
              className="group rounded-2xl border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-6 hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://flagcdn.com/w80/${c.code}.png`}
                alt={`${c.country} flag`}
                className="h-9 w-14 rounded object-cover shadow-md border border-slate-200 dark:border-white/10 mb-3"
              />
              <h3 className="font-bold text-[#0B1426] dark:text-white text-base group-hover:text-[#D41B69] transition-colors">
                {c.country}
              </h3>
              <p className="text-xs text-slate-500 dark:text-white/50 mt-2">{c.districts}</p>
              <p className="text-xs text-slate-400 dark:text-white/35 mt-0.5">{c.clubs}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#D41B69]">
                View Profile <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </>
  );
}
