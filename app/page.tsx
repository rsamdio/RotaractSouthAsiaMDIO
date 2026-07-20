import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutSnapshot } from "@/components/AboutSnapshot";
import { GlobalParticipation } from "@/components/GlobalParticipation";
import { FocusAreas } from "@/components/FocusAreas";
import { InitiativesShowcase } from "@/components/InitiativesShowcase";
import { LeadershipSnapshot } from "@/components/LeadershipSnapshot";
import { UpcomingEventsPreview } from "@/components/UpcomingEventsPreview";
import { StoriesGallery } from "@/components/StoriesGallery";
import { CTAStrip } from "@/components/CTAStrip";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PillNav } from "@/components/PillNav";
// Force layout rebuild to clear CSS font variables cache

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
        <LeadershipSnapshot />
        <UpcomingEventsPreview />
        <StoriesGallery />
        <CTAStrip />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
