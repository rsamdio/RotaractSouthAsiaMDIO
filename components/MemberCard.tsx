"use client";
import { useState } from "react";
import { Globe, User, Star } from "lucide-react";
import { type LeadershipMember } from "@/config/leadership";

const avatarColors = [
  { bg: "from-[#D41B69] to-[#8A0F3E]", ring: "ring-[#D41B69]/40" },
  { bg: "from-[#7E22CE] to-[#581033]", ring: "ring-[#7E22CE]/40" },
  { bg: "from-[#17458F] to-[#0B1426]", ring: "ring-[#17458F]/40" },
  { bg: "from-[#F7A81B] to-[#C87900]", ring: "ring-[#F7A81B]/40" },
];

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export function MemberCard({
  member,
  index,
  isFeatured = false,
}: {
  member: LeadershipMember;
  index: number;
  isFeatured?: boolean;
}) {
  const [imageError, setImageError] = useState(false);
  const colors = avatarColors[index % avatarColors.length];
  const initials = getInitials(member.name);

  if (isFeatured) {
    return (
      <div className="mb-8 rounded-3xl border border-[#F7A81B]/20 bg-gradient-to-br from-[#F7A81B]/5 via-white to-[#D41B69]/5 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-md hover:shadow-lg transition-all duration-300">
        {/* Featured Photo Area */}
        <div className="relative flex-shrink-0 h-28 w-28 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden shadow-md">
          {member.image && !imageError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={member.image}
              alt={member.name}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${colors.bg} flex items-center justify-center text-white text-3xl font-extrabold relative`}>
              <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
              <span className="relative z-10" style={{ fontFamily: "General Sans, sans-serif" }}>{initials}</span>
            </div>
          )}
          <span className="absolute -top-1 -right-1 h-7 w-7 rounded-full bg-[#F7A81B] flex items-center justify-center shadow-md z-20">
            <Star className="h-3.5 w-3.5 text-white" fill="currentColor" />
          </span>
        </div>

        {/* Featured Details */}
        <div className="text-center sm:text-left flex-grow">
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C87900] mb-1.5">
            MDIO President · RY 2026–27
          </div>
          <h3 className="text-2xl font-bold text-[#0B1426] leading-tight" style={{ fontFamily: "General Sans, sans-serif" }}>
            {member.name}
          </h3>
          <div className="flex items-center gap-2 mt-3 justify-center sm:justify-start text-sm text-slate-500">
            <Globe className="h-4 w-4 text-slate-400 shrink-0" />
            <span>{member.district} · {member.country}</span>
          </div>
        </div>
      </div>
    );
  }

  // Default Grid Card
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
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          /* Placeholder */
          <div className={`w-full h-full bg-gradient-to-br ${colors.bg} flex flex-col items-center justify-center text-white p-6 relative`}>
            <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
            <div className="relative flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shadow-inner">
                <User className="w-8 h-8 text-white/90" />
              </div>
              <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "General Sans, sans-serif" }}>
                {initials}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                Photo TBD
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Detail Area */}
      <div className="p-5 flex flex-col justify-between flex-grow bg-white">
        <div>
          <h4 className="font-bold text-[#0B1426] text-base leading-tight group-hover:text-[#D41B69] transition-colors">
            {member.name}
          </h4>
          <p className="text-xs text-[#D41B69] font-bold mt-1.5 uppercase tracking-wide">
            {member.title}
          </p>
        </div>
        
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
          <Globe className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{member.district} · {member.country}</span>
        </div>
      </div>
    </div>
  );
}
