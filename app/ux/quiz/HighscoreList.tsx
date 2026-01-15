"use client";
import { UserIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

type Entry = { name: string; score: number };

// Gruppiera deltagare efter poäng, men räkna plats 1, 2, 3 osv även om flera har samma poäng
function groupPlacementsConsecutive(scores: Entry[]) {
  const sorted = [...scores].sort((a, b) => b.score - a.score);
  const groups: { place: number; entries: Entry[] }[] = [];
  let prevScore: number | null = null;
  let currentGroup: Entry[] = [];
  let currentPlace = 1;

  sorted.forEach((entry, idx) => {
    if (entry.score !== prevScore) {
      // spara förra gruppen
      if (currentGroup.length) {
        groups.push({ place: currentPlace, entries: currentGroup });
        currentPlace += 1; // hoppa bara ETT steg i platsnummer, oavsett antal i förra gruppen
      }
      // ny grupp
      currentGroup = [entry];
      prevScore = entry.score;
    } else {
      // gemensam poäng – hör till nuvarande grupp
      currentGroup.push(entry);
    }
    // sista loopen
    if (idx === sorted.length - 1 && currentGroup.length) {
      groups.push({ place: currentPlace, entries: currentGroup });
    }
  });
  return groups;
}

const placeStyles = [
  "border-2 border-indigo-400 bg-indigo-50/70", // 1
  "border-2 border-violet-400 bg-violet-50/70", // 2
  "border-2 border-blue-300 bg-blue-50/70", // 3
];
const getPlaceStyle = (place: number) =>
  place <= 3 ? placeStyles[place - 1] : "border border-gray-200 bg-white/80";

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

  const groups = groupPlacementsConsecutive(scores);

  return (
    <section className="my-8 flex justify-center rounded-2xl border" aria-label="Highscore">
      <div
        className="glass-effect w-full max-w-md rounded-2xl border border-white/40 bg-white/30 p-6 shadow-2xl shadow-indigo-200 backdrop-blur-xl"
        style={{
          background:
            "linear-gradient(120deg,rgba(245,245,255,0.85) 30%,rgba(230,230,255,0.5) 100%)",
        }}
      >
        <h3 className="mb-4 text-center text-xl font-extrabold tracking-wide text-indigo-700 drop-shadow">
          Topplistan
        </h3>
        <div className="flex flex-col gap-4">
          {groups.map(({ place, entries }) => (
            <div
              key={place}
              className={`flex flex-col rounded-xl px-3 py-2 ${getPlaceStyle(place)}`}
            >
              <span className="mx-auto -mt-6 mb-2 flex h-12 w-12 items-center justify-center rounded-full border border-indigo-200 bg-white/80 text-2xl font-black text-indigo-600 shadow drop-shadow-md">
                {place}
              </span>
              {entries.map((entry) => (
                <div
                  key={entry.name + entry.score}
                  className="mb-1 flex items-center gap-3 last:mb-0"
                  style={{ minWidth: 180 }}
                >
                  <span className="rounded-full bg-indigo-100 p-1">
                    <UserIcon className="h-5 w-5 text-indigo-500" />
                  </span>
                  <span className="flex-1 truncate font-semibold">{entry.name}</span>
                  <span className="text-right font-bold drop-shadow">{entry.score} p</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
