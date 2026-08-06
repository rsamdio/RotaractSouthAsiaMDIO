import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PillNav } from "@/components/PillNav";
import { InitiativesExplorer } from "@/components/initiatives/InitiativesExplorer";
import { ProgramsInitiatives } from "@/components/initiatives/ProgramsInitiatives";
import { loadPrograms } from "@/sanity/lib/content";

export const metadata = {
  title: "Initiatives",
  description:
    "RSAMDIO initiatives across South Asia: digital platforms for leaders, plus regional programs, campaigns, and fellowship that move Rotaractors into action.",
};

export default async function InitiativesPage() {
  const programs = await loadPrograms();

  return (
    <>
      <Navbar />
      <PillNav
        items={[
          { id: "ecosystem", label: "Digital Ecosystem" },
          { id: "programs", label: "Programs" },
        ]}
      />
      <main id="main-content">
        <PageHero
          eyebrow="Initiatives"
          title="Platforms, Programs & Campaigns"
          description="Two sides of the same mission: a digital ecosystem for boards and administrators, and regional programmes that bring Rotaractors together in service, sport, leadership, and fellowship."
          crumbs={[{ label: "Initiatives" }]}
        />

        <div id="ecosystem" className="scroll-mt-24">
          <div className="border-b border-slate-100 bg-white px-5 pt-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl text-center sm:text-left">
              <span className="inline-block rounded-full border border-[#D41B69]/20 bg-[#D41B69]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#D41B69]">
                Digital Ecosystem
              </span>
              <h2
                className="mt-4 text-2xl font-bold text-[#0B1426] sm:text-3xl"
                style={{ fontFamily: "General Sans, sans-serif" }}
              >
                Tools Built for Rotaract Leaders
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
                Live previews of Library, Invoice Calculator, NAVIGATE,
                Publications, Certify, and PULSE. Open any platform in a new tab
                when you are ready.
              </p>
            </div>
          </div>
          <InitiativesExplorer />
        </div>

        <ProgramsInitiatives variant="page" programs={programs} />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
