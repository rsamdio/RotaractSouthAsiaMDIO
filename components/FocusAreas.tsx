import { Target, Globe, Landmark, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";

const pillars = [
  {
    icon: Globe,
    title: "Regional Coordination",
    desc: "Linking Rotary International zones with district-level Rotaract operations across eight South Asian nations.",
    color: "#D41B69",
  },
  {
    icon: Target,
    title: "Mission-Driven Service",
    desc: "Supporting coordinated service projects, leadership academies, and public image work at the sub-regional level.",
    color: "#F7A81B",
  },
  {
    icon: Landmark,
    title: "Standards & Governance",
    desc: "Publishing constitutional templates, bylaws, and operational standards that strengthen club foundations.",
    color: "#17458F",
  },
  {
    icon: Sparkles,
    title: "Fellowship & Innovation",
    desc: "Building cross-border fellowship, digital infrastructure, and signature events that keep Rotaractors connected.",
    color: "#17458F",
  },
];

export function FocusAreas() {
  return (
    <section className="relative py-24 px-5 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#0D1825]">
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="text-center mb-14 max-w-2xl mx-auto">
          <span className="inline-block rounded-full bg-[#D41B69]/10 dark:bg-[#D41B69]/20 border border-[#D41B69]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#D41B69] mb-4">
            How We Serve
          </span>
          <h2 className="text-4xl font-bold text-[#0B1426] dark:text-white">
            What We Do
          </h2>
          <p className="mt-4 text-slate-600 dark:text-white/60">
            RSAMDIO coordinates, supports, and amplifies Rotaract work across South Asia through clear priorities and shared tools.
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="group relative rounded-[2.5rem] border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-white/5 p-8 sm:p-12 shadow-sm hover:shadow-2xl hover:border-slate-300 transition-all duration-500 overflow-hidden backdrop-blur-sm h-full flex flex-col">
                <div
                  className="absolute -right-6 -top-6 w-56 h-56 opacity-[0.03] group-hover:scale-125 group-hover:-rotate-12 group-hover:opacity-[0.06] transition-all duration-700 pointer-events-none"
                  style={{ color: p.color }}
                >
                  <p.icon className="w-full h-full" strokeWidth={1} />
                </div>

                <div
                  className="h-16 w-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1 relative z-10"
                  style={{ backgroundColor: p.color, color: "#fff" }}
                >
                  <p.icon className="h-7 w-7" strokeWidth={2.5} />
                </div>

                <div className="relative z-10 flex-grow">
                  <h4 className="font-extrabold text-[#0B1426] dark:text-white text-2xl mb-4 tracking-tight group-hover:text-[#D41B69] transition-colors duration-300">
                    {p.title}
                  </h4>
                  <p className="text-base text-slate-600 dark:text-white/60 leading-relaxed font-medium">
                    {p.desc}
                  </p>
                </div>

                <div
                  className="absolute bottom-0 left-0 h-1.5 w-0 group-hover:w-full transition-all duration-700 ease-out"
                  style={{ backgroundColor: p.color }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
