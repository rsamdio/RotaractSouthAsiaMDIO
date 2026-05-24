"use client";
import { useState, useCallback } from "react";
import { countryData, type Country } from "@/config/countries";
import { Globe } from "lucide-react";

// Geographic coordinates on the 1024x1024 centered South Asia map outline
const countries = [
  { key: "afg", label: "Afghanistan", x: 210, y: 200, color: "#D41B69" },
  { key: "pak", label: "Pakistan",    x: 290, y: 330, color: "#D41B69" },
  { key: "ind", label: "India",       x: 480, y: 550, color: "#D41B69" },
  { key: "nep", label: "Nepal",       x: 610, y: 370, color: "#D41B69" },
  { key: "bhu", label: "Bhutan",      x: 705, y: 370, color: "#D41B69" },
  { key: "ban", label: "Bangladesh",  x: 710, y: 450, color: "#D41B69" },
  { key: "sri", label: "Sri Lanka",   x: 575, y: 830, color: "#D41B69" },
  { key: "mal", label: "Maldives",    x: 380, y: 900, color: "#D41B69" },
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

export function MapSection() {
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
    <div className="w-full flex flex-col items-center lg:items-end gap-5 shrink-0 min-w-0">
      {/* Map card */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-2xl w-full max-w-[480px]">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

        <div className="relative z-10 flex items-start justify-between mb-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#F7A81B]">
              Regional Coordination
            </p>
            <h3 className="mt-1 text-2xl font-bold tracking-tight text-white" style={{ fontFamily: "General Sans, sans-serif" }}>
              Regional Network Map
            </h3>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-[#F7A81B] shadow-inner backdrop-blur-md text-xl">
            🌐
          </div>
        </div>

        {/* SVG Map Container - Aspect ratio 1:1 */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-[#070F1E] border border-white/10" style={{ aspectRatio: "1 / 1" }}>
          <svg
            viewBox="0 0 1024 1024"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Background Gradient & Glow Filters */}
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

            {/* Recolored Geographic Map with 100% correct boundaries */}
            <image
              href="/img/south_asia_map_v3.png"
              x="0"
              y="0"
              width="1024"
              height="1024"
              opacity="0.85"
              style={{ mixBlendMode: "screen" }}
            />

            {/* Concentric Holographic Radar Rings */}
            <circle cx="512" cy="512" r="180" stroke="white" strokeOpacity={0.04} strokeWidth={1} fill="none" strokeDasharray="6 6" />
            <circle cx="512" cy="512" r="320" stroke="white" strokeOpacity={0.03} strokeWidth={1} fill="none" strokeDasharray="10 6" />
            <circle cx="512" cy="512" r="440" stroke="white" strokeOpacity={0.02} strokeWidth={1} fill="none" strokeDasharray="15 8" />

            {/* Coordinate Radial Grid lines */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const x2 = 512 + Math.cos(rad) * 480;
              const y2 = 512 + Math.sin(rad) * 480;
              return (
                <line
                  key={angle}
                  x1={512}
                  y1={512}
                  x2={x2}
                  y2={y2}
                  stroke="white"
                  strokeOpacity={0.015}
                  strokeWidth={0.8}
                />
              );
            })}

            {/* Network Connections */}
            {connections.map(({ from, to }) => {
              const nodeFrom = countries.find((c) => c.key === from)!;
              const nodeTo = countries.find((c) => c.key === to)!;
              const isActive = activeKey === from || activeKey === to;
              return (
                <g key={`${from}-${to}`}>
                  {/* Underlay glowing path */}
                  <line
                    x1={nodeFrom.x}
                    y1={nodeFrom.y}
                    x2={nodeTo.x}
                    y2={nodeTo.y}
                    stroke="#D41B69"
                    strokeWidth={isActive ? 3.5 : 1}
                    strokeOpacity={isActive ? 0.35 : 0.08}
                    style={{ transition: "all 0.3s ease" }}
                  />
                  {/* Main dashed connection line */}
                  <line
                    x1={nodeFrom.x}
                    y1={nodeFrom.y}
                    x2={nodeTo.x}
                    y2={nodeTo.y}
                    stroke={isActive ? "#D41B69" : "rgba(255, 255, 255, 0.25)"}
                    strokeWidth={isActive ? 2 : 1.2}
                    strokeDasharray={isActive ? "0" : "5 5"}
                    strokeOpacity={isActive ? 0.8 : 0.35}
                    style={{ transition: "all 0.3s ease" }}
                  />
                  {/* Flowing laser pulse */}
                  {isActive && (
                    <line
                      x1={nodeFrom.x}
                      y1={nodeFrom.y}
                      x2={nodeTo.x}
                      y2={nodeTo.y}
                      stroke="#FFFFFF"
                      strokeWidth={2.5}
                      strokeDasharray="25 150"
                      strokeOpacity={0.9}
                      style={{
                        animation: "laser-flow 2s linear infinite",
                      }}
                    />
                  )}
                </g>
              );
            })}

            {/* Country Nodes & Labels */}
            {countries.map((cap) => {
              const isActive = activeKey === cap.key;
              return (
                <g key={cap.key}>
                  {/* Pulse ring when active */}
                  {isActive && (
                    <circle
                      cx={cap.x} cy={cap.y}
                      r={30}
                      fill={cap.color}
                      fillOpacity={0.15}
                      style={{ animation: "pulse-svg 1.4s ease-out infinite" }}
                    />
                  )}
                  {/* Outer glow circle */}
                  <circle
                    cx={cap.x} cy={cap.y}
                    r={18}
                    fill={isActive ? cap.color : "transparent"}
                    fillOpacity={isActive ? 0.2 : 0}
                    stroke={cap.color}
                    strokeWidth={isActive ? 3 : 2}
                    strokeOpacity={isActive ? 0.85 : 0.4}
                    style={{ transition: "all 0.3s ease" }}
                  />
                  {/* Core dot */}
                  <circle
                    cx={cap.x} cy={cap.y}
                    r={8}
                    fill={cap.color}
                    fillOpacity={isActive ? 1 : 0.75}
                    filter={isActive ? "url(#glow)" : undefined}
                    style={{ transition: "all 0.3s ease" }}
                  />
                  {/* Dynamic Country Name Label */}
                  <text
                    x={cap.x}
                    y={cap.y - 18}
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
                      filter: isActive ? "drop-shadow(0 0 6px rgba(255, 255, 255, 0.6))" : undefined
                    }}
                  >
                    {cap.label.toUpperCase()}
                  </text>
                  {/* Invisible large hit area */}
                  <circle
                    cx={cap.x} cy={cap.y}
                    r={40}
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

          {/* CSS for SVG animations */}
          <style>{`
            @keyframes pulse-svg {
              0%   { r: 20; opacity: 0.5; }
              100% { r: 45; opacity: 0; }
            }
            @keyframes laser-flow {
              0%   { stroke-dashoffset: 175; }
              100% { stroke-dashoffset: 0; }
            }
          `}</style>
        </div>

        <p className="text-[10px] text-white/40 mt-3 text-center italic">
          *Hover or tap a country to display dynamic stats*
        </p>
      </div>

      {/* Stats panel */}
      <div
        className="w-full max-w-[480px] rounded-3xl border bg-white/10 p-5 shadow-2xl backdrop-blur-2xl transition-all duration-500"
        style={{
          borderColor: activeKey ? (countries.find(c => c.key === activeKey)?.color ?? "#D41B69") + "40" : "rgba(255,255,255,0.1)",
        }}
      >
        <div className="flex items-center gap-3">
          {active.code === "globe" ? (
            <div className="h-10 w-14 flex items-center justify-center bg-white/5 border border-white/10 rounded shadow-md shrink-0">
              <Globe className="h-6 w-6 text-[#F7A81B]" />
            </div>
          ) : (
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
    </div>
  );
}
