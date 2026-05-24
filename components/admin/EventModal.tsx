"use client";
import { useState } from "react";
import { addDoc, updateDoc, collection, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { type Event } from "@/components/EventsSection";
import { X, Loader2, CalendarDays, MapPin, FileText, Tag } from "lucide-react";

type Props = {
  event?: Event | null;
  onClose: () => void;
};

const emptyForm: Omit<Event, "id"> = {
  title: "",
  month: "JAN",
  year: new Date().getFullYear().toString(),
  location: "",
  description: "",
  category: "pink",
};

const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

export function EventModal({ event, onClose }: Props) {
  const isEdit = !!event;
  const [form, setForm] = useState<Omit<Event, "id">>(
    event ? { title: event.title, month: event.month, year: event.year, location: event.location, description: event.description, category: event.category }
    : emptyForm
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function handleSave() {
    if (!form.title.trim()) { setError("Event title is required."); return; }
    setSaving(true);
    try {
      if (isEdit && event) {
        await updateDoc(doc(db, "events", event.id), { ...form });
      } else {
        await addDoc(collection(db, "events"), { ...form, createdAt: new Date() });
      }
      onClose();
    } catch (e: unknown) {
      setError("Failed to save. Check Firestore permissions.");
    } finally {
      setSaving(false);
    }
  }

  const catColors: Record<Event["category"], string> = {
    pink: "ring-[#D41B69] bg-[#D41B69]",
    gold: "ring-[#F7A81B] bg-[#F7A81B]",
    blue: "ring-blue-500 bg-blue-500",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#131F35] border border-slate-100 dark:border-white/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D41B69]/10 text-[#D41B69]">
              <CalendarDays className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-[#0B1426] dark:text-white" style={{ fontFamily: "General Sans, sans-serif" }}>
              {isEdit ? "Edit Event" : "Add New Event"}
            </h2>
          </div>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-white/60 hover:bg-slate-200 dark:hover:bg-white/20 transition">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider mb-1.5">Event Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. South Asia Rotaract Convention"
              className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-sm text-[#0B1426] dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D41B69]/40 transition"
            />
          </div>

          {/* Month + Year */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider mb-1.5">Month</label>
              <select
                value={form.month}
                onChange={(e) => set("month", e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-sm text-[#0B1426] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D41B69]/40 transition"
              >
                {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider mb-1.5">Year</label>
              <input
                type="number"
                value={form.year}
                onChange={(e) => set("year", e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-sm text-[#0B1426] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D41B69]/40 transition"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider mb-1.5">
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Location</span>
            </label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              placeholder="e.g. New Delhi, India"
              className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-sm text-[#0B1426] dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D41B69]/40 transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider mb-1.5">
              <span className="flex items-center gap-1"><FileText className="h-3 w-3" /> Description</span>
            </label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
              placeholder="Brief description of the event..."
              className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-sm text-[#0B1426] dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D41B69]/40 transition resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1"><Tag className="h-3 w-3" /> Color Category</span>
            </label>
            <div className="flex gap-3">
              {(["pink", "gold", "blue"] as Event["category"][]).map((c) => (
                <button
                  key={c}
                  onClick={() => set("category", c)}
                  className={`flex-1 rounded-xl py-2.5 text-xs font-bold capitalize transition ring-2 ring-offset-1 ring-offset-white dark:ring-offset-[#131F35] ${
                    form.category === c ? catColors[c] + " text-white" : "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/40 ring-transparent"
                  }`}
                >
                  {c === "pink" ? "🩷 Crimson" : c === "gold" ? "🌟 Gold" : "💙 Blue"}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl px-4 py-3">{error}</p>}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 dark:border-white/10">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-white/60 hover:bg-slate-100 dark:hover:bg-white/10 transition">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#D41B69] text-white text-sm font-bold hover:bg-[#8A0F3E] transition disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {isEdit ? "Save Changes" : "Add Event"}
          </button>
        </div>
      </div>
    </div>
  );
}
