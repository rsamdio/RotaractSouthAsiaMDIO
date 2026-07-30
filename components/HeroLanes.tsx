import { heroImages } from "@/config/heroGallery";

// Scattered drifting image lanes (hero background layer).
// Five vertical lanes positioned across the hero; each lane's track drifts
// continuously (some reversed) and holds two copies of its card set so the
// -50% keyframe loop is seamless. Large gaps between cards create the
// scattered look. Images come from config/heroGallery.ts — swap in district
// photos there without touching this file.
type Card = { aspect: "sq" | "land" | "port" };

type Lane = {
  side: "left" | "right";
  offset: string; // distance from that side
  width: string; // responsive width classes
  duration: number; // seconds per loop
  phase: number; // fraction of the loop to start into (negative delay) — de-syncs lanes from first paint
  reverse?: boolean;
  gap: string; // vertical space between cards
  hide?: string; // responsive visibility classes
  cards: Card[];
  zClass: string;
};

const lanes: Lane[] = [
  {
    side: "left", offset: "4%", width: "w-[180px]", duration: 95, phase: 0.12, gap: "55vh",
    hide: "hidden sm:block", zClass: "z-[1]",
    cards: [{ aspect: "sq" }, { aspect: "sq" }, { aspect: "port" }],
  },
  {
    side: "left", offset: "13%", width: "w-[190px] lg:w-[330px]", duration: 110, phase: 0.42, reverse: true, gap: "48vh",
    zClass: "z-[10]",
    cards: [{ aspect: "land" }, { aspect: "port" }, { aspect: "land" }],
  },
  {
    side: "left", offset: "36%", width: "w-[200px]", duration: 100, phase: 0.68, gap: "55vh",
    hide: "hidden lg:block", zClass: "z-[1]",
    cards: [{ aspect: "sq" }, { aspect: "port" }, { aspect: "sq" }],
  },
  {
    side: "right", offset: "12%", width: "w-[210px] lg:w-[440px]", duration: 120, phase: 0.25, reverse: true, gap: "52vh",
    zClass: "z-[10]",
    cards: [{ aspect: "land" }, { aspect: "land" }, { aspect: "port" }],
  },
  {
    side: "right", offset: "1%", width: "w-[220px]", duration: 105, phase: 0.55, gap: "55vh",
    hide: "hidden sm:block", zClass: "z-[1]",
    cards: [{ aspect: "sq" }, { aspect: "port" }, { aspect: "sq" }],
  },
];

const aspectClass: Record<Card["aspect"], string> = {
  sq: "aspect-square",
  land: "aspect-[4/3]",
  port: "aspect-[4/5]",
};

export function HeroLanes() {
  let imageIndex = 0;
  return (
    <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
      {lanes.map((lane, li) => {
        // Assign images sequentially across lanes, cycling the gallery.
        const laneImages = lane.cards.map(() => heroImages[imageIndex++ % heroImages.length]);
        return (
          <div
            key={li}
            className={`absolute overflow-hidden ${lane.width} ${lane.hide ?? ""} ${lane.zClass}`}
            style={{
              top: "-15vh",
              height: "130vh",
              [lane.side]: lane.offset,
            }}
          >
            <div
              className="hero-lane-track flex flex-col"
              style={{
                animation: `${lane.reverse ? "drift-rev" : "drift"} ${lane.duration}s linear infinite`,
                animationDelay: `-${Math.round(lane.duration * lane.phase)}s`,
              }}
            >
              {[0, 1].map((copy) =>
                lane.cards.map((card, ci) => (
                  <div
                    key={`${copy}-${ci}`}
                    className={`overflow-hidden rounded-2xl bg-[#E4E0D2] ${aspectClass[card.aspect]}`}
                    style={{ marginBottom: lane.gap }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={laneImages[ci]}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
