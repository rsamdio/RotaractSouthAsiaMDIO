import { Target, Globe, Landmark, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";

const pillars = [
  {
    icon: Globe,
    title: "Regional Coordination",
    desc: "Serving as the primary liaison between Rotary International zones and district-level Rotaract operations across 8 South Asian nations.",
    color: "#D41B69",
  },
  {
    icon: Target,
    title: "Mission-Driven Service",
    desc: "Advancing RI's mission through coordinated service projects, leadership academies, and public image campaigns at the sub-regional level.",
    color: "#F7A81B",
  },
  {
    icon: Landmark,
    title: "Standards & Governance",
    desc: "Developing and distributing constitutional templates, bylaws, and operational standards that strengthen club foundations across the region.",
    color: "#7E22CE",
  },
  {
    icon: Sparkles,
    title: "Fellowship & Innovation",
    desc: "Creating cross-border fellowship exchanges, digital infrastructure, and signature events that foster lasting connections across nations.",
    color: "#17458F",
  },
];

export function FocusAreas() {
  return (
    <section className="relative py-24 px-5 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#0D1825]">
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="text-center mb-14 max-w-2xl mx-auto">
          <span className="inline-block rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-slate-600 dark:text-white/50 mb-4">
            Focus Areas
          </span>
          <h2 className="text-4xl font-bold text-[#0B1426] dark:text-white" style={{ fontFamily: "General Sans, sans-serif" }}>
            What We Do
          </h2>
          <p className="mt-4 text-slate-600 dark:text-white/60">
            Driving impact and collaboration across South Asia through focused initiatives and structured support.
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="group rounded-2xl border border-slate-100 dark:border-white/10 bg-white dark:bg-white/5 p-6 hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
                <div
                  className="h-11 w-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                  style={{ backgroundColor: p.color + "20", color: p.color }}
                >
                  <p.icon className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-[#0B1426] dark:text-white text-sm mb-2">{p.title}</h4>
                <p className="text-xs text-slate-500 dark:text-white/50 leading-relaxed">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
