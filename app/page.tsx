import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutSnapshot } from "@/components/AboutSnapshot";
import { GlobalParticipation } from "@/components/GlobalParticipation";
import { FocusAreas } from "@/components/FocusAreas";
import { InitiativesShowcase } from "@/components/InitiativesShowcase";
import { ProgramsInitiatives } from "@/components/initiatives/ProgramsInitiatives";
import { LeadershipSnapshot } from "@/components/LeadershipSnapshot";
import { NewsUpdatesPreview } from "@/components/NewsUpdatesPreview";
import { UpcomingEventsPreview } from "@/components/UpcomingEventsPreview";
import { CTAStrip } from "@/components/CTAStrip";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PillNav } from "@/components/PillNav";

export default function Home() {
  return (
    <>
      <Navbar />
      <PillNav />
      <main id="main-content">
        <Hero />
        <AboutSnapshot />
        <GlobalParticipation />
        <FocusAreas />
        <InitiativesShowcase />
        <ProgramsInitiatives variant="home" />
        <LeadershipSnapshot />
        <NewsUpdatesPreview />
        <UpcomingEventsPreview />
        <CTAStrip />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
