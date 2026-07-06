"use client";
import { useState } from "react";
import {
  BookOpen, Download, ExternalLink, Newspaper, Award, CheckCircle2,
  Search, User, ShieldCheck, ChevronLeft, ChevronRight, Route,
  Image as ImageIcon, Check,
} from "lucide-react";

// "Featured Initiatives" — the flagship digital platforms, presented as a
// tabbed showcase with a live browser-frame mockup of each tool.
type TabKey = "library" | "brand" | "navigate" | "publications" | "certify";

type TabData = {
  label: string;
  title: string;
  copy: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  checklist: string[];
  primaryBtnText: string;
  primaryBtnUrl: string;
};

const tabs: { key: TabKey; label: string }[] = [
  { key: "library", label: "Rotaract Library" },
  { key: "brand", label: "Brand Kit" },
  { key: "navigate", label: "NAVIGATE" },
  { key: "publications", label: "Publications Hub" },
  { key: "certify", label: "Rotaract Certify" },
];

const tabData: Record<TabKey, TabData> = {
  library: {
    label: "Featured Core Documents",
    title: "Rotaract Library",
    copy: "Foundational constitutional models, recommended bylaws, oaths, and operational checklists approved by Rotary International for official club setups.",
    url: "library.rsamdio.org",
    icon: BookOpen,
    checklist: [
      "Standard Club Constitution (RI approved)",
      "Rotaract Recommended Bylaws",
      "DRR Executive Induction Ceremony Script",
      "Strategic Planning & Goal Setting Canvas",
    ],
    primaryBtnText: "Browse Full Library",
    primaryBtnUrl: "https://library.rsamdio.org/",
  },
  brand: {
    label: "Branding Standard Kit",
    title: "Brand Kit",
    copy: "High-resolution vector logos, standardized color specifications, and visual guidelines for unified public image campaigns across all 8 nations.",
    url: "library.rsamdio.org/brand-identity",
    icon: ImageIcon,
    checklist: [
      "Official Wordmark Vector Pack (.ai/.svg)",
      "Cranberry & Gold Palette Brand Book",
      "Social Media Announcement Templates",
      "Event Banner & Public Image Grid Assets",
    ],
    primaryBtnText: "Download Brand Kit",
    primaryBtnUrl: "https://library.rsamdio.org/#brand-identity",
  },
  navigate: {
    label: "Administration Suite",
    title: "NAVIGATE & Dues Tools",
    copy: "Smarter administrative tools designed to coordinate district assemblies, calculate dues invoices, and streamline officer training progress.",
    url: "rsamdio.org/navigate",
    icon: Route,
    checklist: [
      "Dynamic Club Dues Invoice Calculator",
      "DRR District Administration Dashboard",
      "PETS Capacity Seminar Learning Decks",
      "Multi-District Meeting Scheduler",
    ],
    primaryBtnText: "Launch NAVIGATE",
    primaryBtnUrl: "https://library.rsamdio.org/",
  },
  publications: {
    label: "Strategic Library Assets",
    title: "Publications Hub",
    copy: "Official annual reports, strategic frameworks, service portfolios, and public audits detailing the regional impact of 120K+ Rotaractors.",
    url: "rsamdio.org/publications",
    icon: Newspaper,
    checklist: [
      "Secretariat Annual Impact Report",
      "Grants & Foundation FAQ Guidebook",
      "Clean South Asia Environmental Portfolio",
      "South Asian Friendship Exchange Handbook",
    ],
    primaryBtnText: "Browse Publications",
    primaryBtnUrl: "https://library.rsamdio.org/#publications",
  },
  certify: {
    label: "Digital Credentials",
    title: "Rotaract Certify",
    copy: "A cryptographically secure certification engine to issue and verify participation records, seminar graduations, and outstanding service credentials.",
    url: "rsamdio.org/certify",
    icon: Award,
    checklist: [
      "Digital Leadership Seminar Certificates",
      "Outstanding Project Award Verifier",
      "Cryptographic Secretariat Signature Checker",
      "Induction Kit Graduation Badges",
    ],
    primaryBtnText: "Access Certificate Hub",
    primaryBtnUrl: "https://library.rsamdio.org/",
  },
};

const libraryDocs = [
  { name: "Standard Rotaract Constitution (EN)", size: "542 KB", type: "PDF" },
  { name: "Rotaract Recommended Bylaws (RI Model)", size: "1.2 MB", type: "DOCX" },
  { name: "DRR Induction Ceremony Script Book", size: "215 KB", type: "PDF" },
  { name: "Strategic Goal Setting Canvas", size: "1.8 MB", type: "XLSX" },
];

export function InitiativesShowcase() {
  const [activeTab, setActiveTab] = useState<TabKey>("library");

  // Library mockup
  const [librarySearch, setLibrarySearch] = useState("");
  const [downloadedFile, setDownloadedFile] = useState<string | null>(null);

  // Brand mockup
  const [logoAccent, setLogoAccent] = useState("#D41B69");

  // NAVIGATE mockup
  const [memberCount, setMemberCount] = useState(25);
  const [invoiceDistrict, setInvoiceDistrict] = useState("D3220");
  const [invoiceToast, setInvoiceToast] = useState(false);

  // Publications mockup
  const [pubPage, setPubPage] = useState(1);

  // Certify mockup
  const [certName, setCertName] = useState("District Leader");

  const active = tabData[activeTab];

  const simulateDownload = (filename: string) => {
    setDownloadedFile(filename);
    setTimeout(() => setDownloadedFile(null), 1800);
  };

  const cycleBrandColor = () => {
    const colors = ["#D41B69", "#F7A81B", "#10B981", "#3B82F6"];
    setLogoAccent(colors[(colors.indexOf(logoAccent) + 1) % colors.length]);
  };

  const triggerInvoiceToast = () => {
    setInvoiceToast(true);
    setTimeout(() => setInvoiceToast(false), 2500);
  };

  return (
    <section
      id="initiatives"
      className="relative py-16 sm:py-24 px-3 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#FCE8F1]/40 dark:from-[#0B1426] dark:to-[#0D1825]/90 border-t border-b border-slate-100 dark:border-white/5 scroll-mt-24"
    >
      <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-[#D41B69]/5 dark:bg-[#D41B69]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-[#17458F]/5 dark:bg-[#17458F]/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
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

        {/* Tab selectors */}
        <div className="flex gap-2 rounded-full bg-slate-100/70 dark:bg-white/5 p-1.5 border border-slate-200/50 dark:border-white/10 overflow-x-auto [&::-webkit-scrollbar]:hidden shadow-sm backdrop-blur-xl mb-8 sm:mb-10 max-w-4xl mx-auto">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`whitespace-nowrap rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer flex-1 text-center ${
                activeTab === key
                  ? "bg-[#D41B69] text-white shadow-md shadow-[#D41B69]/20"
                  : "text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Split layout: checklist panel + browser mockup */}
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          {/* Left: content panel */}
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
              <a
                href="/resources"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-6 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-bold text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                View All Platforms
              </a>
            </div>
          </div>

          {/* Right: browser-frame mockup */}
          <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-slate-250/20 dark:border-white/15 bg-[#0B1426]/75 p-3.5 sm:p-5 shadow-2xl flex flex-col justify-center backdrop-blur-md min-h-[400px] lg:min-h-[460px]">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#D41B69]/30 dark:bg-[#D41B69]/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-[#17458F]/30 dark:bg-[#17458F]/20 blur-3xl pointer-events-none" />

            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl flex flex-col h-full">
              {/* Browser bar */}
              <div className="flex items-center justify-between border-b border-white/10 px-3.5 py-2.5 sm:px-5 sm:py-3.5 bg-white/5 shrink-0">
                <div className="flex gap-1.5 sm:gap-2">
                  <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#D41B69]" />
                  <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#F7A81B]" />
                  <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-500" />
                </div>
                <span className="rounded-full bg-white/10 px-3 py-0.5 sm:px-3.5 sm:py-1 text-[9px] sm:text-[11px] font-bold text-white/80 select-none">
                  {active.url}
                </span>
              </div>

              {/* Browser body — bespoke interactive views */}
              <div className="flex-1 bg-[#090F1E]/80 text-white min-h-[300px] sm:min-h-[340px] flex flex-col">

                {/* 1. LIBRARY: searchable document list */}
                {activeTab === "library" && (
                  <div className="p-3.5 sm:p-5 flex flex-col gap-3 sm:gap-4 h-full animate-drift-in">
                    <div className="flex items-center justify-between gap-2.5 shrink-0">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-2 sm:top-2.5 h-3.5 w-3.5 text-white/40" />
                        <input
                          type="text"
                          value={librarySearch}
                          onChange={(e) => setLibrarySearch(e.target.value)}
                          placeholder="Search 150+ templates..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-1 sm:py-1.5 pl-8.5 pr-3 text-[10px] sm:text-xs font-semibold text-white placeholder-white/40 focus:outline-none focus:border-[#D41B69]/60"
                        />
                      </div>
                      <span className="text-[8px] sm:text-[10px] uppercase font-bold text-white/40 shrink-0 bg-white/5 px-2 py-1 sm:py-1.5 rounded-lg">
                        Zone: All
                      </span>
                    </div>

                    <div className="flex-1 overflow-y-auto max-h-[200px] sm:max-h-[240px] space-y-2 pr-1">
                      {libraryDocs
                        .filter((doc) => doc.name.toLowerCase().includes(librarySearch.toLowerCase()))
                        .map((doc) => (
                          <div key={doc.name} className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/15 transition-all">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-[#D41B69]/10 text-[#D41B69] flex items-center justify-center font-bold text-[9px] sm:text-xs shrink-0">
                                {doc.type}
                              </div>
                              <div className="min-w-0">
                                <h5 className="text-[10px] sm:text-xs font-bold text-white/95 truncate">{doc.name}</h5>
                                <p className="text-[8px] sm:text-[10px] text-white/40 font-semibold mt-0.5">{doc.size}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => simulateDownload(doc.name)}
                              aria-label={`Download ${doc.name}`}
                              className={`h-6 w-6 sm:h-7 sm:w-7 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                                downloadedFile === doc.name
                                  ? "bg-emerald-500 text-white"
                                  : "bg-white/5 text-white/60 hover:bg-[#D41B69] hover:text-white"
                              }`}
                            >
                              {downloadedFile === doc.name ? <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> : <Download className="h-3 w-3 sm:h-3.5 sm:w-3.5" />}
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* 2. BRAND KIT: swatches + logo color swapper */}
                {activeTab === "brand" && (
                  <div className="p-3.5 sm:p-5 flex flex-col justify-between h-full animate-drift-in gap-3 sm:gap-4">
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-3 shrink-0">
                      {[
                        { name: "CRANBERRY", hex: "#D41B69", cls: "bg-[#D41B69]" },
                        { name: "GOLDEN", hex: "#F7A81B", cls: "bg-[#F7A81B]" },
                        { name: "NAVY DARK", hex: "#0B1426", cls: "bg-[#0B1426] border border-white/10" },
                      ].map((c) => (
                        <div key={c.hex} className="bg-white/5 border border-white/5 rounded-xl sm:rounded-2xl p-2 sm:p-3 text-center">
                          <div className={`w-full h-6 sm:h-8 rounded-md sm:rounded-lg ${c.cls} mb-1 sm:mb-1.5 shadow-md`} />
                          <span className="text-[8px] sm:text-[10px] font-bold tracking-wider">{c.name}</span>
                          <code className="block text-[7px] sm:text-[8px] text-white/40 mt-0.5 font-bold">{c.hex}</code>
                        </div>
                      ))}
                    </div>

                    <div className="flex-1 bg-white/5 rounded-2xl border border-white/5 p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                      <div className="flex items-center gap-3">
                        <svg viewBox="0 0 100 100" className="h-12 w-12 sm:h-16 sm:w-16 transition-all duration-500 shrink-0">
                          <circle cx="50" cy="50" r="45" fill="none" stroke={logoAccent} strokeWidth="6" />
                          <circle cx="50" cy="50" r="30" fill="none" stroke={logoAccent} strokeWidth="2" strokeDasharray="6 4" />
                          <polygon points="50,22 62,45 88,50 67,66 73,92 50,78 27,92 33,66 12,50 38,45" fill={logoAccent} />
                        </svg>
                        <div>
                          <h5 className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider">Fused Emblem Logo</h5>
                          <p className="text-[9px] sm:text-[10px] text-white/40 font-semibold mt-0.5 sm:mt-1">Scalable vector graphics (.svg)</p>
                          <span className="inline-block mt-1.5 rounded bg-white/10 px-2 py-0.5 text-[7px] sm:text-[8px] font-bold tracking-widest uppercase">
                            Color: {logoAccent}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={cycleBrandColor}
                        className="w-full sm:w-auto rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-[10px] sm:text-xs px-3.5 py-1.5 sm:px-4 sm:py-2 border border-white/15 transition-all cursor-pointer shrink-0 text-center"
                      >
                        Swap Logo Color
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. NAVIGATE: dues invoice calculator */}
                {activeTab === "navigate" && (
                  <div className="p-3.5 sm:p-5 flex flex-col justify-between h-full animate-drift-in gap-2.5 sm:gap-3">
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 shrink-0">
                      <div>
                        <label className="text-[8px] sm:text-[10px] font-bold text-white/50 block mb-0.5 sm:mb-1 uppercase tracking-wider">Select District</label>
                        <select
                          value={invoiceDistrict}
                          onChange={(e) => setInvoiceDistrict(e.target.value)}
                          className="w-full bg-[#0B1426] border border-white/10 rounded-lg sm:rounded-xl py-1 sm:py-1.5 px-2 sm:px-3 text-[10px] sm:text-xs font-bold text-white focus:outline-none"
                        >
                          <option value="D3220">D3220 (SL)</option>
                          <option value="D3150">D3150 (IND)</option>
                          <option value="D3271">D3271 (PAK)</option>
                          <option value="D3292">D3292 (NEP)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[8px] sm:text-[10px] font-bold text-white/50 block mb-0.5 sm:mb-1 uppercase tracking-wider">Base Rate / Member</label>
                        <div className="bg-white/5 border border-white/10 rounded-lg sm:rounded-xl py-1 sm:py-1.5 px-2 sm:px-3 text-[10px] sm:text-xs font-bold text-[#F7A81B]">
                          ₹50 INR
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl sm:rounded-2xl border border-white/5 p-3 sm:p-4 flex-1 flex flex-col justify-center gap-2.5 sm:gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] sm:text-xs font-bold text-white/70">Club Active Members</span>
                        <span className="text-[11px] sm:text-sm font-bold text-white bg-[#D41B69] px-2 sm:px-2.5 py-0.5 rounded-full">{memberCount}</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="100"
                        value={memberCount}
                        onChange={(e) => setMemberCount(Number(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D41B69]"
                      />
                      <div className="border-t border-white/5 pt-1.5 sm:pt-2 mt-0.5 sm:mt-1 space-y-1 sm:space-y-1.5 text-[9px] sm:text-[11px] font-bold text-white/60">
                        <div className="flex justify-between">
                          <span>MDIO Secretariat Dues ({invoiceDistrict})</span>
                          <span className="text-white">₹{memberCount * 50}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Processing Levy</span>
                          <span className="text-white">₹350</span>
                        </div>
                        <div className="flex justify-between border-t border-white/10 pt-1.5 sm:pt-2 text-[10px] sm:text-xs text-white">
                          <span>TOTAL SEC INVOICE</span>
                          <span className="text-[#F7A81B] font-extrabold">₹{memberCount * 50 + 350} INR</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 shrink-0 relative">
                      <button
                        onClick={triggerInvoiceToast}
                        className="flex-1 bg-[#D41B69] hover:bg-[#8A0F3E] text-white font-bold text-[10px] sm:text-xs py-2 rounded-lg sm:rounded-xl transition cursor-pointer text-center"
                      >
                        Generate Official Invoice
                      </button>
                      {invoiceToast && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-emerald-500 border border-emerald-400 text-white font-bold text-[9px] sm:text-xs py-1.5 px-4 rounded-full shadow-2xl animate-pulse whitespace-nowrap z-20">
                        ✓ Dues compiled successfully!
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 4. PUBLICATIONS: booklet pager */}
                {activeTab === "publications" && (
                  <div className="p-3.5 sm:p-5 flex flex-col justify-between h-full animate-drift-in gap-3 sm:gap-4">
                    <div className="flex-1 bg-white/5 rounded-xl sm:rounded-2xl border border-white/5 p-3 sm:p-4 flex flex-col justify-center items-center relative min-h-[160px] sm:min-h-[190px]">
                      {pubPage === 1 && (
                        <div className="text-center max-w-sm animate-drift-in">
                          <div className="mx-auto h-12 w-9 sm:h-16 sm:w-12 rounded bg-gradient-to-br from-[#8A0F3E] to-[#D41B69] flex items-center justify-center shadow-lg border border-white/20 mb-2 sm:mb-3">
                            <Newspaper className="h-4.5 w-4.5 sm:h-6 sm:w-6 text-[#F7A81B]" />
                          </div>
                          <h4 className="text-[11px] sm:text-sm font-bold text-white uppercase tracking-wider">Secretariat Annual Impact Report</h4>
                          <p className="text-[9px] sm:text-[10px] text-white/40 font-semibold mt-0.5 sm:mt-1">Rotary Year 2026–27 framework</p>
                          <span className="inline-block mt-2 sm:mt-3 rounded-full bg-emerald-500/10 text-emerald-400 px-2 py-0.5 text-[8px] sm:text-[9px] font-bold">
                            ✓ Published & Publicly Audited
                          </span>
                        </div>
                      )}
                      {pubPage === 2 && (
                        <div className="text-center w-full animate-drift-in">
                          <h4 className="text-[10px] sm:text-xs font-bold text-[#F7A81B] uppercase tracking-widest mb-2 sm:mb-3">Key Strategic Achievements</h4>
                          <div className="grid grid-cols-2 gap-2 text-left">
                            {[
                              { label: "TOTAL MEMBERS", value: "120K+ Active" },
                              { label: "CLUBS SETUP", value: "3,500+ Setup" },
                              { label: "SERVICE FUNDS", value: "₹4.5M Logged" },
                              { label: "HOURS SPENT", value: "2M+ Logged" },
                            ].map((stat) => (
                              <div key={stat.label} className="bg-black/30 p-2 sm:p-2.5 rounded-lg sm:rounded-xl border border-white/5">
                                <span className="block text-white/40 text-[7px] sm:text-[8px] font-bold uppercase tracking-wider">{stat.label}</span>
                                <strong className="text-[11px] sm:text-sm font-bold text-white">{stat.value}</strong>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {pubPage === 3 && (
                        <div className="text-left w-full animate-drift-in space-y-1.5 text-[10px] sm:text-xs font-semibold text-white/80">
                          <h4 className="text-[11px] sm:text-xs font-bold text-[#D41B69] uppercase tracking-wider text-center mb-1.5">Secretariat Focus Pillars</h4>
                          <div className="p-1.5 bg-black/35 rounded-lg border border-white/5 leading-tight">
                            <strong>1. Professional Development:</strong> Launching multi-district seminars.
                          </div>
                          <div className="p-1.5 bg-black/35 rounded-lg border border-white/5 leading-tight">
                            <strong>2. Public Relations:</strong> Deploying PR graphic standards.
                          </div>
                          <div className="p-1.5 bg-black/35 rounded-lg border border-white/5 leading-tight">
                            <strong>3. Regional Exchange:</strong> Promoting friendship fellowships.
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[10px] sm:text-xs font-bold shrink-0">
                      <button
                        onClick={() => setPubPage((prev) => Math.max(1, prev - 1))}
                        disabled={pubPage === 1}
                        className="flex items-center gap-0.5 text-white/60 hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                      >
                        <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Prev
                      </button>
                      <span className="text-white/40">Page {pubPage} of 3</span>
                      <button
                        onClick={() => setPubPage((prev) => Math.min(3, prev + 1))}
                        disabled={pubPage === 3}
                        className="flex items-center gap-0.5 text-white/60 hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                      >
                        Next <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* 5. CERTIFY: certificate maker */}
                {activeTab === "certify" && (
                  <div className="p-3 sm:p-4 flex flex-col justify-between h-full animate-drift-in gap-2.5 sm:gap-3">
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="relative flex-1">
                        <User className="absolute left-2.5 top-1.5 h-3.5 w-3.5 text-white/40" />
                        <input
                          type="text"
                          value={certName}
                          onChange={(e) => setCertName(e.target.value)}
                          placeholder="Type Recipient Name..."
                          maxLength={25}
                          className="w-full bg-white/5 border border-white/10 rounded-lg sm:rounded-xl py-1 sm:py-1.5 pl-8 sm:pl-8.5 pr-3 text-[10px] sm:text-xs font-bold placeholder-white/35 focus:outline-none focus:border-[#F7A81B]"
                        />
                      </div>
                    </div>

                    <div className="flex-1 rounded-xl bg-gradient-to-br from-[#FFF1D6] to-[#FFE299] p-2.5 sm:p-3 text-navy-dark relative border-[3px] border-[#F7A81B] flex flex-col justify-between items-center text-center shadow-lg min-h-[140px] sm:min-h-[170px] overflow-hidden">
                      <div className="absolute inset-0 opacity-[0.02] flex items-center justify-center pointer-events-none">
                        <Award className="h-24 w-24 sm:h-32 sm:w-32" />
                      </div>

                      <div className="shrink-0 leading-none">
                        <h6 className="text-[6px] sm:text-[7px] tracking-[0.2em] font-extrabold text-[#D41B69] uppercase">Rotaract South Asia MDIO</h6>
                        <h5 className="text-[8px] sm:text-[10px] tracking-tight font-extrabold uppercase text-navy-dark mt-0.5 sm:mt-1">Certificate of Excellence</h5>
                      </div>

                      <div className="flex-1 flex flex-col justify-center my-1 sm:my-1.5">
                        <p className="text-[6px] sm:text-[7px] italic text-navy-dark/60 font-semibold leading-none">This digital credential is proudly presented to</p>
                        <h4 className="text-[11px] sm:text-sm font-extrabold text-[#8A0F3E] tracking-tight mt-0.5 sm:mt-1 truncate max-w-[200px] sm:max-w-[240px]">
                          {certName || "Your Name"}
                        </h4>
                        <p className="text-[6px] sm:text-[7px] text-navy-dark/70 font-semibold max-w-[180px] sm:max-w-[240px] mx-auto mt-0.5 sm:mt-1 leading-relaxed">
                          For outstanding service, strategic Multi-District leadership, and commitment to humanitarian progress.
                        </p>
                      </div>

                      <div className="w-full flex items-center justify-between shrink-0 border-t border-navy-dark/10 pt-0.5 sm:pt-1 text-[5px] sm:text-[6px] font-bold text-navy-dark/50 leading-none">
                        <div className="text-left">
                          <span>REGIONAL BOARD</span>
                          <div className="h-px w-6 sm:w-10 bg-navy-dark/20 mt-0.5 sm:mt-1" />
                        </div>
                        <div className="flex items-center gap-0.5 bg-[#D41B69]/10 text-[#D41B69] px-1.5 py-0.5 rounded border border-[#D41B69]/20 font-extrabold text-[5px] sm:text-[6px]">
                          <ShieldCheck className="h-1.5 w-1.5 sm:h-2 sm:w-2" />
                          <span>SEC VERIFIED</span>
                        </div>
                        <div className="text-right">
                          <span>YEAR 2026–27</span>
                          <div className="h-px w-6 sm:w-10 bg-navy-dark/20 mt-0.5 sm:mt-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
