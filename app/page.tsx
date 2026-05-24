import { Navbar } from "@/components/Navbar";
import { MapSection } from "@/components/MapSection";
import { AboutSection } from "@/components/AboutSection";
import { EcosystemTabs } from "@/components/EcosystemTabs";
import { EventsSection } from "@/components/EventsSection";
import { LeadershipCards } from "@/components/LeadershipCards";
import { GameBoard } from "@/components/GameBoard";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { BookOpen, Award, ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] overflow-hidden bg-[#0B1426] flex items-center">
        {/* Background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2200&q=90"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-15 select-none pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1426]/95 via-[#8A0F3E]/55 to-[#0B1426]/95" />

        {/* Ambient glows */}
        <div className="absolute left-10 top-24 h-96 w-96 rounded-full bg-[#D41B69]/30 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 h-[30rem] w-[30rem] rounded-full bg-[#F7A81B]/20 blur-[140px] pointer-events-none" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-28 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 pt-36">
          {/* Left */}
          <div className="max-w-3xl space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 shadow-xl backdrop-blur-xl">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F7A81B] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#F7A81B]" />
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-white">
                {siteConfig.fullName} · RY {siteConfig.rotaryYear}
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-5xl font-bold leading-[1.08] tracking-tight text-white drop-shadow-sm sm:text-6xl lg:text-[4.2rem]"
              style={{ fontFamily: "General Sans, sans-serif" }}
            >
              {siteConfig.tagline.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="bg-gradient-to-r from-[#F7A81B] via-[#FFE299] to-[#D41B69] bg-clip-text text-transparent">
                {siteConfig.tagline.split(" ").pop()}
              </span>
            </h1>

            <p className="text-lg leading-8 text-white/80 drop-shadow-sm max-w-xl mx-auto lg:mx-0">
              {siteConfig.description}
            </p>

            {/* Quick-link cards */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0 pt-4">
              <Link
                href="#ecosystem"
                className="group flex flex-col justify-between p-5 bg-white/5 border border-white/10 rounded-2xl text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#D41B69]/40 hover:shadow-glow-pink text-white"
              >
                <div>
                  <BookOpen className="h-6 w-6 text-[#D41B69] mb-3" />
                  <h4 className="font-bold text-white text-base">Resource Hub</h4>
                  <p className="text-xs text-white/60 mt-1">Access induction materials, brand graphics, and manuals.</p>
                </div>
                <span className="text-xs font-bold text-[#D41B69] mt-3 inline-flex items-center gap-1 group-hover:underline">
                  Explore Library <ExternalLink className="h-3 w-3" />
                </span>
              </Link>

              <Link
                href="#leadership-section"
                className="group flex flex-col justify-between p-5 bg-white/5 border border-white/10 rounded-2xl text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#F7A81B]/40 hover:shadow-glow-gold text-white"
              >
                <div>
                  <Award className="h-6 w-6 text-[#F7A81B] mb-3" />
                  <h4 className="font-bold text-white text-base">Meet the Board</h4>
                  <p className="text-xs text-white/60 mt-1">Meet the leaders coordinating South Asian operations.</p>
                </div>
                <span className="text-xs font-bold text-[#F7A81B] mt-3 inline-flex items-center gap-1 group-hover:underline">
                  View Directors <ExternalLink className="h-3 w-3" />
                </span>
              </Link>
            </div>
          </div>

          {/* Right — interactive map */}
          <MapSection />
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────── */}
      <section className="bg-[#0B1426] border-t border-white/5 py-12 px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {Object.entries(siteConfig.stats).map(([label, value]) => (
            <div key={label}>
              <div className="text-4xl font-bold text-white" style={{ fontFamily: "General Sans, sans-serif" }}>
                {value}
              </div>
              <div className="text-xs text-white/40 uppercase tracking-widest mt-1 font-semibold">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT / VISION / MISSION / GOVERNANCE / FOCUS ─────── */}
      <AboutSection />

      {/* ── EVENTS ───────────────────────────────────────────── */}
      <EventsSection />

      {/* ── ECOSYSTEM / LIBRARY ──────────────────────────────── */}
      <EcosystemTabs />

      {/* ── LEADERSHIP BOARD ─────────────────────────────────── */}
      <LeadershipCards />

      {/* ── WAITLIST / JOIN ──────────────────────────────────── */}
      <WaitlistForm />

      {/* ── 2048 GAME ────────────────────────────────────────── */}
      <GameBoard />

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <Footer />
      <ScrollToTop />
    </>
  );
}
