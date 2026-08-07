import Link from "next/link";
import { Target, Globe, Landmark, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PillNav } from "@/components/PillNav";
import { memberDistrictSummary } from "@/config/memberDistricts";
import { organizationHistory } from "@/config/history";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "About",
  description:
    "About Rotaract South Asia MDIO: who we are, how we serve member districts, and our history as the regional MDIO for Rotaract.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <PillNav
        items={[
          { id: "overview", label: "Overview" },
          { id: "history", label: "History" },
          { id: "vision-mission", label: "Vision & Mission" },
        ]}
      />
      <main id="main-content">
        <PageHero
          eyebrow="Who We Are"
          title="About RSAMDIO"
          description="The Rotaract South Asia Multi-District Information Organization is Rotary International's recognized MDIO: a regional group of member districts formed to disseminate information and facilitate communication among Rotaract Clubs and Rotaractors across eight nations in South Asia."
          crumbs={[{ label: "About" }]}
        />

        <section id="overview" className="scroll-mt-24 bg-white px-5 py-24 sm:px-6 lg:px-8 dark:bg-[#0D1825]">
          <div className="mx-auto grid max-w-6xl items-start gap-16 lg:grid-cols-2">
            <div>
              <p className="font-serif text-lg leading-relaxed text-slate-600 dark:text-white/65">
                The{" "}
                <strong className="font-serif text-[#0B1426] dark:text-white">
                  Rotaract South Asia Multi-District Information Organization
                </strong>{" "}
                (RSAMDIO) serves Rotaract across Afghanistan, Bangladesh, Bhutan, India, the Maldives, Nepal, Pakistan, and Sri Lanka.
              </p>
              <p className="mt-5 font-serif text-lg leading-relaxed text-slate-600 dark:text-white/65">
                We disseminate information and facilitate communication among Rotaract clubs, and support leadership learning and multidistrict programs across the region. Today that presence includes{" "}
                <strong className="font-serif text-[#0B1426] dark:text-white">
                  {memberDistrictSummary.districts} districts
                </strong>
                ,{" "}
                <strong className="font-serif text-[#0B1426] dark:text-white">
                  {memberDistrictSummary.clubs} clubs
                </strong>
                , and{" "}
                <strong className="font-serif font-bold text-[#0B1426] dark:text-white">
                  {memberDistrictSummary.members} Rotaractors
                </strong>{" "}
                across {siteConfig.stats.countries} nations.
              </p>

              <div className="mt-10 rounded-[2rem] border border-slate-100 bg-slate-50 p-7 dark:border-white/10 dark:bg-white/5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D41B69]/10 text-[#D41B69] dark:bg-[#D41B69]/15">
                    <Globe className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0B1426] dark:text-white">
                    Member Districts
                  </h3>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-white/60">
                  {`Explore the ${siteConfig.stats.countries} member nations and districts that form RSAMDIO's regional presence.`}
                </p>
                <Link
                  href="/districts"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-crimson transition hover:text-crimson-hover"
                >
                  View Member Districts <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div id="vision-mission" className="scroll-mt-36 space-y-5">
              <div className="rounded-2xl border border-[#D41B69]/20 bg-[#D41B69]/5 p-6 dark:bg-[#D41B69]/10">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D41B69]/15 text-[#D41B69]">
                    <Target className="h-4 w-4" />
                  </div>
                  <h3 className="font-bold text-[#0B1426] dark:text-white">Our Vision</h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-white/65">
                  A Rotaract South Asia where every club and Rotaractor can find clear information, stay connected with peers, and take part in regional programs.
                </p>
              </div>

              <div className="rounded-2xl border border-[#F7A81B]/20 bg-[#F7A81B]/5 p-6 dark:bg-[#F7A81B]/10">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F7A81B]/15 text-[#F7A81B]">
                    <Globe className="h-4 w-4" />
                  </div>
                  <h3 className="font-bold text-[#0B1426] dark:text-white">Our Mission</h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-white/65">
                  To disseminate information and facilitate communication among Rotaract clubs across South Asia, and to provide leadership learning and organize multidistrict service projects and programs.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-6 dark:border-white/10 dark:bg-white/5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/10">
                    <Landmark className="h-4 w-4 text-slate-600 dark:text-white/60" />
                  </div>
                  <h3 className="font-bold text-[#0B1426] dark:text-white">How we are organized</h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-white/65">
                  RSAMDIO is led by an elected President, supported by an appointed Executive Board and committees for the term, and works with District Rotaract Representatives.
                </p>
                <Link
                  href="/leadership"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-crimson transition hover:text-crimson-hover"
                >
                  Meet the Board <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="history" className="scroll-mt-24 border-t border-slate-100 bg-slate-50 px-5 py-24 sm:px-6 lg:px-8 dark:border-white/10 dark:bg-[#0B1426]">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 max-w-2xl">
              <span className="mb-4 inline-block rounded-full border border-[#D41B69]/20 bg-[#D41B69]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#D41B69]">
                Our History
              </span>
              <h2
                className="text-3xl font-bold text-[#0B1426] dark:text-white sm:text-4xl"
              >
                From first recorded leadership to today
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-white/65">
                A concise organizational timeline drawn from RSAMDIO&apos;s presidential record and the platforms now serving the region. Full presidential chronology lives in the College of Presidents.
              </p>
            </div>

            <ol className="relative space-y-0 border-l border-slate-200 pl-8 dark:border-white/15">
              {organizationHistory.map((item) => (
                <li key={item.period} className="relative pb-10 last:pb-0">
                  <span className="absolute -left-[2.4rem] top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#D41B69] bg-white dark:bg-[#0B1426]">
                    <span className="h-2 w-2 rounded-full bg-[#D41B69]" />
                  </span>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D41B69]">
                    {item.period}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-[#0B1426] dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-white/65">
                    {item.summary}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-10">
              <Link
                href="/presidents"
                className="inline-flex items-center gap-2 text-sm font-semibold text-crimson transition hover:text-crimson-hover"
              >
                View College of Presidents <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
