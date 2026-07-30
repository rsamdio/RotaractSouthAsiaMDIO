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
    <div className={`flex flex-col h-full rounded-2xl border ${s.border} ${s.bg} overflow-hidden transition-all hover:shadow-md group block`}>
      <div className="h-32 bg-slate-100 dark:bg-white/10 relative">
        <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium text-xs">
          Image Preview
        </div>
        <div className={`absolute top-3 right-3 ${s.dot} text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-sm`}>
          {event.month} {event.year}
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h4 className="font-bold text-[#0B1426] dark:text-white text-sm group-hover:text-[#D41B69] transition-colors line-clamp-2">{event.title}</h4>
        {event.location && (
          <p className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-white/50 mt-1.5 uppercase tracking-wider font-semibold">
            <MapPin className="h-3 w-3" /> {event.location}
          </p>
        )}
        {event.description && (
          <p className="text-[11px] text-slate-600 dark:text-white/60 mt-2 leading-relaxed line-clamp-2">{event.description}</p>
        )}
        <div className="mt-auto pt-4">
          {event.link && (
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#D41B69] hover:bg-[#8A0F3E] text-white text-[10px] font-bold px-3 py-1.5 transition-all shadow-md shadow-[#D41B69]/10"
            >
              Visit Event Site →
            </a>
          )}
        </div>
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
