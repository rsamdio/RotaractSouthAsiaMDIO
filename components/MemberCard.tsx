"use client";
import { useState } from "react";
import { Globe, Star } from "lucide-react";
import { type LeadershipMember } from "@/config/leadership";
import { RotaryMarkIcon } from "@/components/RotaryMarkIcon";

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

/** Strip club-type prefixes so cards show only the club name. */
function formatHomeClub(name: string) {
  return name
    .replace(/^Rotaract E-Club of(?:\s+Club of)?\s+/i, "")
    .replace(/^Rotaract Club of\s+/i, "")
    .replace(/^Rotary Club of\s+/i, "")
    .trim();
}

// Facebook-style neutral silhouette profile vector icon
function FacebookThumbnail({ initials }: { initials: string }) {
  return (
    <div className="w-full h-full bg-gradient-to-b from-[#E9EEF5] via-[#DEE5F0] to-[#CFDAE9] flex flex-col items-center justify-end relative overflow-hidden">
      {/* Head and Shoulders vector silhouette */}
      <svg
        className="w-[75%] h-[75%] text-[#8A9DB4] translate-y-1 drop-shadow-sm"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
      {/* Initials badge overlay */}
      <div className="absolute top-3 right-3 bg-[#0B1426]/70 backdrop-blur-md text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full border border-white/20 shadow-sm">
        {initials}
      </div>
    </div>
  );
}

export function MemberCard({
  member,
  index,
  isFeatured = false,
  showProfession = true,
}: {
  member: LeadershipMember;
  index: number;
  isFeatured?: boolean;
  showProfession?: boolean;
}) {
  const [imageError, setImageError] = useState(false);
  const initials = getInitials(member.name);

  if (isFeatured) {
    return (
      <div className="mb-8 rounded-3xl border border-[#F7A81B]/20 bg-gradient-to-br from-[#F7A81B]/5 via-white to-[#D41B69]/5 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-md hover:shadow-lg transition-all duration-300">
        {/* Featured Photo Area */}
        <div className="relative flex-shrink-0 h-32 w-32 rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden shadow-md">
          {member.image && !imageError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={member.image}
              alt={member.name}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <FacebookThumbnail initials={initials} />
          )}
          <span className="absolute -top-1 -right-1 h-7 w-7 rounded-full bg-[#F7A81B] flex items-center justify-center shadow-md z-20">
            <Star className="h-3.5 w-3.5 text-white" fill="currentColor" />
          </span>
        </div>

        {/* Featured Details */}
        <div className="text-center sm:text-left flex-grow">
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C87900] mb-1.5">
            {member.title}
          </div>
          <h3 className="text-2xl font-bold text-[#0B1426] leading-tight">
            {member.name}
          </h3>
          <div className="mt-3 space-y-1 text-sm text-slate-500">
            <div className="flex items-start gap-2 justify-center sm:justify-start">
              <Globe className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
              <span className="min-w-0 break-words">
                {member.district} · {member.country}
              </span>
            </div>
            {member.homeClub && (
              <div className="flex items-start gap-2 justify-center sm:justify-start text-xs text-slate-400">
                <RotaryMarkIcon className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <span className="min-w-0 break-words">{formatHomeClub(member.homeClub)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Standard Card
  return (
    <div className="group rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col h-full">
      {/* Photo Area */}
      <div className="relative w-full aspect-[4/5] bg-slate-50 overflow-hidden shrink-0 border-b border-slate-100/80">
        {member.image && !imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.image}
            alt={member.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <FacebookThumbnail initials={initials} />
        )}
      </div>

      {/* Detail Area */}
      <div className="p-3.5 sm:p-5 flex flex-col justify-between flex-grow bg-white">
        <div>
          <h4 className="font-bold text-[#0B1426] text-sm sm:text-lg leading-tight group-hover:text-[#D41B69] transition-colors">
            {member.name}
          </h4>
          <p className="text-[11px] sm:text-xs text-[#D41B69] font-bold mt-1 sm:mt-1.5 capitalize tracking-wide">
            {member.title}
          </p>
          {member.committee && (
            <span className="inline-block mt-1 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-[#17458F] bg-[#17458F]/10 px-1.5 sm:px-2 py-0.5 rounded-md truncate max-w-full">
              {member.committee}
            </span>
          )}
          {showProfession && member.profession && (
            <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 line-clamp-1 italic">
              {member.profession}
            </p>
          )}
        </div>
        
        <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100 space-y-1 sm:space-y-1.5 text-[11px] sm:text-xs text-slate-500">
          <div className="flex items-start gap-1.5 sm:gap-2">
            <Globe className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span className="min-w-0 break-words leading-snug">
              {member.district} · {member.country}
            </span>
          </div>
          {member.homeClub && (
            <div className="flex items-start gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-slate-400">
              <RotaryMarkIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400 shrink-0 mt-0.5" />
              <span className="min-w-0 break-words leading-snug">
                {formatHomeClub(member.homeClub)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
