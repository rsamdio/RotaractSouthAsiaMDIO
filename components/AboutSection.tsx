import { Target, Globe, Landmark, Sparkles } from "lucide-react";

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
    color: "#6C3FA0",
  },
  {
    icon: Sparkles,
    title: "Fellowship & Innovation",
    desc: "Creating cross-border fellowship exchanges, digital infrastructure, and signature events that foster lasting connections across nations.",
    color: "#0D6EFD",
  },
];

export function AboutSection() {
  return (
    <section
      id="about-section"
      className="relative py-24 px-5 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#0D1825]"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#D41B69]/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Two-column intro */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <span className="inline-block rounded-full bg-[#D41B69]/10 dark:bg-[#D41B69]/20 border border-[#D41B69]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#D41B69] mb-5">
              Who We Are
            </span>
            <h2
              className="text-4xl sm:text-5xl font-bold text-[#0B1426] dark:text-white leading-tight"
              style={{ fontFamily: "General Sans, sans-serif" }}
            >
              About{" "}
              <span className="bg-gradient-to-r from-[#D41B69] to-[#F7A81B] bg-clip-text text-transparent">
                RSAMDIO
              </span>
            </h2>
            <p className="mt-5 text-slate-600 dark:text-white/60 leading-relaxed">
              The <strong className="text-[#0B1426] dark:text-white">Rotaract South Asia Multi-District Information Organization</strong>{" "}
              (RSAMDIO) is the official sub-regional coordination body of Rotary International, serving the South Asia region spanning Afghanistan, Pakistan, India, Nepal, Bhutan, Bangladesh, Sri Lanka, and the Maldives.
            </p>
            <p className="mt-4 text-slate-600 dark:text-white/60 leading-relaxed">
              Established to bridge the gap between RI global standards and district-level implementation, RSAMDIO operates as the primary knowledge-sharing and governance hub for over{" "}
              <strong className="text-[#0B1426] dark:text-white">3,500 Rotaract clubs</strong> and{" "}
              <strong className="text-[#0B1426] dark:text-white">120,000+ members</strong> across 38+ districts.
            </p>
          </div>

          {/* Vision & Mission cards */}
          <div id="vision-mission" className="space-y-5">
            <div className="rounded-2xl border border-[#D41B69]/20 bg-[#D41B69]/5 dark:bg-[#D41B69]/10 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-xl bg-[#D41B69]/15 flex items-center justify-center text-[#D41B69]">
                  <Target className="h-4 w-4" />
                </div>
                <h3 className="font-bold text-[#0B1426] dark:text-white">Our Vision</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-white/65 leading-relaxed">
                A unified, empowered Rotaract South Asia where every club has access to world-class resources, strong governance, and a vibrant community of service-minded youth leaders.
              </p>
            </div>

            <div className="rounded-2xl border border-[#F7A81B]/20 bg-[#F7A81B]/5 dark:bg-[#F7A81B]/10 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-xl bg-[#F7A81B]/15 flex items-center justify-center text-[#F7A81B]">
                  <Globe className="h-4 w-4" />
                </div>
                <h3 className="font-bold text-[#0B1426] dark:text-white">Our Mission</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-white/65 leading-relaxed">
                To coordinate, support, and amplify district-level Rotaract efforts by providing standardized resources, leadership development, and cross-regional collaboration platforms.
              </p>
            </div>

            <div id="governance" className="rounded-2xl border border-white/10 dark:border-white/10 bg-white dark:bg-white/5 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center">
                  <Landmark className="h-4 w-4 text-slate-600 dark:text-white/60" />
                </div>
                <h3 className="font-bold text-[#0B1426] dark:text-white">Governance</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-white/65 leading-relaxed">
                RSAMDIO is governed by an elected Executive Board including a President, Vice Chairperson, Secretary General, and Treasurer, operating under the oversight of Rotary International Zones 6A and 6B.
              </p>
            </div>
          </div>
        </div>

        {/* Focus pillars */}
        <div>
          <div className="text-center mb-10">
            <span className="inline-block rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-slate-600 dark:text-white/50 mb-4">
              Focus Areas
            </span>
            <h3 className="text-2xl font-bold text-[#0B1426] dark:text-white" style={{ fontFamily: "General Sans, sans-serif" }}>
              What We Do
            </h3>
          </div>
          <div id="program-leadership" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((p, i) => {
              const ids = ["program-leadership", "program-service", "program-public-image", "program-fellowship"];
              return (
                <div
                  id={ids[i]}
                  key={p.title}
                  className="group rounded-2xl border border-slate-100 dark:border-white/10 bg-white dark:bg-white/5 p-6 hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
                  style={{ ["--accent" as string]: p.color }}
                >
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                    style={{ backgroundColor: p.color + "20", color: p.color }}
                  >
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-[#0B1426] dark:text-white text-sm mb-2">{p.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-white/50 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
