import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ScatteredGallery } from "./ScatteredGallery";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100vh] overflow-hidden bg-[#0B1426] flex items-center scroll-mt-24"
    >
      {/* Ambient brand glows, behind the photo wall */}
      <div className="absolute -left-32 top-16 h-[28rem] w-[28rem] rounded-full bg-[#D41B69]/20 blur-[150px] pointer-events-none" />
      <div className="absolute -right-32 bottom-8 h-[30rem] w-[30rem] rounded-full bg-[#F7A81B]/15 blur-[150px] pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[24rem] w-[40rem] rounded-full bg-[#8A0F3E]/15 blur-[160px] pointer-events-none" />

      <ScatteredGallery />

      {/* Soft navy scrim so the headline stays legible over the photo wall */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_54%_48%_at_50%_52%,#0B1426_25%,rgba(11,20,38,0.8)_56%,transparent_80%)]" />

      <div className="relative z-20 mx-auto max-w-6xl px-5 pt-40 pb-32 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 shadow-xl backdrop-blur-xl mb-6">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F7A81B] opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#F7A81B]" />
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-white">
            {siteConfig.fullName} · RY {siteConfig.rotaryYear}
          </span>
        </div>

        {/* Giant confident statement */}
        <h1
          className="text-[15vw] sm:text-[10vw] lg:text-[6.5rem] font-bold leading-[0.95] tracking-tight text-white drop-shadow-sm"
          style={{ fontFamily: "General Sans, sans-serif" }}
        >
          We Are
          <br />
          <span className="bg-gradient-to-r from-[#F7A81B] via-[#FFE299] to-[#D41B69] bg-clip-text text-transparent">
            Rotaract South Asia
          </span>
        </h1>

        <p className="relative z-20 mt-8 text-lg sm:text-xl leading-8 text-white/80 max-w-xl mx-auto">
          {siteConfig.description}
        </p>

        {/* CTAs */}
        <div className="relative z-20 mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/about"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#F7A81B] px-8 py-4 text-base font-bold text-[#0B1426] shadow-xl shadow-[#F7A81B]/20 transition hover:-translate-y-1 hover:bg-[#FFC55A] hover:shadow-2xl hover:shadow-[#F7A81B]/30"
          >
            Explore RSAMDIO
            <ArrowUpRight className="h-5 w-5" />
          </Link>
          <Link
            href="/resources"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition hover:-translate-y-1 hover:border-white/50 hover:bg-white/10"
          >
            Access Resources
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
