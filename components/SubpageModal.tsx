"use client";

import { useEffect, useState } from "react";
import {
  BadgeInfo, Target, Landmark, GraduationCap, HandHeart,
  Megaphone, HeartHandshake, CalendarDays, Star, CalendarCheck,
  Palette, FileText, X
} from "lucide-react";
import { subpagesData, type SubpageId } from "@/config/subpages";

const iconMap: Record<string, React.ComponentType<any>> = {
  "badge-info": BadgeInfo,
  "target": Target,
  "landmark": Landmark,
  "graduation-cap": GraduationCap,
  "hand-heart": HandHeart,
  "megaphone": Megaphone,
  "heart-handshake": HeartHandshake,
  "calendar-days": CalendarDays,
  "star": Star,
  "calendar-check": CalendarCheck,
  "palette": Palette,
  "file-text": FileText,
};

export function SubpageModal() {
  const [activeId, setActiveId] = useState<SubpageId | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && hash in subpagesData) {
        setActiveId(hash as SubpageId);
        document.body.style.overflow = "hidden";
      } else {
        setActiveId(null);
        document.body.style.overflow = "";
      }
    };

    // Check hash on mount
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      document.body.style.overflow = "";
    };
  }, []);

  if (!activeId) return null;

  const data = subpagesData[activeId];
  const IconComponent = iconMap[data.icon] || BadgeInfo;

  const handleClose = () => {
    // Reset hash without scrolling the page
    if (window.history.pushState) {
      window.history.pushState("", document.title, window.location.pathname + window.location.search);
      // Manually trigger hashchange style update
      setActiveId(null);
      document.body.style.overflow = "";
    } else {
      window.location.hash = "";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0B1426]/80 backdrop-blur-md transition-opacity duration-300 cursor-pointer"
        onClick={handleClose}
      />

      {/* Modal content */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#131F35]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl transition-all duration-300 flex flex-col max-h-[85vh] animate-drift-in z-10">
        
        {/* Ambient background glows inside modal container */}
        <div className="absolute -top-1/4 -left-1/4 w-80 h-80 rounded-full bg-[#D41B69]/15 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-1/4 -right-1/4 w-80 h-80 rounded-full bg-[#F7A81B]/10 blur-[100px] pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#D41B69] shadow-inner backdrop-blur-md">
              <IconComponent className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F7A81B]">
                {data.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5 leading-snug">
                {data.title}
              </h2>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="relative z-10 flex-1 overflow-y-auto pr-2 custom-scrollbar text-white/90">
          <div 
            className="prose prose-invert max-w-none text-slate-300 space-y-4"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>
      </div>
    </div>
  );
}
