"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { ref, onValue, push, set } from "firebase/database";
import { rtdb } from "@/lib/firebase";
import { Trophy, RotateCcw, Send, Loader2 } from "lucide-react";

type Board = number[][];
type Direction = "up" | "down" | "left" | "right";

const SIZE = 4;

function emptyBoard(): Board {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

function addRandomTile(board: Board): Board {
  const empties: [number, number][] = [];
  board.forEach((row, r) => row.forEach((cell, c) => { if (!cell) empties.push([r, c]); }));
  if (!empties.length) return board;
  const [r, c] = empties[Math.floor(Math.random() * empties.length)];
  const newBoard = board.map((row) => [...row]);
  newBoard[r][c] = Math.random() < 0.9 ? 2 : 4;
  return newBoard;
}

function initBoard(): Board {
  return addRandomTile(addRandomTile(emptyBoard()));
}

function slideRow(row: number[]): { row: number[]; score: number } {
  const filtered = row.filter(Boolean);
  let score = 0;
  for (let i = 0; i < filtered.length - 1; i++) {
    if (filtered[i] === filtered[i + 1]) {
      filtered[i] *= 2;
      score += filtered[i];
      filtered.splice(i + 1, 1);
    }
  }
  while (filtered.length < SIZE) filtered.push(0);
  return { row: filtered, score };
}

function move(board: Board, dir: Direction): { board: Board; score: number; moved: boolean } {
  let newBoard = board.map((r) => [...r]);
  let totalScore = 0;
  let moved = false;

  const processRows = (b: Board) =>
    b.map((row) => {
      const { row: newRow, score } = slideRow([...row]);
      totalScore += score;
      if (newRow.some((v, i) => v !== row[i])) moved = true;
      return newRow;
    });

  const rotate90 = (b: Board): Board =>
    Array.from({ length: SIZE }, (_, c) => Array.from({ length: SIZE }, (_, r) => b[SIZE - 1 - r][c]));

  const rotateN = (b: Board, n: number): Board => {
    let r = b;
    for (let i = 0; i < n; i++) r = rotate90(r);
    return r;
  };

  if (dir === "left") {
    newBoard = processRows(newBoard);
  } else if (dir === "right") {
    newBoard = processRows(newBoard.map((r) => [...r].reverse())).map((r) => [...r].reverse());
  } else if (dir === "up") {
    const rotated = processRows(rotateN(newBoard, 3));
    newBoard = rotateN(rotated, 1);
  } else {
    const rotated = processRows(rotateN(newBoard, 1));
    newBoard = rotateN(rotated, 3);
  }

  return { board: newBoard, score: totalScore, moved };
}

function isGameOver(board: Board): boolean {
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++) {
      if (!board[r][c]) return false;
      if (c + 1 < SIZE && board[r][c] === board[r][c + 1]) return false;
      if (r + 1 < SIZE && board[r][c] === board[r + 1][c]) return false;
    }
  return true;
}

const tileColors: Record<number, { bg: string; text: string }> = {
  0:    { bg: "bg-white/5",     text: "text-transparent" },
  2:    { bg: "bg-slate-700",   text: "text-white/80" },
  4:    { bg: "bg-slate-600",   text: "text-white/80" },
  8:    { bg: "bg-[#F7A81B]",   text: "text-[#0B1426]" },
  16:   { bg: "bg-orange-500",  text: "text-white" },
  32:   { bg: "bg-orange-600",  text: "text-white" },
  64:   { bg: "bg-red-500",     text: "text-white" },
  128:  { bg: "bg-[#D41B69]",   text: "text-white" },
  256:  { bg: "bg-[#8A0F3E]",   text: "text-white" },
  512:  { bg: "bg-purple-700",  text: "text-white" },
  1024: { bg: "bg-purple-900",  text: "text-white" },
  2048: { bg: "bg-gradient-to-br from-[#F7A81B] to-[#D41B69]", text: "text-white" },
};

function getTileStyle(val: number) {
  return tileColors[val] ?? { bg: "bg-indigo-900", text: "text-white" };
}

type Score = {
  name: string;
  phone: string;
  email: string;
  districtNumber: string;
  score: number;
  timestamp: number;
};

export function GameBoard() {
  const [board, setBoard] = useState<Board>(emptyBoard);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [scores, setScores] = useState<Score[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submitForm, setSubmitForm] = useState({ name: "", email: "", phone: "", district: "" });
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    setBoard(initBoard());
    const unsub = onValue(ref(rtdb, "scores"), (snap) => {
      if (!snap.exists()) return;
      const data = snap.val() as Record<string, Score>;
      const arr = Object.values(data).sort((a, b) => b.score - a.score).slice(0, 10);
      setScores(arr);
    });
    return unsub;
  }, []);

  const handleMove = useCallback((dir: Direction) => {
    if (gameOver) return;
    setBoard((prevBoard) => {
      const { board: newBoard, score: gained, moved } = move(prevBoard, dir);
      if (!moved) return prevBoard;
      setScore((s) => {
        const newScore = s + gained;
        setBest((b) => Math.max(b, newScore));
        return newScore;
      });
      const withTile = addRandomTile(newBoard);
      if (isGameOver(withTile)) setGameOver(true);
      return withTile;
    });
  }, [gameOver]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const map: Record<string, Direction> = {
        ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right",
        w: "up", s: "down", a: "left", d: "right",
      };
      const dir = map[e.key];
      if (dir) { e.preventDefault(); handleMove(dir); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleMove]);

  function onTouchStart(e: React.TouchEvent) {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > Math.abs(dy)) {
      handleMove(dx > 30 ? "right" : dx < -30 ? "left" : "right");
    } else {
      handleMove(dy > 30 ? "down" : dy < -30 ? "up" : "down");
    }
  }

  function restart() {
    setBoard(initBoard());
    setScore(0);
    setGameOver(false);
    setSubmitted(false);
    setShowModal(false);
  }

  async function submitScore() {
    if (!submitForm.name || !submitForm.email || !submitForm.phone || !submitForm.district || !score) return;
    setSubmitting(true);
    try {
      const newRef = push(ref(rtdb, "scores"));
      await set(newRef, {
        name: submitForm.name,
        phone: submitForm.phone,
        email: submitForm.email,
        districtNumber: submitForm.district,
        score,
        timestamp: Date.now(),
      });
      setSubmitted(true);
      setShowModal(false);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="game-challenge"
      className="relative py-24 px-5 sm:px-6 lg:px-8 bg-[#0B1426]"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#F7A81B]/10 blur-[120px]" />
        <div className="absolute left-0 bottom-0 h-72 w-72 rounded-full bg-[#D41B69]/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block rounded-full bg-[#F7A81B]/15 border border-[#F7A81B]/25 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#F7A81B] mb-4">
            Fun &amp; Engagement
          </span>
          <h2 className="text-4xl font-bold text-white" style={{ fontFamily: "General Sans, sans-serif" }}>
            2048 Challenge
          </h2>
          <p className="mt-3 text-white/55">
            Challenge the RSAMDIO community! Use arrow keys or swipe to play.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Game area */}
          <div className="flex-shrink-0">
            {/* Score bar */}
            <div className="flex items-center justify-between mb-4 gap-3">
              <div className="flex gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-center min-w-[80px]">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-0.5">Score</div>
                  <div className="text-xl font-bold text-white">{score}</div>
                </div>
                <div className="rounded-2xl border border-[#F7A81B]/25 bg-[#F7A81B]/10 px-5 py-3 text-center min-w-[80px]">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#F7A81B] mb-0.5">Best</div>
                  <div className="text-xl font-bold text-white">{best}</div>
                </div>
              </div>
              <button
                onClick={restart}
                className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-sm font-semibold text-white hover:bg-white/15 transition"
              >
                <RotateCcw className="h-4 w-4" /> New
              </button>
            </div>

            {/* Board */}
            <div
              className="relative rounded-2xl bg-[#131F35] border border-white/10 p-3 shadow-2xl select-none"
              style={{ width: 320, height: 320 }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)`, height: "100%" }}>
                {board.flat().map((val, i) => {
                  const { bg, text } = getTileStyle(val);
                  return (
                    <div
                      key={i}
                      className={`${bg} rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-100 ${text}`}
                      style={{ fontSize: val >= 1024 ? "12px" : val >= 100 ? "14px" : "16px" }}
                    >
                      {val || ""}
                    </div>
                  );
                })}
              </div>

              {/* Game over overlay */}
              {gameOver && (
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-[#0B1426]/90 backdrop-blur-sm gap-4">
                  <div className="text-2xl font-bold text-white">Game Over!</div>
                  <div className="text-[#F7A81B] font-bold text-lg">Score: {score}</div>
                  <div className="flex gap-3">
                    <button
                      onClick={restart}
                      className="rounded-xl bg-white/10 border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 transition"
                    >
                      <RotateCcw className="h-4 w-4 inline mr-1" /> Restart
                    </button>
                    {!submitted && (
                      <button
                        onClick={() => setShowModal(true)}
                        className="rounded-xl bg-[#D41B69] px-4 py-2 text-sm font-bold text-white hover:bg-[#8A0F3E] transition"
                      >
                        <Send className="h-4 w-4 inline mr-1" /> Submit Score
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Submit while playing */}
            {!gameOver && !submitted && score > 0 && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#D41B69]/15 border border-[#D41B69]/25 px-4 py-2 text-sm font-semibold text-[#D41B69] hover:bg-[#D41B69]/25 transition"
                >
                  <Send className="h-3.5 w-3.5" /> Submit Current Score
                </button>
              </div>
            )}
          </div>

          {/* Leaderboard */}
          <div className="flex-1 max-w-sm w-full">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-white/10">
                <Trophy className="h-4 w-4 text-[#F7A81B]" />
                <h3 className="font-bold text-white text-sm">Regional Leaderboard</h3>
              </div>
              {scores.length === 0 ? (
                <div className="py-10 text-center text-white/30 text-sm">
                  No scores yet — be the first!
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {scores.map((s, i) => (
                    <div key={i} className="flex items-center gap-3 px-5 py-3">
                      <span className={`text-sm font-bold w-5 text-center ${i === 0 ? "text-[#F7A81B]" : i === 1 ? "text-slate-300" : i === 2 ? "text-orange-400" : "text-white/30"}`}>
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white truncate">{s.name}</div>
                        {(s.districtNumber || (s as any).district) && (
                          <div className="text-[11px] text-white/35">
                            District {s.districtNumber || (s as any).district}
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-bold text-[#F7A81B]">{s.score.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Score Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl border border-white/15 bg-[#131F35] p-7 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-1">Submit Your Score</h3>
            <p className="text-sm text-white/40 mb-6">Score: <span className="text-[#F7A81B] font-bold">{score}</span></p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={submitForm.name}
                onChange={(e) => setSubmitForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-[#D41B69]/50 transition"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={submitForm.email}
                onChange={(e) => setSubmitForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-[#D41B69]/50 transition"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="tel"
                  placeholder="Phone"
                  required
                  value={submitForm.phone}
                  onChange={(e) => setSubmitForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-[#D41B69]/50 transition"
                />
                <input
                  type="text"
                  placeholder="District (e.g. 3150)"
                  required
                  value={submitForm.district}
                  onChange={(e) => setSubmitForm((f) => ({ ...f, district: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-[#D41B69]/50 transition"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                Cancel
              </button>
              <button
                onClick={submitScore}
                disabled={submitting || !submitForm.name || !submitForm.email || !submitForm.phone || !submitForm.district}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#D41B69] py-3 text-sm font-bold text-white hover:bg-[#8A0F3E] transition disabled:opacity-50"
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {submitting ? "Saving…" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
