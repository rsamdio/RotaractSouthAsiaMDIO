"use client";
import { useEffect, useRef, useState } from "react";
import {
  BookOpen, ExternalLink, Newspaper, Award, CheckCircle2,
  Route, ChevronDown, Lock, Receipt, Radio,
} from "lucide-react";

// Flagship digital platforms — browser chrome with live site iframes
// (screenshot fallback when a host blocks framing).
type TabKey = "library" | "invoice" | "navigate" | "publications" | "certify" | "pulse";

type TabData = {
  label: string;
  title: string;
  copy: string;
  displayUrl: string;
  previewUrl: string;
  /** false when the host sends frame-ancestors/X-Frame-Options that block embeds */
  embeddable: boolean;
  fallbackImage?: string;
  /** Fill color behind the iframe (matters when guest pages letterbox) */
  previewBg?: string;
  icon: React.ComponentType<{ className?: string }>;
  checklist: string[];
  primaryBtnText: string;
  primaryBtnUrl: string;
};

/** Guest layout width — wide enough to trigger desktop CSS breakpoints. */
const DESKTOP_VIEWPORT_WIDTH = 1440;

const tabs: { key: TabKey; label: string }[] = [
  { key: "library", label: "Rotaract Library" },
  { key: "invoice", label: "Invoice Calculator" },
  { key: "navigate", label: "NAVIGATE" },
  { key: "publications", label: "Publication Hub" },
  { key: "certify", label: "Certify" },
  { key: "pulse", label: "PULSE" },
];

const tabData: Record<TabKey, TabData> = {
  library: {
    label: "Featured Core Documents",
    title: "Rotaract Library",
    copy: "Foundational constitutional models, recommended bylaws, brand assets, oaths, and operational checklists for every club and district board.",
    displayUrl: "library.rsamdio.org",
    previewUrl: "https://library.rsamdio.org/",
    embeddable: true,
    icon: BookOpen,
    checklist: [
      "Standard Club Constitution (RI approved)",
      "Rotaract Recommended Bylaws",
      "Brand Assets & RSAMDIO Identity",
      "Club Essentials, Roles & Learning Materials",
    ],
    primaryBtnText: "Browse Full Library",
    primaryBtnUrl: "https://library.rsamdio.org/",
  },
  invoice: {
    label: "Finance Toolkit",
    title: "Club Invoice Calculator",
    copy: "Estimate club invoices with precision — calculate MDIO secretariat dues, processing levies, and district-ready totals for your active membership.",
    displayUrl: "dues.rsamdio.org",
    previewUrl: "https://dues.rsamdio.org/",
    embeddable: true,
    icon: Receipt,
    checklist: [
      "Dynamic Membership-Based Dues Estimate",
      "District-Ready Invoice Totals",
      "Processing Levy Breakdown",
      "Export-Friendly Calculation Flow",
    ],
    primaryBtnText: "Open Invoice Calculator",
    primaryBtnUrl: "https://dues.rsamdio.org/",
  },
  navigate: {
    label: "Administration Suite",
    title: "NAVIGATE",
    copy: "Guided pathways that help Rotaractors plan their leadership journey — from club roles to district administration and capacity seminars.",
    displayUrl: "navigate.rsamdio.org",
    previewUrl: "https://navigate.rsamdio.org/",
    embeddable: true,
    icon: Route,
    checklist: [
      "Guided Pathways for Rotaract Leaders",
      "District Administration Resources",
      "Officer Onboarding Support",
      "Capacity Seminar & Training Links",
    ],
    primaryBtnText: "Launch NAVIGATE",
    primaryBtnUrl: "https://navigate.rsamdio.org/",
  },
  publications: {
    label: "Strategic Library Assets",
    title: "Publications Hub",
    copy: "Official annual reports, strategic frameworks, service portfolios, and district publications from across South Asia.",
    displayUrl: "publications.rsamdio.org",
    previewUrl: "https://publications.rsamdio.org/",
    embeddable: true,
    // Matches PublicationsHub --background-light so series/edition letterboxing
    // doesn't flash the dark host chrome behind the guest page.
    previewBg: "#f6f3ed",
    icon: Newspaper,
    checklist: [
      "District Publications Archive",
      "Regional Reports & Frameworks",
      "South Asia Resource Collections",
      "Public Impact Documents",
    ],
    primaryBtnText: "Browse Publications",
    primaryBtnUrl: "https://publications.rsamdio.org/",
  },
  certify: {
    label: "Digital Credentials",
    title: "Rotaract Certify",
    copy: "A cryptographically secure certification engine to issue and verify participation records, seminar graduations, and outstanding service credentials.",
    displayUrl: "certify.rsamdio.org",
    previewUrl: "https://certify.rsamdio.org/",
    embeddable: true,
    icon: Award,
    checklist: [
      "Digital Leadership Seminar Certificates",
      "Outstanding Project Award Verifier",
      "Verified Activity Certificate Downloads",
      "Induction & Recognition Credentials",
    ],
    primaryBtnText: "Access Certificate Hub",
    primaryBtnUrl: "https://certify.rsamdio.org/",
  },
  pulse: {
    label: "Live Collaboration",
    title: "PULSE",
    copy: "Live rooms for Rotaract sessions, discussions, and events — keep districts connected in real time across South Asia.",
    displayUrl: "pulse.rsamdio.org",
    previewUrl: "https://pulse.rsamdio.org/",
    embeddable: true,
    icon: Radio,
    checklist: [
      "Live Session & Event Rooms",
      "Real-Time District Discussions",
      "Multi-District Collaboration Spaces",
      "Lightweight Access for Clubs & Boards",
    ],
    primaryBtnText: "Open PULSE",
    primaryBtnUrl: "https://pulse.rsamdio.org/",
  },
};
function LiveSitePreview({ tab }: { tab: TabData }) {
  const [loaded, setLoaded] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [metrics, setMetrics] = useState<{ scale: number; height: number } | null>(null);
  const previewBg = tab.previewBg ?? "#ffffff";

  // Measure the preview hole before mounting the iframe so the first load
  // doesn't start at 0×0 (Safari often skips/delays onLoad in that case).
  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;

    const update = () => {
      const width = el.clientWidth;
      const height = el.clientHeight;
      if (width <= 0 || height <= 0) return;
      const scale = width / DESKTOP_VIEWPORT_WIDTH;
      setMetrics({ scale, height: height / scale });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [tab.previewUrl]);

  // Eager load + failsafe: cross-origin iframes (esp. Safari) sometimes never
  // fire onLoad on the first paint after Lenis scroll into view.
  useEffect(() => {
    if (!metrics) return;
    setLoaded(false);
    const failsafe = window.setTimeout(() => setLoaded(true), 1800);
    return () => window.clearTimeout(failsafe);
  }, [tab.previewUrl, metrics]);

  useEffect(() => {
    const frame = iframeRef.current;
    if (!frame || !metrics) return;

    const markLoaded = () => setLoaded(true);
    frame.addEventListener("load", markLoaded);
    // If the document already finished before the listener attached.
    try {
      if (frame.contentWindow?.document?.readyState === "complete") {
        markLoaded();
      }
    } catch {
      // Cross-origin — ignore; onLoad / failsafe still apply.
    }

    return () => frame.removeEventListener("load", markLoaded);
  }, [tab.previewUrl, metrics]);

  if (!tab.embeddable) {
    return (
      <a
        href={tab.previewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block h-full min-h-[300px] sm:min-h-[340px] bg-[#FBF6EC] overflow-hidden group"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tab.fallbackImage}
          alt={`${tab.title} website preview`}
          className="absolute inset-0 h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-[#0B1426]/35 group-hover:bg-[#0B1426]/45 transition" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] sm:text-xs font-bold text-[#0B1426] shadow-lg">
            <Lock className="h-3 w-3 text-[#D41B69]" />
            Live embed blocked by site security
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#D41B69] px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-lg">
            <ExternalLink className="h-3.5 w-3.5" />
            Open {tab.displayUrl}
          </span>
        </div>
      </a>
    );
  }

  return (
    <div
      ref={shellRef}
      className="relative flex-1 min-h-[300px] sm:min-h-[340px] w-full overflow-hidden"
      style={{ backgroundColor: previewBg }}
    >
      {!loaded && (
        <div
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-[11px] font-bold uppercase tracking-wider text-slate-500"
          style={{ backgroundColor: previewBg }}
        >
          Loading live preview…
        </div>
      )}
      {metrics && (
        <iframe
          ref={iframeRef}
          key={tab.previewUrl}
          src={tab.previewUrl}
          title={`${tab.title} live preview`}
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute left-0 top-0 border-0"
          style={{
            width: DESKTOP_VIEWPORT_WIDTH,
            height: metrics.height,
            backgroundColor: previewBg,
            transform: `scale(${metrics.scale})`,
            transformOrigin: "top left",
          }}
        />
      )}
      <a
        href={tab.previewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 rounded-full bg-[#0B1426]/85 px-3 py-1.5 text-[10px] sm:text-[11px] font-bold text-white backdrop-blur hover:bg-[#D41B69] transition"
      >
        <ExternalLink className="h-3 w-3" /> Open site
      </a>
    </div>
  );
}

export function InitiativesShowcase() {
  const [activeTab, setActiveTab] = useState<TabKey>("library");
  const [showMobileDemo, setShowMobileDemo] = useState(false);
  const active = tabData[activeTab];

  return (
    <section
      id="initiatives"
      className="relative py-16 sm:py-24 px-3 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#FCE8F1]/40 dark:from-[#0B1426] dark:to-[#0D1825]/90 border-t border-b border-slate-100 dark:border-white/5 scroll-mt-24"
    >
      <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-[#D41B69]/5 dark:bg-[#D41B69]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-[#17458F]/5 dark:bg-[#17458F]/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        <div className="text-center mb-10 sm:mb-12">
          <span className="inline-block rounded-full bg-[#D41B69]/10 dark:bg-[#D41B69]/20 border border-[#D41B69]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-[#D41B69] mb-4">
            Featured Initiatives
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1426] dark:text-white leading-tight px-2"
            style={{ fontFamily: "General Sans, sans-serif" }}
          >
            A Smarter Digital Ecosystem for Rotaract Leaders
          </h2>
          <p className="mt-4 sm:mt-5 text-slate-600 dark:text-white/60 max-w-2xl mx-auto text-sm sm:text-base px-2">
            Explore our growing suite of platforms, tools, and standardized governance templates designed to simplify administration and strengthen collaboration across South Asia.
          </p>
        </div>

        <div className="flex gap-2 rounded-full bg-slate-100/70 dark:bg-white/5 p-1.5 border border-slate-200/50 dark:border-white/10 overflow-x-auto [&::-webkit-scrollbar]:hidden shadow-sm backdrop-blur-xl mb-8 sm:mb-10 max-w-5xl mx-auto">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`whitespace-nowrap rounded-full px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer shrink-0 sm:flex-1 text-center ${
                activeTab === key
                  ? "bg-[#D41B69] text-white shadow-md shadow-[#D41B69]/20"
                  : "text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <div className="rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#131F35]/90 p-6 sm:p-10 shadow-soft dark:shadow-2xl backdrop-blur-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-[#D41B69]/5 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#D41B69] block mb-2">
                {active.label}
              </span>
              <h3
                className="text-2xl sm:text-3xl font-bold text-[#0B1426] dark:text-white leading-tight"
                style={{ fontFamily: "General Sans, sans-serif" }}
              >
                {active.title}
              </h3>
              <p className="mt-3 sm:mt-4 text-slate-600 dark:text-white/70 text-xs sm:text-sm leading-relaxed">
                {active.copy}
              </p>

              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-100 dark:border-white/5 space-y-3 sm:space-y-4">
                {active.checklist.map((item) => (
                  <div key={item} className="flex gap-2.5 sm:gap-3 items-start text-slate-700 dark:text-white/85 text-xs sm:text-sm font-semibold">
                    <CheckCircle2 className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-[#D41B69] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 sm:mt-10 flex flex-col gap-2.5 sm:flex-row pt-4 sm:pt-6 border-t border-slate-100 dark:border-white/5 relative z-10">
              <a
                href={active.primaryBtnUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D41B69] px-6 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-[#D41B69]/20 hover:shadow-lg hover:shadow-[#D41B69]/30 hover:bg-[#8A0F3E] transition-all duration-300 cursor-pointer"
              >
                <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> {active.primaryBtnText}
              </a>
              <button
                onClick={() => setShowMobileDemo(!showMobileDemo)}
                className="inline-flex lg:hidden items-center justify-center gap-2 rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-5 py-3 text-xs font-bold text-slate-700 dark:text-white transition-all cursor-pointer"
              >
                {showMobileDemo ? "Hide Live Preview" : "Show Live Preview"}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${showMobileDemo ? "rotate-180" : ""}`} />
              </button>
              <a
                href="/initiatives"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-6 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-bold text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                View All Platforms
              </a>
            </div>
          </div>

          <div className={`relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-slate-250/20 dark:border-white/15 bg-[#0B1426]/75 p-3.5 sm:p-5 shadow-2xl flex-col backdrop-blur-md min-h-[360px] lg:min-h-[460px] ${showMobileDemo ? "flex" : "hidden lg:flex"}`}>
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#D41B69]/30 dark:bg-[#D41B69]/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-[#17458F]/30 dark:bg-[#17458F]/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex min-h-[320px] flex-1 flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 bg-white shadow-xl sm:min-h-[380px]">
              <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50 px-3.5 py-2.5 sm:px-5 sm:py-3">
                <div className="flex gap-1.5 sm:gap-2">
                  <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#D41B69]" />
                  <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#F7A81B]" />
                  <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-500" />
                </div>
                <a
                  href={active.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="max-w-[70%] truncate rounded-full border border-slate-200 bg-white px-3 py-0.5 text-[9px] font-bold text-slate-600 transition hover:text-[#D41B69] sm:px-3.5 sm:py-1 sm:text-[11px]"
                >
                  {active.displayUrl}
                </a>
              </div>

              <LiveSitePreview key={active.previewUrl} tab={active} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
