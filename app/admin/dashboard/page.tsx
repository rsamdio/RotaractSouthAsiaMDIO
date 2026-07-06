"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  collection, onSnapshot, deleteDoc, doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { onAuthChanged, signOut } from "@/lib/auth";
import { type Event } from "@/config/events";
import { EventModal } from "@/components/admin/EventModal";
import {
  Plus, Pencil, Trash2, LogOut, CalendarDays,
  Loader2, MapPin, CheckCircle, Clock,
} from "lucide-react";
import Image from "next/image";

const catDot: Record<Event["category"], string> = {
  pink: "bg-[#D41B69]",
  gold: "bg-[#F7A81B]",
  blue: "bg-[#17458F]",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // Events state
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editTarget, setEditTarget] = useState<Event | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Auth guard with domain verification
  useEffect(() => {
    const unsub = onAuthChanged((user) => {
      if (!user) {
        router.replace("/admin");
      } else {
        const email = user.email || "";
        if (email.endsWith("@rsamdio.org")) {
          setUserEmail(email);
          setAuthChecked(true);
        } else {
          signOut();
          router.replace("/admin");
        }
      }
    });
    return unsub;
  }, [router]);

  // Firestore events listener
  useEffect(() => {
    if (!authChecked) return;
    const unsub = onSnapshot(collection(db, "events"), (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Event));
      data.sort((a, b) => (a.year + a.month).localeCompare(b.year + b.month));
      setEvents(data);
      setLoadingEvents(false);
    });
    return unsub;
  }, [authChecked]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this event? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await deleteDoc(doc(db, "events", id));
    } catch (err) {
      console.error("Delete event failed:", err);
    } finally {
      setDeletingId(null);
    }
  }

  async function handleSignOut() {
    await signOut();
    router.replace("/admin");
  }

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#0B1426] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#D41B69]" />
      </div>
    );
  }

  const now = new Date();
  const upcomingEvents = events.filter((e) => parseInt(e.year) >= now.getFullYear()).length;

  return (
    <div className="min-h-screen bg-[#0B1426] text-white flex">
      {/* Ambient glows */}
      <div className="fixed -top-40 -left-40 h-[40rem] w-[40rem] rounded-full bg-[#D41B69]/10 blur-[150px] pointer-events-none" />
      <div className="fixed -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-[#F7A81B]/8 blur-[150px] pointer-events-none" />

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 border-r border-white/10 bg-white/5 backdrop-blur-2xl flex flex-col z-10 hidden lg:flex">
        <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 overflow-hidden">
            <Image src="/img/rsamdio.webp" alt="RSAMDIO" width={32} height={32} className="object-contain" style={{ width: "auto", height: "auto" }} />
          </div>
          <div>
            <div className="text-sm font-bold text-white">RSAMDIO</div>
            <div className="text-[10px] text-[#D41B69] font-bold uppercase tracking-wider">Secretariat</div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <div className="w-full text-left flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold bg-white/10 text-white">
            <CalendarDays className="h-4 w-4 text-[#D41B69]" />
            Events Manager
          </div>
        </nav>

        <div className="px-4 py-4 border-t border-white/10 flex flex-col gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0"></span>
            <span className="text-[10px] text-white/50 truncate font-semibold" title={userEmail}>
              {userEmail}
            </span>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white/50 hover:bg-white/10 hover:text-white transition"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0B1426]/80 backdrop-blur-xl shrink-0">
          <div>
            <h1 className="text-lg font-bold text-white uppercase tracking-wider" style={{ fontFamily: "General Sans, sans-serif" }}>
              Events Manager
            </h1>
            <p className="text-xs text-white/40">Manage public-facing events on rsamdio.org</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setEditTarget(null); setModal("add"); }}
              className="flex items-center gap-2 rounded-xl bg-[#D41B69] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#8A0F3E] transition shadow-lg shadow-[#D41B69]/20"
            >
              <Plus className="h-4 w-4" />
              Add Event
            </button>
            <button
              onClick={handleSignOut}
              className="flex lg:hidden p-2 rounded-full text-white/40 hover:text-white"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Events tab content */}
        <div className="flex-grow px-6 py-8">
          {/* Event Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-2 text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">
                <CalendarDays className="h-3.5 w-3.5" /> Total Events
              </div>
              <div className="text-3xl font-bold text-white">{events.length}</div>
            </div>
            <div className="rounded-2xl border border-[#D41B69]/20 bg-[#D41B69]/10 p-5">
              <div className="flex items-center gap-2 text-[#D41B69] text-xs font-semibold uppercase tracking-wider mb-2">
                <Clock className="h-3.5 w-3.5" /> Upcoming
              </div>
              <div className="text-3xl font-bold text-white">{upcomingEvents}</div>
            </div>
            <div className="rounded-2xl border border-[#F7A81B]/20 bg-[#F7A81B]/10 p-5 hidden sm:block">
              <div className="flex items-center gap-2 text-[#F7A81B] text-xs font-semibold uppercase tracking-wider mb-2">
                <CheckCircle className="h-3.5 w-3.5" /> Live on Site
              </div>
              <div className="text-3xl font-bold text-white">{events.length}</div>
            </div>
          </div>

          {/* Events list */}
          {loadingEvents ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-[#D41B69]" />
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-20 rounded-2xl border border-white/10 bg-white/5">
              <CalendarDays className="h-12 w-12 mx-auto mb-3 text-white/20" />
              <p className="text-white/40 text-sm">No events yet. Add your first one!</p>
              <button
                onClick={() => { setEditTarget(null); setModal("add"); }}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#D41B69] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#8A0F3E] transition"
              >
                <Plus className="h-4 w-4" /> Add Event
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 hover:bg-white/8 transition group"
                >
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`h-3 w-3 rounded-full ${catDot[ev.category] ?? catDot.pink}`} />
                    <div className="text-center min-w-[44px]">
                      <div className="text-xs font-bold text-white/80">{ev.month}</div>
                      <div className="text-[10px] text-white/40">{ev.year}</div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white text-sm truncate">{ev.title}</h4>
                    {ev.location && (
                      <p className="text-xs text-white/40 flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span className="truncate">{ev.location}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition shrink-0">
                    <button
                      onClick={() => { setEditTarget(ev); setModal("edit"); }}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(ev.id)}
                      disabled={deletingId === ev.id}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition disabled:opacity-40"
                    >
                      {deletingId === ev.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Events Modal */}
      {modal && (
        <EventModal
          event={modal === "edit" ? editTarget : null}
          onClose={() => { setModal(null); setEditTarget(null); }}
        />
      )}
    </div>
  );
}
