"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  collection, onSnapshot, deleteDoc, doc,
} from "firebase/firestore";
import { ref, onValue } from "firebase/database";
import { db, rtdb } from "@/lib/firebase";
import { onAuthChanged, signOut } from "@/lib/auth";
import { type Event } from "@/components/EventsSection";
import { EventModal } from "@/components/admin/EventModal";
import {
  Plus, Pencil, Trash2, LogOut, CalendarDays,
  Loader2, MapPin, CheckCircle, Clock, Mail,
  Gamepad2, Download, Trophy, Users, Activity,
  Search,
} from "lucide-react";
import Image from "next/image";

type WaitlistEntry = {
  id: string;
  name?: string;
  email: string;
  phone?: string;
  district?: string;
  timestamp: number;
};

type ScoreEntry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  districtNumber?: string;
  district?: string;
  score: number;
  timestamp: number;
};

const catDot: Record<Event["category"], string> = {
  pink: "bg-[#D41B69]",
  gold: "bg-[#F7A81B]",
  blue: "bg-blue-500",
};

function formatDate(ts: any) {
  if (!ts) return "—";
  const d = new Date(ts);
  return d.toLocaleDateString() + " " + d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function AdminDashboard() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [activeTab, setActiveTab] = useState<"events" | "waitlist" | "scores">("events");
  const [userEmail, setUserEmail] = useState("");

  // Events state
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editTarget, setEditTarget] = useState<Event | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Waitlist state
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [loadingWaitlist, setLoadingWaitlist] = useState(true);
  const [waitlistSearch, setWaitlistSearch] = useState("");

  // Scores state
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [loadingScores, setLoadingScores] = useState(true);
  const [scoresSearch, setScoresSearch] = useState("");

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

  // RTDB waitlist listener
  useEffect(() => {
    if (!authChecked) return;
    const waitlistRef = ref(rtdb, "waitlist");
    const unsub = onValue(waitlistRef, (snap) => {
      if (snap.exists()) {
        const data = snap.val();
        const arr = Object.entries(data).map(([id, val]: [string, any]) => ({
          id,
          ...val,
        }));
        arr.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        setWaitlist(arr);
      } else {
        setWaitlist([]);
      }
      setLoadingWaitlist(false);
    });
    return () => unsub();
  }, [authChecked]);

  // RTDB scores listener
  useEffect(() => {
    if (!authChecked) return;
    const scoresRef = ref(rtdb, "scores");
    const unsub = onValue(scoresRef, (snap) => {
      if (snap.exists()) {
        const data = snap.val();
        const arr = Object.entries(data).map(([id, val]: [string, any]) => ({
          id,
          ...val,
        }));
        arr.sort((a, b) => (b.score || 0) - (a.score || 0));
        setScores(arr);
      } else {
        setScores([]);
      }
      setLoadingScores(false);
    });
    return () => unsub();
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

  // Export CSV functions
  function exportWaitlistCsv() {
    if (!waitlist.length) return;
    const headers = ["#", "Name", "Email", "Phone", "District", "Date Registered"];
    const rows = waitlist.map((r, i) => [
      i + 1,
      r.name || "—",
      r.email,
      r.phone || "—",
      r.district || "—",
      formatDate(r.timestamp),
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `waitlist_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function exportScoresCsv() {
    if (!scores.length) return;
    const headers = ["Rank", "Name", "Email", "Phone", "District", "Score", "Date Submitted"];
    const rows = scores.map((r, i) => [
      i + 1,
      r.name || "—",
      r.email,
      r.phone || "—",
      r.districtNumber || r.district || "—",
      r.score,
      formatDate(r.timestamp),
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `scores_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#0B1426] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#D41B69]" />
      </div>
    );
  }

  // Analytics Metrics
  const now = new Date();
  const upcomingEvents = events.filter((e) => parseInt(e.year) >= now.getFullYear()).length;

  const totalScores = scores.length;
  const highHighScore = totalScores ? Math.max(...scores.map((s) => s.score)) : 0;
  const averageScore = totalScores ? Math.round(scores.reduce((acc, s) => acc + s.score, 0) / totalScores) : 0;

  // Filtered lists
  const filteredWaitlist = waitlist.filter((r) =>
    [r.name, r.email, r.district].some((field) => field?.toLowerCase().includes(waitlistSearch.toLowerCase()))
  );

  const filteredScores = scores.filter((s) =>
    [s.name, s.email, s.districtNumber, s.district].some((field) =>
      field?.toLowerCase().includes(scoresSearch.toLowerCase())
    )
  );

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
          <button
            onClick={() => setActiveTab("events")}
            className={`w-full text-left flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
              activeTab === "events" ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/5 hover:text-white"
            }`}
          >
            <CalendarDays className="h-4 w-4 text-[#D41B69]" />
            Events Manager
          </button>
          <button
            onClick={() => setActiveTab("waitlist")}
            className={`w-full text-left flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
              activeTab === "waitlist" ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Mail className="h-4 w-4 text-[#F7A81B]" />
            Waitlist Signups
          </button>
          <button
            onClick={() => setActiveTab("scores")}
            className={`w-full text-left flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
              activeTab === "scores" ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Gamepad2 className="h-4 w-4 text-blue-500" />
            2048 Leaderboard
          </button>
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
              {activeTab === "events" && "Events Manager"}
              {activeTab === "waitlist" && "Waitlist Signups"}
              {activeTab === "scores" && "2048 Challenge Leaderboard"}
            </h1>
            <p className="text-xs text-white/40">
              {activeTab === "events" && "Manage public-facing events on rsamdio.org"}
              {activeTab === "waitlist" && "Oversee regional Secretariat notifications list"}
              {activeTab === "scores" && "View high scores from the community 2048 portal"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {activeTab === "events" && (
              <button
                onClick={() => { setEditTarget(null); setModal("add"); }}
                className="flex items-center gap-2 rounded-xl bg-[#D41B69] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#8A0F3E] transition shadow-lg shadow-[#D41B69]/20"
              >
                <Plus className="h-4 w-4" />
                Add Event
              </button>
            )}
            {activeTab === "waitlist" && waitlist.length > 0 && (
              <button
                onClick={exportWaitlistCsv}
                className="flex items-center gap-2 rounded-xl bg-[#D41B69] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#8A0F3E] transition shadow-lg shadow-[#D41B69]/20"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </button>
            )}
            {activeTab === "scores" && scores.length > 0 && (
              <button
                onClick={exportScoresCsv}
                className="flex items-center gap-2 rounded-xl bg-[#D41B69] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#8A0F3E] transition shadow-lg shadow-[#D41B69]/20"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </button>
            )}
            {/* Mobile menu anchors */}
            <div className="flex lg:hidden gap-1 bg-white/5 border border-white/10 rounded-full p-1">
              <button
                onClick={() => setActiveTab("events")}
                className={`p-2 rounded-full transition ${activeTab === "events" ? "bg-[#D41B69] text-white" : "text-white/40"}`}
                title="Events"
              >
                <CalendarDays className="h-4 w-4" />
              </button>
              <button
                onClick={() => setActiveTab("waitlist")}
                className={`p-2 rounded-full transition ${activeTab === "waitlist" ? "bg-[#F7A81B] text-white" : "text-white/40"}`}
                title="Waitlist"
              >
                <Mail className="h-4 w-4" />
              </button>
              <button
                onClick={() => setActiveTab("scores")}
                className={`p-2 rounded-full transition ${activeTab === "scores" ? "bg-blue-500 text-white" : "text-white/40"}`}
                title="Leaderboard"
              >
                <Gamepad2 className="h-4 w-4" />
              </button>
              <button
                onClick={handleSignOut}
                className="p-2 rounded-full text-white/40 hover:text-white"
                title="Sign Out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Inner Tab View */}
        <div className="flex-grow px-6 py-8">
          {/* TAB 1: EVENTS MANAGER */}
          {activeTab === "events" && (
            <div>
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
          )}

          {/* TAB 2: WAITLIST SIGNUPS */}
          {activeTab === "waitlist" && (
            <div>
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-2xl">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-[#F7A81B]/15 text-[#F7A81B] flex items-center justify-center shrink-0">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-0.5">
                      Total Registered Emails
                    </div>
                    <div className="text-3xl font-bold text-white">{waitlist.length}</div>
                  </div>
                </div>
              </div>

              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                  <input
                    type="text"
                    placeholder="Search by name, email, or district..."
                    value={waitlistSearch}
                    onChange={(e) => setWaitlistSearch(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#F7A81B]/40 transition"
                  />
                </div>
              </div>

              {/* Table */}
              {loadingWaitlist ? (
                <div className="flex justify-center py-16">
                  <Loader2 className="h-8 w-8 animate-spin text-[#F7A81B]" />
                </div>
              ) : filteredWaitlist.length === 0 ? (
                <div className="text-center py-16 rounded-2xl border border-white/10 bg-white/5">
                  <Mail className="h-12 w-12 mx-auto mb-3 text-white/20" />
                  <p className="text-white/40 text-sm">No waitlist signups found.</p>
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden backdrop-blur-2xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/5 text-[11px] font-bold text-white/40 uppercase tracking-wider">
                          <th className="py-3 px-5">#</th>
                          <th className="py-3 px-5">Name</th>
                          <th className="py-3 px-5">Email Address</th>
                          <th className="py-3 px-5">Phone</th>
                          <th className="py-3 px-5">District</th>
                          <th className="py-3 px-5 text-right">Date Joined</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-sm">
                        {filteredWaitlist.map((r, i) => (
                          <tr key={r.id} className="hover:bg-white/8 transition-colors">
                            <td className="py-3.5 px-5 text-white/40 font-bold">{i + 1}</td>
                            <td className="py-3.5 px-5 font-bold text-white">{r.name || "—"}</td>
                            <td className="py-3.5 px-5 text-white/70 font-semibold">{r.email}</td>
                            <td className="py-3.5 px-5 text-white/50">{r.phone || "—"}</td>
                            <td className="py-3.5 px-5">
                              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-bold text-xs text-[#F7A81B]">
                                {r.district || "—"}
                              </span>
                            </td>
                            <td className="py-3.5 px-5 text-right text-white/40">{formatDate(r.timestamp)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: GAME LEADERBOARD */}
          {activeTab === "scores" && (
            <div>
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
                    <Gamepad2 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-white/40 uppercase tracking-wider mb-0.5">
                      Submissions
                    </div>
                    <div className="text-2xl font-bold text-white">{scores.length}</div>
                  </div>
                </div>
                <div className="rounded-2xl border border-[#D41B69]/20 bg-[#D41B69]/10 p-5 flex items-center gap-4 shadow-glow-pink">
                  <div className="h-10 w-10 rounded-xl bg-[#D41B69]/15 text-[#D41B69] flex items-center justify-center shrink-0">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-[#D41B69] uppercase tracking-wider mb-0.5">
                      High Score
                    </div>
                    <div className="text-2xl font-bold text-white">{highHighScore.toLocaleString()}</div>
                  </div>
                </div>
                <div className="rounded-2xl border border-[#F7A81B]/20 bg-[#F7A81B]/10 p-5 flex items-center gap-4 hidden sm:flex">
                  <div className="h-10 w-10 rounded-xl bg-[#F7A81B]/15 text-[#F7A81B] flex items-center justify-center shrink-0">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-[#F7A81B] uppercase tracking-wider mb-0.5">
                      Avg Score
                    </div>
                    <div className="text-2xl font-bold text-white">{averageScore.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                  <input
                    type="text"
                    placeholder="Search by player, email, or district..."
                    value={scoresSearch}
                    onChange={(e) => setScoresSearch(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition"
                  />
                </div>
              </div>

              {/* Table */}
              {loadingScores ? (
                <div className="flex justify-center py-16">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                </div>
              ) : filteredScores.length === 0 ? (
                <div className="text-center py-16 rounded-2xl border border-white/10 bg-white/5">
                  <Trophy className="h-12 w-12 mx-auto mb-3 text-white/20" />
                  <p className="text-white/40 text-sm">No game scores found.</p>
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden backdrop-blur-2xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/5 text-[11px] font-bold text-white/40 uppercase tracking-wider">
                          <th className="py-3 px-5">Rank</th>
                          <th className="py-3 px-5">Player</th>
                          <th className="py-3 px-5">Email</th>
                          <th className="py-3 px-5">Phone</th>
                          <th className="py-3 px-5">District</th>
                          <th className="py-3 px-5 text-right">Score</th>
                          <th className="py-3 px-5 text-right">Submitted</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-sm">
                        {filteredScores.map((s, i) => (
                          <tr key={s.id} className="hover:bg-white/8 transition-colors">
                            <td className="py-3.5 px-5">
                              <span className={`font-bold ${
                                i === 0 ? "text-[#F7A81B] text-base" : i === 1 ? "text-slate-300 font-bold" : i === 2 ? "text-orange-400" : "text-white/30"
                              }`}>
                                #{i + 1}
                              </span>
                            </td>
                            <td className="py-3.5 px-5 font-bold text-white">{s.name || "—"}</td>
                            <td className="py-3.5 px-5 text-white/70 font-semibold">{s.email}</td>
                            <td className="py-3.5 px-5 text-white/50">{s.phone || "—"}</td>
                            <td className="py-3.5 px-5">
                              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-bold text-xs text-blue-400">
                                {s.districtNumber || s.district || "—"}
                              </span>
                            </td>
                            <td className="py-3.5 px-5 text-right font-extrabold text-[#D41B69] text-base">
                              {s.score.toLocaleString()}
                            </td>
                            <td className="py-3.5 px-5 text-right text-white/40">{formatDate(s.timestamp)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
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

