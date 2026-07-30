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

      {/* Centered copy */}
      <div className="relative z-[3] text-center px-6 pt-36 pb-32 pointer-events-none">
        <h1
          className="font-bold text-[#0B1426] leading-[1.0] tracking-[-0.03em] text-[clamp(52px,8.5vw,150px)]"
          style={{
            fontFamily: "General Sans, sans-serif",
          }}
        >
          We Are
          <br />
          <span className="text-[#D41B69]">Rotaract</span>
          <br />
          South Asia
        </h1>
      </div>

      {/* Cranberry thin line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#D41B69] z-[2]" />
    </section>
  );
}
