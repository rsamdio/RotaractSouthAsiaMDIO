"use client";

import { useState } from "react";
import { CheckCircle2, ExternalLink } from "lucide-react";
import {
  platformTools,
  type PlatformKey,
} from "@/config/platformTools";
import { BrowserChrome } from "@/components/initiatives/LiveSitePreview";
import { useScrollActiveTabIntoView } from "@/lib/useScrollActiveTabIntoView";

export function InitiativesExplorer() {
  const [activeKey, setActiveKey] = useState<PlatformKey>("library");
  const active = platformTools.find((t) => t.key === activeKey) ?? platformTools[0];
  const Icon = active.icon;
  const { scrollerRef, setTabRef } = useScrollActiveTabIntoView(activeKey);

  return (
    <section className="relative bg-gradient-to-b from-white via-[#FCE8F1]/25 to-slate-50 px-3 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="pointer-events-none absolute left-10 top-10 h-72 w-72 rounded-full bg-[#D41B69]/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-96 w-96 rounded-full bg-[#17458F]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-8 sticky top-20 z-30 -mx-1 px-1 sm:mb-10">
          <div
            ref={scrollerRef}
            className="flex gap-2 overflow-x-auto rounded-full border border-slate-200/60 bg-white/95 p-1.5 shadow-md backdrop-blur-xl [&::-webkit-scrollbar]:hidden"
          >
            {platformTools.map((tool) => (
              <button
                key={tool.key}
                ref={setTabRef(tool.key)}
                type="button"
                onClick={() => setActiveKey(tool.key)}
                className={`shrink-0 cursor-pointer whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-bold transition-all sm:flex-1 sm:px-5 sm:text-sm ${
                  activeKey === tool.key
                    ? "bg-[#D41B69] text-white shadow-md shadow-[#D41B69]/20"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {tool.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          <div className="relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-[#D41B69]/20 bg-white p-6 shadow-soft sm:rounded-[2.5rem] sm:p-9">
            <div className="pointer-events-none absolute -left-32 -top-32 h-64 w-64 rounded-full bg-[#D41B69]/5 blur-3xl" />

            <div className="relative z-10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D41B69]/10 text-[#D41B69]">
                <Icon className="h-5 w-5" />
              </div>
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-[#D41B69] sm:text-xs">
                {active.eyebrow}
              </span>
              <h2
                className="text-2xl font-bold leading-tight text-[#0B1426] sm:text-3xl"
              >
                {active.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                {active.copy}
              </p>

              <ul className="mt-6 space-y-3 border-t border-slate-100 pt-5 sm:mt-8">
                {active.checklist.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm font-semibold text-slate-700"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#D41B69]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={active.primaryBtnUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-crimson px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-crimson/20 transition hover:bg-crimson-hover sm:mt-10 sm:w-auto"
            >
              <ExternalLink className="h-4 w-4" />
              {active.primaryBtnText}
            </a>
          </div>

          {/* Live embed — always visible on mobile and desktop */}
          <BrowserChrome key={active.key} tool={active} tall />
        </div>

        <p className="mt-8 text-center text-xs text-slate-500 sm:text-sm">
          Tip: scroll and tap inside the preview to explore, or open the full
          platform in a new tab.
        </p>
      </div>
    </section>
  );
}
