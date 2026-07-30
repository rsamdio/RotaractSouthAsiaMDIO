import { notFound } from "next/navigation";
import { Globe, Building2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { zoneList } from "@/config/districts";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const zone = zoneList.find((z) => z.slug === slug);
  if (!zone) {
    return {
      title: "Zone Profile Not Found",
    };
  }
  return {
    title: `${zone.zoneNumber} Directory | Districts`,
    description: `Explore clubs, districts, and DRR representatives represented in ${zone.zoneNumber} (${zone.title}).`,
  };
}

export function generateStaticParams() {
  return zoneList.map((z) => ({ slug: z.slug }));
}

export default async function DistrictProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const zone = zoneList.find((z) => z.slug === slug);
  if (!zone) notFound();

  const hasNonMdio = zone.districts.some((d) => d.isNonMDIO);

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Zone Profile"
          title={zone.zoneNumber}
          description={zone.desc}
          crumbs={[{ label: "Districts", href: "/districts" }, { label: zone.zoneNumber }]}
        />

      <section className="py-24 px-5 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-4xl">
          {/* Stats boxes */}
          <div className="grid sm:grid-cols-2 gap-5 mb-12">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
              <div className="h-10 w-10 rounded-xl bg-[#D41B69]/10 text-[#D41B69] flex items-center justify-center mb-3">
                <Globe className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Coverage</span>
              <p className="text-lg font-bold text-[#0B1426] mt-1">{zone.districtsCount}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
              <div className="h-10 w-10 rounded-xl bg-[#F7A81B]/10 text-[#F7A81B] flex items-center justify-center mb-3">
                <Building2 className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Clubs Count</span>
              <p className="text-lg font-bold text-[#0B1426] mt-1">{zone.clubsCount}</p>
            </div>
          </div>

          {/* Countries Represented */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-[#0B1426] mb-5" style={{ fontFamily: "General Sans, sans-serif" }}>
              Countries Represented
            </h2>
            <div className="flex flex-wrap gap-4">
              {zone.countries.map((c) => (
                <div key={c.flagCode} className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://flagcdn.com/w80/${c.flagCode}.png`}
                    alt={`${c.name} flag`}
                    className="h-5 w-8 rounded object-contain bg-white shadow-sm border border-slate-200"
                  />
                  <span className="text-sm font-semibold text-[#0B1426]">{c.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Districts List */}
          <div>
            <h2 className="text-xl font-bold text-[#0B1426] mb-5" style={{ fontFamily: "General Sans, sans-serif" }}>
              District Directory
            </h2>
            <div className="space-y-3">
              {zone.districts.map((d) => (
                <div key={d.number} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4">
                  <div>
                    <h4 className="font-bold text-[#0B1426] text-sm">
                      District {d.number}
                      {d.isNonMDIO && <span className="text-[#D41B69] ml-0.5">*</span>}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      DRR: <span className="font-medium text-slate-600">{d.drr}</span> · {d.country}
                      {d.homeClub && <span className="text-slate-300 ml-1">· {d.homeClub}</span>}
                    </p>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D41B69] bg-[#D41B69]/10 px-3 py-1.5 rounded-full">
                    {d.clubs} Clubs
                  </span>
                </div>
              ))}
            </div>

            {hasNonMdio && (
              <p className="text-xs text-slate-400 mt-6 leading-relaxed italic border-t border-slate-100 pt-4">
                * District 2223 (Russia) is part of Rotary International Zone 8 but is not a member of the Rotaract South Asia MDIO.
              </p>
            )}
          </div>
        </div>
      </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
