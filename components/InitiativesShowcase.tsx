"use client";

import { useState } from "react";
import { CheckCircle2, ExternalLink } from "lucide-react";
import {
  platformTools,
  type PlatformKey,
} from "@/config/platformTools";
import { BrowserChrome } from "@/components/initiatives/LiveSitePreview";
import { useScrollActiveTabIntoView } from "@/lib/useScrollActiveTabIntoView";

export function InitiativesShowcase() {
  const [activeKey, setActiveKey] = useState<PlatformKey>("library");
  const active = platformTools.find((t) => t.key === activeKey) ?? platformTools[0];
  const { scrollerRef, setTabRef } = useScrollActiveTabIntoView(activeKey);

  return (
    <section
      id="initiatives"
      className="relative scroll-mt-24 border-t border-b border-slate-100 bg-gradient-to-b from-white to-[#FCE8F1]/40 px-3 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="pointer-events-none absolute left-10 top-10 h-72 w-72 rounded-full bg-[#D41B69]/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-96 w-96 rounded-full bg-[#17458F]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 px-2 text-center sm:mb-12">
          <span className="mb-4 inline-block rounded-full border border-[#D41B69]/20 bg-[#D41B69]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-[#D41B69]">
            Digital Ecosystem
          </span>
          <h2
            className="px-2 text-3xl font-bold leading-tight text-[#0B1426] sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "General Sans, sans-serif" }}
          >
            A Smarter Digital Ecosystem for Rotaract Leaders
          </h2>
          <p className="mx-auto mt-4 max-w-2xl px-2 text-sm text-slate-600 sm:mt-5 sm:text-base">
            Explore our growing suite of platforms, tools, and standardized governance
            templates designed to simplify administration and strengthen collaboration
            across South Asia.
          </p>
        </div>

        <div
          ref={scrollerRef}
          className="mx-auto mb-8 flex max-w-5xl gap-2 overflow-x-auto rounded-full border border-slate-200/50 bg-slate-100/70 p-1.5 shadow-sm backdrop-blur-xl sm:mb-10 [&::-webkit-scrollbar]:hidden"
        >
          {platformTools.map((tool) => (
            <button
              key={tool.key}
              ref={setTabRef(tool.key)}
              type="button"
              onClick={() => setActiveKey(tool.key)}
              className={`shrink-0 cursor-pointer whitespace-nowrap rounded-full px-4 py-2.5 text-center text-xs font-bold transition-all duration-300 sm:flex-1 sm:px-5 sm:py-3 sm:text-sm ${
                activeKey === tool.key
                  ? "bg-[#D41B69] text-white shadow-md shadow-[#D41B69]/20"
                  : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900"
              }`}
            >
              {tool.label}
            </button>
          ))}
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          <div className="relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-soft backdrop-blur-2xl sm:rounded-[2.5rem] sm:p-10">
            <div className="pointer-events-none absolute -left-40 -top-40 h-80 w-80 rounded-full bg-[#D41B69]/5 blur-3xl" />

            <div className="relative z-10">
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-[#D41B69] sm:text-xs">
                {active.eyebrow}
              </span>
              <h3
                className="text-2xl font-bold leading-tight text-[#0B1426] sm:text-3xl"
                style={{ fontFamily: "General Sans, sans-serif" }}
              >
                {active.title}
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:mt-4 sm:text-sm">
                {active.copy}
              </p>

              <div className="mt-6 space-y-3 border-t border-slate-100 pt-4 sm:mt-8 sm:space-y-4 sm:pt-6">
                {active.checklist.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2.5 text-xs font-semibold text-slate-700 sm:gap-3 sm:text-sm"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#D41B69] sm:h-5 sm:w-5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-8 flex flex-col gap-2.5 border-t border-slate-100 pt-4 sm:mt-10 sm:flex-row sm:pt-6">
              <a
                href={active.primaryBtnUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#D41B69] px-6 py-3 text-xs font-bold text-white shadow-md shadow-[#D41B69]/20 transition hover:bg-[#8A0F3E] sm:px-7 sm:py-3.5 sm:text-sm"
              >
                <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />{" "}
                {active.primaryBtnText}
              </a>
              <a
                href="/initiatives"
                className="inline-flex cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50 sm:px-7 sm:py-3.5 sm:text-sm"
              >
                All Initiatives
              </a>
            </div>
          </div>

          {/* Always show live embed — including mobile */}
          <BrowserChrome tool={active} />
        </div>
      </div>
    </section>
  );
}
