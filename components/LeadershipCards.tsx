import { boardMembers } from "@/config/site";
import { Globe, Star } from "lucide-react";

const avatarColors = [
  { bg: "from-[#D41B69] to-[#8A0F3E]", ring: "ring-[#D41B69]/40" },
  { bg: "from-[#6C3FA0] to-[#3B1F6B]", ring: "ring-[#6C3FA0]/40" },
  { bg: "from-[#0D6EFD] to-[#1a3a6b]", ring: "ring-[#0D6EFD]/40" },
  { bg: "from-[#F7A81B] to-[#C87900]", ring: "ring-[#F7A81B]/40" },
];

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export function LeadershipCards() {
  return (
    <section
      id="leadership-section"
      className="relative py-24 px-5 sm:px-6 lg:px-8 bg-[#0B1426]"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-72 w-[600px] rounded-full bg-[#D41B69]/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#D41B69]/15 border border-[#D41B69]/25 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#D41B69] mb-5">
            <Star className="h-3 w-3" />
            Leadership
          </span>
          <h2
            className="text-4xl font-bold text-white"
            style={{ fontFamily: "General Sans, sans-serif" }}
          >
            Executive Board
          </h2>
          <p className="mt-3 text-white/55 max-w-xl mx-auto">
            Meet the leaders coordinating Rotaract South Asia&apos;s operations for Rotary Year {" "}
            <span className="text-[#F7A81B] font-semibold">2026–27</span>.
          </p>
        </div>

        {/* President spotlight */}
        {(() => {
          const pres = boardMembers.find((m) => m.role === "president");
          if (!pres) return null;
          return (
            <div className="mb-8 rounded-3xl border border-[#F7A81B]/25 bg-gradient-to-br from-[#F7A81B]/10 via-[#0B1426] to-[#D41B69]/10 p-7 flex flex-col sm:flex-row items-center gap-6 shadow-2xl hover:shadow-[#F7A81B]/20 transition-all duration-500 group">
              <div className={`relative flex-shrink-0 h-24 w-24 rounded-2xl bg-gradient-to-br ${avatarColors[0].bg} ring-4 ${avatarColors[0].ring} flex items-center justify-center text-white text-3xl font-bold shadow-xl`}>
                {getInitials(pres.name)}
                <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-[#F7A81B] flex items-center justify-center shadow-lg">
                  <Star className="h-3.5 w-3.5 text-[#0B1426]" fill="currentColor" />
                </span>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#F7A81B] mb-1">MDIO President · RY 2026–27</div>
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "General Sans, sans-serif" }}>
                  {pres.name}
                </h3>
                <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
                  <Globe className="h-3.5 w-3.5 text-white/40" />
                  <span className="text-sm text-white/55">{pres.district} · {pres.country}</span>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Board grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {boardMembers
            .filter((m) => m.role !== "president")
            .map((member, i) => {
              const colors = avatarColors[(i + 1) % avatarColors.length];
              return (
                <div
                  key={member.name}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#D41B69]/30 hover:shadow-glow-pink hover:bg-white/8"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`h-14 w-14 rounded-xl bg-gradient-to-br ${colors.bg} ring-2 ${colors.ring} flex items-center justify-center text-white text-lg font-bold flex-shrink-0 shadow-md`}
                    >
                      {getInitials(member.name)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm leading-tight">{member.name}</h4>
                      <p className="text-xs text-[#D41B69] font-semibold mt-0.5">{member.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-white/40">
                    <Globe className="h-3 w-3 flex-shrink-0" />
                    <span>{member.district} · {member.country}</span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
