import { notFound } from "next/navigation";
import { Building2, Users, MapPin, Sparkles } from "lucide-react";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { DistrictClubsPanel } from "@/components/DistrictClubsPanel";
import {
  getDistrictClubs,
  getDrrProfile,
  getMemberDistrict,
  memberDistricts,
} from "@/config/memberDistricts";

type Props = {
  params: Promise<{ number: string }>;
};

export function generateStaticParams() {
  return memberDistricts.map((d) => ({ number: d.number }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { number } = await params;
  const district = getMemberDistrict(number);
  if (!district) {
    return { title: "District Not Found | RSAMDIO" };
  }
  return {
    title: `District ${district.number} | Member Districts`,
    description: `Rotaract South Asia member district ${district.number} — ${district.countriesLabel}. ${district.clubs} clubs, ${district.members} members.`,
  };
}

function DrrInitials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl bg-gradient-to-b from-[#E9EEF5] to-[#CFDAE9] flex items-center justify-center text-[#8A9DB4] text-2xl font-extrabold border border-slate-200 shrink-0">
      {initials}
    </div>
  );
}

export default async function MemberDistrictPage({ params }: Props) {
  const { number } = await params;
  const district = getMemberDistrict(number);
  if (!district) notFound();

  const clubs = getDistrictClubs(district.number);
  const drrProfile = getDrrProfile(district.number);
  const drrName = drrProfile?.name ?? "TBD";
  const drrHomeClub = drrProfile?.homeClub;
  const drrImage = drrProfile?.image;

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Member District"
          title={`District ${district.number}`}
          description={
            <div className="flex flex-wrap items-center gap-2.5">
              {district.countryCodes.map((code) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={code}
                  src={`https://flagcdn.com/w80/${code}.png`}
                  alt=""
                  className="h-5 w-8 rounded object-contain bg-white shadow-sm border border-slate-200"
                />
              ))}
              <span className="font-semibold text-slate-600">
                {district.countriesLabel}
              </span>
            </div>
          }
          crumbs={[
            { label: "Member Districts", href: "/districts" },
            { label: `District ${district.number}` },
          ]}
        />

        <section className="py-24 px-5 sm:px-6 lg:px-8 bg-white">
          <div className="mx-auto max-w-4xl space-y-12">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                <div className="h-10 w-10 rounded-xl bg-[#F7A81B]/10 text-[#F7A81B] flex items-center justify-center mb-3">
                  <Building2 className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Clubs
                </span>
                <p className="text-2xl font-bold text-[#0B1426] mt-1">{district.clubs}</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                <div className="h-10 w-10 rounded-xl bg-[#17458F]/10 text-[#17458F] flex items-center justify-center mb-3">
                  <Users className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Members
                </span>
                <p className="text-2xl font-bold text-[#0B1426] mt-1">{district.members}</p>
              </div>
            </div>

            {/* DRR with photo */}
            <div>
              <h2
                className="text-xl font-bold text-[#0B1426] mb-4"
                style={{ fontFamily: "General Sans, sans-serif" }}
              >
                District Rotaract Representative
              </h2>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5">
                {drrImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={drrImage}
                    alt={drrName}
                    className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl object-cover object-top border border-slate-200 shadow-sm shrink-0"
                  />
                ) : (
                  <DrrInitials name={drrName} />
                )}
                <div className="text-center sm:text-left min-w-0 flex flex-col justify-center">
                  <p className="text-lg font-bold text-[#0B1426] leading-snug">{drrName}</p>
                  {drrHomeClub && (
                    <p className="text-sm text-slate-500 mt-1.5 leading-snug">{drrHomeClub}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Coverage */}
            <div>
              <h2
                className="text-xl font-bold text-[#0B1426] mb-4 inline-flex items-center gap-2"
                style={{ fontFamily: "General Sans, sans-serif" }}
              >
                <MapPin className="h-5 w-5 text-[#D41B69]" />
                Area of Coverage
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {district.coverage?.trim()
                  ? district.coverage
                  : "Coverage details will be added soon."}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h2
                className="text-xl font-bold text-[#0B1426] mb-4 inline-flex items-center gap-2"
                style={{ fontFamily: "General Sans, sans-serif" }}
              >
                <Sparkles className="h-5 w-5 text-[#F7A81B]" />
                Highlights
              </h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {district.highlights?.trim()
                  ? district.highlights
                  : "Highlights will be added soon."}
              </p>
            </div>

            <DistrictClubsPanel clubs={clubs} />
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
