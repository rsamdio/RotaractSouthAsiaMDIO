import { siteConfig } from "@/config/site";
import { HeroLanes } from "./HeroLanes";

// Hero — cream canvas, centered oversized statement with a flat cranberry
// accent line, scattered image lanes drifting vertically behind the copy,
// and a cranberry band closing the section. The floating bottom PillNav
// (rendered by the page) doubles as the reference's anchor subnav.
export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100vh] overflow-hidden bg-[#FBF6EC] flex items-center justify-center scroll-mt-24"
    >
      <HeroLanes />

      {/* Cream radial scrim: invisible against the canvas, but fades drifting
          cards as they pass beneath the copy so the text stays readable */}
      <div className="absolute inset-0 z-[2] pointer-events-none bg-[radial-gradient(ellipse_48%_44%_at_50%_47%,#FBF6EC_40%,rgba(251,246,236,0.88)_63%,transparent_82%)]" />

      {/* Centered copy */}
      <div className="relative z-[3] text-center px-6 pt-36 pb-32 pointer-events-none">
        <h1
          className="font-bold text-[#0B1426] leading-[1.0] tracking-[-0.03em] text-[clamp(52px,8.5vw,150px)]"
          style={{
            fontFamily: "General Sans, sans-serif",
            textShadow: "0 2px 18px rgba(251,246,236,0.95), 0 0 42px rgba(251,246,236,0.9), 0 0 80px rgba(251,246,236,0.8)",
          }}
        >
          We Are
          <br />
          <span className="text-[#D41B69]">Rotaract South Asia</span>
        </h1>
        <p
          className="mx-auto mt-10 sm:mt-14 max-w-md text-[clamp(17px,1.6vw,22px)] leading-normal font-medium text-[#0B1426]"
          style={{ textShadow: "0 1px 10px rgba(251,246,236,0.95), 0 0 24px rgba(251,246,236,0.95), 0 0 48px rgba(251,246,236,0.9)" }}
        >
          {siteConfig.description}
        </p>
        <p
          className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-[#0B1426]/60"
          style={{ textShadow: "0 1px 8px rgba(251,246,236,0.95), 0 0 20px rgba(251,246,236,0.95)" }}
        >
          {siteConfig.fullName} · RY {siteConfig.rotaryYear}
        </p>
      </div>

      {/* Cranberry band */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#D41B69] rounded-t-[36px] z-[2]" />
    </section>
  );
}
