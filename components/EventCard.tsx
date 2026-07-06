import { CalendarDays, MapPin } from "lucide-react";
import { type Event } from "@/config/events";

const categoryStyles: Record<Event["category"], { bg: string; text: string; border: string; dot: string }> = {
  pink: { bg: "bg-[#D41B69]/10 dark:bg-[#D41B69]/15", text: "text-[#D41B69]", border: "border-[#D41B69]/20", dot: "bg-[#D41B69]" },
  gold: { bg: "bg-[#F7A81B]/10 dark:bg-[#F7A81B]/15", text: "text-[#C87900] dark:text-[#F7A81B]", border: "border-[#F7A81B]/20", dot: "bg-[#F7A81B]" },
  blue: { bg: "bg-[#17458F]/5 dark:bg-[#17458F]/20", text: "text-[#17458F] dark:text-blue-300", border: "border-[#17458F]/20", dot: "bg-[#17458F]" },
};

export function EventCard({ event }: { event: Event }) {
  const s = categoryStyles[event.category] ?? categoryStyles.pink;
  return (
    <div className={`flex gap-5 rounded-2xl border ${s.border} ${s.bg} p-5 transition-all hover:shadow-soft`}>
      <div className={`${s.dot} rounded-xl text-white p-3 text-center shrink-0 min-w-[60px] flex flex-col items-center justify-center`}>
        <div className="text-sm font-bold">{event.month}</div>
        <div className="text-[10px] opacity-80">{event.year}</div>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-[#0B1426] dark:text-white text-base">{event.title}</h4>
        {event.location && (
          <p className="flex items-center gap-1 text-xs text-slate-500 dark:text-white/50 mt-0.5">
            <MapPin className="h-3 w-3" /> {event.location}
          </p>
        )}
        {event.description && (
          <p className="text-xs text-slate-600 dark:text-white/60 mt-2 leading-relaxed">{event.description}</p>
        )}
        {event.link && (
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#D41B69] hover:bg-[#8A0F3E] text-white text-[10px] font-bold px-3 py-1.5 mt-3.5 transition-all shadow-md shadow-[#D41B69]/10"
          >
            Visit Event Site →
          </a>
        )}
      </div>
    </div>
  );
}

export function EventCardEmpty() {
  return (
    <div className="text-center py-16 text-slate-400 dark:text-white/30">
      <CalendarDays className="h-12 w-12 mx-auto mb-3 opacity-40" />
      <p className="text-sm">No events scheduled yet. Check back soon.</p>
    </div>
  );
}
