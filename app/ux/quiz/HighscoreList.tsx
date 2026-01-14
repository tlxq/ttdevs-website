"use client";
import { UserIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

type Entry = { name: string; score: number };

// Blå/lila accent för topp 3 (utan guld/orange)
const placeStyles = [
  "bg-indigo-500/60 text-white backdrop-blur-lg shadow-indigo-300", // 1st
  "bg-violet-500/60 text-white backdrop-blur-lg shadow-violet-300", // 2nd
  "bg-blue-400/60 text-white backdrop-blur-lg shadow-blue-300", // 3rd
];

export default function HighscoreList() {
  const [scores, setScores] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/highscore")
      .then((res) => res.json())
      .then(setScores)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="mb-3 text-sm text-gray-500 italic">Laddar highscore ...</div>;
  if (!scores.length)
    return (
      <div className="mb-3 text-sm text-gray-500 italic">Ingen spelare har gjort quizet än.</div>
    );

  return (
    <section className="my-8 flex justify-center rounded-2xl border" aria-label="Highscore">
      <div
        className="glass-effect w-full max-w-md rounded-2xl border border-white/40 bg-white/30 p-6 shadow-2xl shadow-indigo-200 backdrop-blur-xl"
        style={{
          // Extra glassiness for browsers w/o Tailwind's backdrop classes
          background:
            "linear-gradient(120deg,rgba(245,245,255,0.85) 30%,rgba(230,230,255,0.5) 100%)",
        }}
      >
        <h3 className="mb-4 text-center text-xl font-extrabold tracking-wide text-indigo-700 drop-shadow">
          Topplistan
        </h3>
        <ol className="space-y-2">
          {scores.map((s, i) => (
            <li
              key={i}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${i < 3 ? placeStyles[i] + " font-bold shadow-md" : "bg-white/60"} border border-white/50 transition`}
            >
              <span className="w-8 text-right text-xl font-bold tabular-nums select-none">
                {i + 1}
              </span>
              <span className="rounded-full bg-indigo-100 p-1">
                <UserIcon className="h-5 w-5 text-indigo-500" />
              </span>
              <span className="flex-1 truncate">{s.name}</span>
              <span className="text-right font-bold drop-shadow">{s.score} p</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
