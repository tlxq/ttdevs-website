"use client";
import { ArrowPathIcon, TrophyIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import type { QuizQuestion } from "./quizData";

type Props = {
  userName: string;
  answers: number[];
  questions: QuizQuestion[];
  onRestart: () => void;
};

export default function QuizResult({ userName, answers, questions, onRestart }: Props) {
  const [showDetails, setShowDetails] = useState(false);
  const correctCount = answers.reduce(
    (sum, ans, i) => sum + (questions[i]?.correctIndex === ans ? 1 : 0),
    0
  );
  const hasPostedRef = useRef(false);

  useEffect(() => {
    if (userName && !hasPostedRef.current) {
      hasPostedRef.current = true;
      fetch("/api/highscore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: userName, score: correctCount }),
      });
    }
  }, [userName, correctCount]);

  return (
    <section className="flex min-h-[60vh] w-full items-center justify-center py-8">
      <div
        className="relative flex max-h-[80vh] min-h-[420px] w-full max-w-md flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/50 p-6 shadow-2xl shadow-indigo-100 backdrop-blur-md"
        style={{
          background:
            "linear-gradient(120deg,rgba(245,245,255,0.90) 35%,rgba(180,185,255,0.37) 100%)",
        }}
      >
        <div className="mb-2 flex w-full flex-shrink-0 flex-col items-center">
          <div className="mb-5 flex w-full items-center justify-center gap-2 text-center">
            <TrophyIcon className="h-8 w-8 text-indigo-400 drop-shadow" />
            <h2 className="text-2xl font-extrabold tracking-widest text-indigo-700 drop-shadow">
              RESULTAT
            </h2>
          </div>
          <p className="mb-5 w-full text-center text-lg font-medium text-gray-700">
            Bra jobbat, <span className="font-semibold text-indigo-800">{userName}</span>!
            <br />
            <span className="inline-block animate-bounce text-3xl font-extrabold text-indigo-700">
              {correctCount}
            </span>
            <span className="text-gray-900"> av {questions.length} rätt</span>
          </p>
          <div className="flex w-full flex-grow flex-col items-center">
            <button
              onClick={() => setShowDetails((d) => !d)}
              className="mb-4 rounded-full bg-indigo-50 px-6 py-2 font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-100 hover:underline focus:ring focus:outline-none"
            >
              {showDetails ? "Dölj frågor & svar" : "Visa frågor & svar"}
            </button>
            {showDetails && (
              <ul className="mt-2 mb-4 max-h-[32vh] w-full flex-1 overflow-y-auto pr-2">
                {questions.map((q, i) => {
                  const isCorrect = answers[i] === q.correctIndex;
                  return (
                    <li
                      key={q.id}
                      className={
                        `mb-3 rounded-xl border-2 bg-white/90 px-4 py-3 shadow ` +
                        (isCorrect ? "border-green-300" : "border-red-200")
                      }
                    >
                      <div className="font-semibold text-gray-900">{q.question}</div>
                      <div className="mt-2 flex flex-col gap-0.5 text-[15px]">
                        <span
                          className={
                            isCorrect
                              ? "font-semibold text-green-700"
                              : "font-semibold text-red-700"
                          }
                        >
                          Ditt svar:{" "}
                          <span className="break-words">{q.options[answers[i]] ?? <em>—</em>}</span>
                        </span>
                        {!isCorrect && (
                          <span className="block text-green-600">
                            Rätt svar:{" "}
                            <span className="font-bold">{q.options[q.correctIndex]}</span>
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
        {/* Fixera knappen i botten av kortet */}
        <div className="absolute right-0 bottom-6 left-0 flex w-full justify-center">
          <button
            onClick={onRestart}
            className="flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-2 text-lg font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
          >
            <ArrowPathIcon className="mr-1 h-5 w-5 text-white opacity-90" />
            Starta om quizet
          </button>
        </div>
      </div>
    </section>
  );
}
