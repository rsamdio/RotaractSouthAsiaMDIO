"use client";
import { useState, useCallback } from "react";
import { countryData, type Country } from "@/config/districts";
import { Globe } from "lucide-react";
import { Reveal } from "./Reveal";

// Geographic coordinates on the 1024x1024 centered South Asia map outline
const countries = [
  { key: "afg", label: "Afghanistan", x: 175, y: 215, color: "#D41B69" },
  { key: "pak", label: "Pakistan",    x: 255, y: 360, color: "#D41B69" },
  { key: "ind", label: "India",       x: 430, y: 590, color: "#D41B69" },
  { key: "nep", label: "Nepal",       x: 565, y: 352, color: "#D41B69" },
  { key: "bhu", label: "Bhutan",      x: 685, y: 365, color: "#D41B69" },
  { key: "ban", label: "Bangladesh",  x: 722, y: 448, color: "#D41B69" },
  { key: "sri", label: "Sri Lanka",   x: 540, y: 843, color: "#D41B69" },
  { key: "mal", label: "Maldives",    x: 375, y: 920, color: "#D41B69" },
];

const connections = [
  { from: "ind", to: "pak" },
  { from: "ind", to: "nep" },
  { from: "ind", to: "bhu" },
  { from: "ind", to: "ban" },
  { from: "ind", to: "sri" },
  { from: "ind", to: "mal" },
  { from: "ind", to: "afg" },
  { from: "pak", to: "afg" },
  { from: "nep", to: "bhu" },
  { from: "ban", to: "bhu" },
  { from: "sri", to: "mal" },
];

export function GlobalParticipation() {
  const [active, setActive] = useState<Country>(countryData.default);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const handleEnter = useCallback((key: string) => {
    setActiveKey(key);
    setActive(countryData[key] ?? countryData.default);
  }, []);

  const handleLeave = useCallback(() => {
    setActiveKey(null);
    setActive(countryData.default);
  }, []);

  return (
    <section id="global" className="relative overflow-hidden bg-gradient-to-br from-[#0B1426] via-[#8A0F3E] to-[#D41B69] py-24 lg:py-32 px-5 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-[#F7A81B]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl text-center">
        <Reveal>
          <span className="inline-block rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.24em] text-[#F7A81B] mb-5">
            Global Participation
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight text-white"
            style={{ fontFamily: "General Sans, sans-serif" }}
          >
            8 Countries. One Leadership Network.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/75">
            Leaders across South Asia coming together to collaborate, learn, and lead with purpose.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:text-left">
          {/* Flag grid + mini stats */}
          <Reveal delay={0.1}>
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {countries.map((c) => {
                const data = countryData[c.key];
                return (
                  <button
                    key={c.key}
                    onMouseEnter={() => handleEnter(c.key)}
                    onMouseLeave={handleLeave}
                    onClick={() => handleEnter(c.key)}
                    className={`rounded-2xl border p-3.5 text-center shadow-lg backdrop-blur transition hover:-translate-y-1 cursor-pointer ${
                      activeKey === c.key ? "border-[#F7A81B]/60 bg-white/15" : "border-white/10 bg-white/5"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://flagcdn.com/w80/${data.code}.png`}
                      alt={`${c.label} flag`}
                      className="mx-auto h-8 w-12 rounded object-cover shadow-md border border-white/10"
                    />
                    <p className="mt-2 text-[11px] font-semibold text-white truncate">{c.label}</p>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 rounded-[2rem] border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
              <div>
                <div className="text-3xl font-bold tracking-tight text-[#F7A81B]" style={{ fontFamily: "General Sans, sans-serif" }}>8</div>
                <div className="mt-1.5 text-[10px] font-bold uppercase tracking-wide text-white/65">Countries</div>
              </div>
              <div>
                <div className="text-3xl font-bold tracking-tight text-[#F7A81B]" style={{ fontFamily: "General Sans, sans-serif" }}>5</div>
                <div className="mt-1.5 text-[10px] font-bold uppercase tracking-wide text-white/65">Zones</div>
              </div>
              <div>
                <div className="text-3xl font-bold tracking-tight text-[#F7A81B]" style={{ fontFamily: "General Sans, sans-serif" }}>1</div>
                <div className="mt-1.5 text-[10px] font-bold uppercase tracking-wide text-white/65">Unified Platform</div>
              </div>
            </div>
          </Reveal>

          {/* Interactive SVG regional map */}
          <Reveal delay={0.2} className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-2xl w-full max-w-md mx-auto lg:justify-self-center">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            <div className="relative z-10 w-full rounded-2xl overflow-hidden bg-[#070F1E] border border-white/10" style={{ aspectRatio: "1 / 1" }}>
              <svg viewBox="0 0 1024 1024" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <radialGradient id="mapBg" cx="50%" cy="50%" r="70%">
                    <stop offset="0%" stopColor="#102542" />
                    <stop offset="60%" stopColor="#0B1528" />
                    <stop offset="100%" stopColor="#050A14" />
                  </radialGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <rect width="1024" height="1024" fill="url(#mapBg)" />
                <image
                  href="/img/south_asia_map_v3.png"
                  x="0" y="0" width="1024" height="1024"
                  opacity="0.85"
                  style={{ mixBlendMode: "screen" }}
                />
                <circle cx="512" cy="512" r="180" stroke="white" strokeOpacity={0.04} strokeWidth={1} fill="none" strokeDasharray="6 6" />
                <circle cx="512" cy="512" r="320" stroke="white" strokeOpacity={0.03} strokeWidth={1} fill="none" strokeDasharray="10 6" />
                <circle cx="512" cy="512" r="440" stroke="white" strokeOpacity={0.02} strokeWidth={1} fill="none" strokeDasharray="15 8" />

                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
                  const rad = (angle * Math.PI) / 180;
                  const x2 = 512 + Math.cos(rad) * 480;
                  const y2 = 512 + Math.sin(rad) * 480;
                  return (
                    <line key={angle} x1={512} y1={512} x2={x2} y2={y2} stroke="white" strokeOpacity={0.015} strokeWidth={0.8} />
                  );
                })}

                {connections.map(({ from, to }) => {
                  const nodeFrom = countries.find((c) => c.key === from)!;
                  const nodeTo = countries.find((c) => c.key === to)!;
                  const isActive = activeKey === from || activeKey === to;
                  return (
                    <g key={`${from}-${to}`}>
                      <line
                        x1={nodeFrom.x} y1={nodeFrom.y} x2={nodeTo.x} y2={nodeTo.y}
                        stroke="#D41B69" strokeWidth={isActive ? 3.5 : 1} strokeOpacity={isActive ? 0.35 : 0.08}
                        style={{ transition: "all 0.3s ease" }}
                      />
                      <line
                        x1={nodeFrom.x} y1={nodeFrom.y} x2={nodeTo.x} y2={nodeTo.y}
                        stroke={isActive ? "#D41B69" : "rgba(255, 255, 255, 0.25)"}
                        strokeWidth={isActive ? 2 : 1.2}
                        strokeDasharray={isActive ? "0" : "5 5"}
                        strokeOpacity={isActive ? 0.8 : 0.35}
                        style={{ transition: "all 0.3s ease" }}
                      />
                      {isActive && (
                        <line
                          x1={nodeFrom.x} y1={nodeFrom.y} x2={nodeTo.x} y2={nodeTo.y}
                          stroke="#FFFFFF" strokeWidth={2.5} strokeDasharray="25 150" strokeOpacity={0.9}
                          style={{ animation: "laser-flow 2s linear infinite" }}
                        />
                      )}
                    </g>
                  );
                })}

                {countries.map((cap) => {
                  const isActive = activeKey === cap.key;
                  return (
                    <g key={cap.key}>
                      {isActive && (
                        <circle cx={cap.x} cy={cap.y} r={30} fill={cap.color} fillOpacity={0.15} style={{ animation: "pulse-svg 1.4s ease-out infinite" }} />
                      )}
                      <circle
                        cx={cap.x} cy={cap.y} r={18}
                        fill={isActive ? cap.color : "transparent"}
                        fillOpacity={isActive ? 0.2 : 0}
                        stroke={cap.color}
                        strokeWidth={isActive ? 3 : 2}
                        strokeOpacity={isActive ? 0.85 : 0.4}
                        style={{ transition: "all 0.3s ease" }}
                      />
                      <circle
                        cx={cap.x} cy={cap.y} r={8}
                        fill={cap.color}
                        fillOpacity={isActive ? 1 : 0.75}
                        filter={isActive ? "url(#glow)" : undefined}
                        style={{ transition: "all 0.3s ease" }}
                      />
                      <text
                        x={cap.x} y={cap.y - 18}
                        textAnchor="middle"
                        fill={isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.8)"}
                        fontSize="11px"
                        fontWeight={isActive ? "700" : "600"}
                        letterSpacing="0.09em"
                        className="select-none pointer-events-none"
                        style={{
                          transition: "all 0.3s ease",
                          fontFamily: "General Sans, sans-serif",
                          textShadow: "0 2px 4px rgba(0,0,0,0.95), 0 0 10px rgba(0,0,0,0.9)",
                          filter: isActive ? "drop-shadow(0 0 6px rgba(255, 255, 255, 0.6))" : undefined,
                        }}
                      >
                        {cap.label.toUpperCase()}
                      </text>
                      <circle
                        cx={cap.x} cy={cap.y} r={40}
                        fill="transparent"
                        className="cursor-pointer"
                        style={{ pointerEvents: "all" }}
                        onMouseEnter={() => handleEnter(cap.key)}
                        onMouseLeave={handleLeave}
                        onClick={() => handleEnter(cap.key)}
                      />
                    </g>
                  );
                })}
              </svg>
              <style>{`
                @keyframes pulse-svg { 0% { r: 20; opacity: 0.5; } 100% { r: 45; opacity: 0; } }
                @keyframes laser-flow { 0% { stroke-dashoffset: 175; } 100% { stroke-dashoffset: 0; } }
              `}</style>
            </div>

            {/* Active country panel */}
            <div className="relative z-10 mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                {active.code === "globe" ? (
                  <div className="h-10 w-14 flex items-center justify-center bg-white/5 border border-white/10 rounded shadow-md shrink-0">
                    <Globe className="h-6 w-6 text-[#F7A81B]" />
                  </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`https://flagcdn.com/w80/${active.code}.png`}
                    alt={active.country}
                    className="h-10 w-14 object-cover rounded shadow-md shrink-0 border border-white/10"
                  />
                )}
                <div>
                  <h4 className="font-bold text-white text-base leading-tight">{active.country}</h4>
                  <p className="text-xs text-white/60 mt-0.5">{active.capital}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4 border-t border-b border-white/5 py-3 text-xs">
                <div>
                  <span className="text-white/40 block mb-0.5">Presence</span>
                  <strong className="text-white font-semibold">{active.districts}</strong>
                </div>
                <div>
                  <span className="text-white/40 block mb-0.5">Establishments</span>
                  <strong className="text-white font-semibold">{active.clubs}</strong>
                </div>
              </div>
              <p className="text-xs text-white/70 mt-3 leading-relaxed">{active.desc}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
