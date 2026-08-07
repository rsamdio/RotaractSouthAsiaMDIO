import { HeroLanes } from "./HeroLanes";

// Hero — cool ice canvas, centered oversized statement with a flat cranberry
// accent line, scattered image lanes drifting vertically behind the copy,
// and a cranberry band closing the section. The floating bottom PillNav
// (rendered by the page) doubles as the reference's anchor subnav.
export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100vh] overflow-hidden bg-ice-cream flex items-center justify-center scroll-mt-24"
    >
      <HeroLanes />

      {/* Centered copy */}
      <div className="relative z-[3] text-center px-6 pt-36 pb-32 pointer-events-none">
        <h1 className="font-bold text-ink leading-[1.0] tracking-[-0.03em] text-[clamp(48px,12.5vw,64px)] md:text-[clamp(48px,8.5vw,150px)]">
          We Are
          <br />
          <span className="text-crimson">Rotaract</span>
          <br />
          South Asia
        </h1>
      </div>

      {/* Cranberry shelf — sits above drifting images so cards tuck behind it */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-crimson z-[2] pointer-events-none" />
    </section>
  );
}
