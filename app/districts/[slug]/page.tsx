import { notFound } from "next/navigation";
import { Globe, Building2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { countryList } from "@/config/districts";

export function generateStaticParams() {
  return countryList.map(([, c]) => ({ slug: c.slug }));
}

export default async function DistrictProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = countryList.find(([, c]) => c.slug === slug);
  if (!entry) notFound();
  const [, country] = entry;

  return (
    <>
      <Navbar />
      <PageHero
        eyebrow="District Profile"
        title={country.country}
        description={country.desc}
        crumbs={[{ label: "Districts", href: "/districts" }, { label: country.country }]}
      />

      <section className="py-24 px-5 sm:px-6 lg:px-8 bg-white dark:bg-[#0B1426]">
        <div className="mx-auto max-w-4xl">
          <div className="grid sm:grid-cols-2 gap-5 mb-12">
            <div className="rounded-2xl border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-6">
              <div className="h-10 w-10 rounded-xl bg-[#D41B69]/10 dark:bg-[#D41B69]/15 text-[#D41B69] flex items-center justify-center mb-3">
                <Globe className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-white/40">Presence</span>
              <p className="text-lg font-bold text-[#0B1426] dark:text-white mt-1">{country.districts}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-6">
              <div className="h-10 w-10 rounded-xl bg-[#F7A81B]/10 dark:bg-[#F7A81B]/15 text-[#F7A81B] flex items-center justify-center mb-3">
                <Building2 className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-white/40">Establishments</span>
              <p className="text-lg font-bold text-[#0B1426] dark:text-white mt-1">{country.clubs}</p>
            </div>
          </div>

          {country.districtList && country.districtList.length > 0 ? (
            <div>
              <h2 className="text-xl font-bold text-[#0B1426] dark:text-white mb-5" style={{ fontFamily: "General Sans, sans-serif" }}>
                Districts
              </h2>
              <div className="space-y-3">
                {country.districtList.map((d) => (
                  <div key={d.slug} className="flex items-center justify-between rounded-2xl border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-6 py-4">
                    <div>
                      <h4 className="font-bold text-[#0B1426] dark:text-white text-sm">District {d.number}</h4>
                      <p className="text-xs text-slate-400 dark:text-white/40 mt-0.5">DRR: {d.drr}</p>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D41B69] bg-[#D41B69]/10 px-3 py-1.5 rounded-full">
                      {d.clubs} Clubs
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500 dark:text-white/50">
              Detailed district-level data for {country.country} is being compiled by the Secretariat.
            </p>
          )}
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </>
  );
}
