"use client";
import { useState } from "react";
import HighscoreList from "./HighscoreList";
import QuizResult from "./QuizResult";
import { getRandomQuizQuestions, QuizQuestion } from "./quizData";

export default function Quiz() {
  const [step, setStep] = useState<"start" | "quiz" | "result">("start");
  const [userName, setUserName] = useState("");
  const [answers, setAnswers] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);

  // Start quiz: slumpar fram 10 frågor
  function handleStart() {
    if (userName.trim()) {
      setQuizQuestions(getRandomQuizQuestions(10));
      setAnswers([]);
      setCurrent(0);
      setStep("quiz");
    }
  }

  // Svara på fråga
  function handleAnswer(idx: number) {
    setAnswers((prev) => [...prev, idx]);
    if (current + 1 < quizQuestions.length) {
      setCurrent(current + 1);
    } else {
      setStep("result");
    }
  }

  // Starta om quizet
  function handleRestart() {
    setStep("start");
    setUserName("");
    setAnswers([]);
    setCurrent(0);
    setQuizQuestions([]);
  }

  // Visa start
  if (step === "start") {
    return (
      <div className="mx-auto flex max-w-md flex-col gap-2 p-4">
        <h2 className="mb-3 text-center text-xl font-bold">UX Quiz</h2>
        <input
          type="text"
          placeholder="Vad heter du?"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="mb-3 w-full rounded border px-2 py-1"
        />
        <button
          className="rounded bg-indigo-600 px-4 py-2 text-white disabled:bg-gray-300"
          disabled={!userName.trim()}
          onClick={handleStart}
        >
          Starta quiz
        </button>
        <HighscoreList />
      </div>
    );
  }

  // Visa respektive fråga
  if (step === "quiz" && quizQuestions.length > 0) {
    const q = quizQuestions[current];
    return (
      <div className="mx-auto max-w-md p-4">
        <h3 className="mb-2 text-lg font-semibold">
          Fråga {current + 1} av {quizQuestions.length}
        </h3>
        <div className="mb-5">{q.question}</div>
        <div className="space-y-2">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              className="mb-1 w-full rounded border px-3 py-2 text-left hover:bg-indigo-50"
              onClick={() => handleAnswer(idx)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Resultat-vy
  if (step === "result" && quizQuestions.length > 0) {
    return (
      <QuizResult
        userName={userName}
        answers={answers}
        questions={quizQuestions}
        onRestart={handleRestart}
      />
    );
  }

  return null;
}
