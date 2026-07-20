import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { zoneList } from "@/config/districts";

export const metadata = {
  title: "Districts | RSAMDIO",
  description: "Explore the South Asia district directory organized by zones.",
};

export default function DistrictsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="South Asia Overview"
          title="District Directory"
          description="Explore our vibrant network of districts across South Asia, organized by Rotary Zones 4 to 8."
          crumbs={[{ label: "Districts" }]}
        />

      <section className="py-24 px-5 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-6xl grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {zoneList.map((zone) => (
            <Link
              key={zone.slug}
              href={`/districts/${zone.slug}`}
              className="group rounded-2xl border border-slate-100 bg-slate-50 p-6 hover:shadow-soft transition-all duration-300 hover:-translate-y-1 block"
            >
              {/* Country Flags Row */}
              <div className="flex items-center gap-1.5 mb-4">
                {zone.countries.map((country) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={country.flagCode}
                    src={`https://flagcdn.com/w80/${country.flagCode}.png`}
                    alt={`${country.name} flag`}
                    className="h-6 w-9 rounded object-contain bg-slate-100 shadow-sm border border-slate-200 shrink-0"
                  />
                ))}
              </div>
              <h3 className="font-bold text-[#0B1426] text-xl group-hover:text-[#D41B69] transition-colors leading-tight">
                {zone.zoneNumber}
              </h3>
              <p className="text-xs text-[#D41B69] font-bold uppercase tracking-wider mt-0.5">
                {zone.title}
              </p>
              <p className="text-sm text-slate-600 mt-3 line-clamp-2 min-h-[2.5rem]">
                {zone.desc}
              </p>
              <div className="mt-4 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                <span>{zone.districtsCount}</span>
                <span className="font-semibold text-slate-700">{zone.clubsCount}</span>
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#D41B69]">
                Explore Zone <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
