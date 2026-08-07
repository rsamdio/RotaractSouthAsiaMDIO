import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { DistrictClubsPanel } from "@/components/DistrictClubsPanel";
import { FlagTile } from "@/components/districts/FlagTile";
import { PresenceStatStrip } from "@/components/districts/PresenceStatStrip";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbNode,
  buildPageMetadata,
  graph,
  organizationNode,
  webSiteNode,
} from "@/lib/seo";
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
    return { title: "District Not Found", robots: { index: false, follow: false } };
  }
  return buildPageMetadata({
    title: `District ${district.number}`,
    description: `Rotaract South Asia member district ${district.number}: ${district.countriesLabel}. ${district.clubs} clubs, ${district.members} members.`,
    path: `/districts/${district.number}`,
  });
}

function DrrSilhouette({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-[#E9EEF5] via-[#DEE5F0] to-[#CFDAE9] sm:h-32 sm:w-32">
      <svg
        className="absolute inset-x-0 bottom-0 mx-auto h-[75%] w-[75%] translate-y-1 text-[#8A9DB4] drop-shadow-sm"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
      {name !== "TBD" ? (
        <div className="absolute right-2 top-2 rounded-full border border-white/20 bg-[#0B1426]/70 px-2 py-0.5 text-[11px] font-extrabold text-white shadow-sm backdrop-blur-md">
          {initials}
        </div>
      ) : null}
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
  const isTbd = !drrProfile;

  const districtStats = [
    { key: "clubs", label: "Clubs", value: district.clubs },
    { key: "members", label: "Members", value: district.members },
  ];

  return (
    <>
      <JsonLd
        data={graph(
          organizationNode(),
          webSiteNode(),
          breadcrumbNode([
            { name: "Member Districts", path: "/districts" },
            {
              name: `District ${district.number}`,
              path: `/districts/${district.number}`,
            },
          ])
        )}
      />
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Member District"
          title={`District ${district.number}`}
          description={
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-3.5">
              <div className="flex items-center gap-2">
                {district.countryCodes.map((code) => (
                  <FlagTile key={code} code={code} size="sm" />
                ))}
              </div>
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

        <section className="relative overflow-hidden border-t border-slate-100 bg-gradient-to-b from-white via-blush/20 to-ice-cream/40 px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-crimson/5 blur-[100px]" />
          <div className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-navy-dark/5 blur-[100px]" />

          <div className="relative mx-auto max-w-5xl space-y-10 sm:space-y-12">
            <Link
              href="/districts"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-crimson"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Member Districts
            </Link>

            {/* Identity + stats */}
            <div className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/80 p-6 shadow-soft backdrop-blur-sm sm:rounded-[2rem] sm:p-8">
              <div className="mb-8 flex flex-col items-start gap-4 sm:mb-10 sm:flex-row sm:items-center sm:gap-5">
                <div className="flex items-center gap-2.5">
                  {district.countryCodes.map((code) => (
                    <FlagTile key={code} code={code} size="lg" />
                  ))}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-crimson sm:text-[11px]">
                    Coverage nations
                  </p>
                  <p className="mt-1 text-lg font-bold text-ink sm:text-xl">
                    {district.countriesLabel}
                  </p>
                </div>
              </div>
              <PresenceStatStrip stats={districtStats} />
            </div>

            {/* DRR */}
            <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-sm sm:rounded-[2rem] sm:p-8">
              <span className="mb-5 inline-block rounded-full border border-crimson/20 bg-crimson/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-crimson">
                District Rotaract Representative
              </span>
              {isTbd ? (
                <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
                  <DrrSilhouette name="TBD" />
                  <div className="text-center sm:text-left">
                    <p className="text-xl font-bold text-ink sm:text-2xl">TBD</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                      District Rotaract Representative details will be announced soon.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
                  {drrImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={drrImage}
                      alt={drrName}
                      className="h-28 w-28 shrink-0 rounded-2xl border border-slate-200 object-cover object-top shadow-sm sm:h-32 sm:w-32"
                    />
                  ) : (
                    <DrrSilhouette name={drrName} />
                  )}
                  <div className="min-w-0 text-center sm:text-left">
                    <p className="text-xl font-bold leading-snug text-ink sm:text-2xl">
                      {drrName}
                    </p>
                    {drrHomeClub ? (
                      <p className="mt-1.5 text-sm leading-snug text-slate-500">
                        {drrHomeClub}
                      </p>
                    ) : null}
                  </div>
                </div>
              )}
            </div>

            {/* Coverage */}
            <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-sm sm:rounded-[2rem] sm:p-8">
              <span className="mb-4 inline-block rounded-full border border-crimson/20 bg-crimson/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-crimson">
                Area of Coverage
              </span>
              <p className="text-base leading-relaxed text-slate-600 sm:text-[1.05rem] sm:leading-8">
                {district.coverage?.trim()
                  ? district.coverage
                  : "Coverage details will be added soon."}
              </p>
            </div>

            {/* Highlights */}
            <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-sm sm:rounded-[2rem] sm:p-8">
              <span className="mb-4 inline-block rounded-full border border-[#F7A81B]/30 bg-[#F7A81B]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#C87900]">
                Highlights
              </span>
              <p className="whitespace-pre-line text-base leading-relaxed text-slate-600 sm:text-[1.05rem] sm:leading-8">
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
