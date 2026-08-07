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
    "RSAMDIO platforms that support information, communication, and learning, plus multidistrict programs and campaigns for Rotaract clubs across South Asia.",
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
          description="Platforms that help disseminate information, connect Rotaract clubs, and support leadership learning, alongside multidistrict programs and campaigns across South Asia."
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
              >
                Platforms for Rotaract clubs and leaders
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
                Live previews of Library, Invoice Calculator, NAVIGATE,
                Publications Hub, Certify, and PULSE. Open any platform in a new tab
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
