import React, { useState, useEffect, useCallback } from "react";
import Toast from "./Toast";
import useToast from "../Hooks/useToast";
import WordleWords from "../data/WordleWords";
import { FiCornerDownLeft, FiDelete } from "react-icons/fi";

const MAX_ATTEMPTS = 6;
const WORD_LENGTH = 5;
const STORAGE_KEY = "wordleStats";

const ALPHABET = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"],
];

const loadStats = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored
      ? JSON.parse(stored)
      : { played: 0, wins: 0, streak: 0, bestStreak: 0 };
  } catch {
    return { played: 0, wins: 0, streak: 0, bestStreak: 0 };
  }
};

const pickWord = () =>
  WordleWords[Math.floor(Math.random() * WordleWords.length)];

const evaluate = (guess, answer) => {
  guess = guess.toUpperCase();
  answer = answer.toUpperCase();
  const results = ["absent", "absent", "absent", "absent", "absent"];
  const counts = {};
  for (const ch of answer) counts[ch] = (counts[ch] || 0) + 1;

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guess[i] === answer[i]) {
      results[i] = "correct";
      counts[guess[i]]--;
    }
  }
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (results[i] === "correct") continue;
    if (counts[guess[i]] > 0) {
      results[i] = "present";
      counts[guess[i]]--;
    }
  }
  return results;
};

const cellStateClass = {
  correct: "bg-emerald-500 text-white",
  present: "bg-amber-400 text-white",
  absent: "bg-blue-900/70 text-white",
};

const keyboardStateClass = {
  correct: "bg-emerald-500 text-white",
  present: "bg-amber-400 text-white",
  absent: "bg-blue-900/40 text-white",
};

const Wordle = () => {
  const [answer, setAnswer] = useState(pickWord);
  const [submitted, setSubmitted] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [letterStates, setLetterStates] = useState({});
  const [status, setStatus] = useState("playing");
  const [shake, setShake] = useState(false);
  const [stats, setStats] = useState(loadStats);
  const { toasts, showToast, dismiss } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch {
      // localStorage no disponible (modo privado, etc.)
    }
  }, [stats]);

  const updateStats = (win, attempts) => {
    setStats((prev) => {
      const streak = win ? prev.streak + 1 : 0;
      return {
        played: prev.played + 1,
        wins: prev.wins + (win ? 1 : 0),
        streak,
        bestStreak: Math.max(prev.bestStreak, streak),
      };
    });
  };

  const submitGuess = useCallback(() => {
    if (status !== "playing") return;
    if (currentGuess.length !== WORD_LENGTH) {
      setShake(true);
      setTimeout(() => setShake(false), 450);
      showToast("La palabra tiene que tener 5 letras", "error");
      return;
    }

    const results = evaluate(currentGuess, answer);
    const nextSubmitted = [...submitted, { guess: currentGuess, results }];
    setSubmitted(nextSubmitted);

    const nextStates = { ...letterStates };
    const rank = { correct: 3, present: 2, absent: 1 };
    currentGuess.split("").forEach((letter, i) => {
      if (!nextStates[letter] || rank[results[i]] > rank[nextStates[letter]]) {
        nextStates[letter] = results[i];
      }
    });
    setLetterStates(nextStates);
    setCurrentGuess("");

    if (currentGuess.toUpperCase() === answer.toUpperCase()) {
      setStatus("won");
      updateStats(true, nextSubmitted.length);
    } else if (nextSubmitted.length === MAX_ATTEMPTS) {
      setStatus("lost");
      updateStats(false, MAX_ATTEMPTS);
    }
  }, [status, currentGuess, answer, submitted, letterStates, showToast]);

  useEffect(() => {
    if (status !== "playing") return;
    const onKey = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        submitGuess();
      } else if (e.key === "Backspace") {
        e.preventDefault();
        setCurrentGuess((g) => g.slice(0, -1));
      } else {
        const key = e.key
          .toUpperCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        if (ALPHABET.includes(key)) {
          setCurrentGuess((g) => (g.length < WORD_LENGTH ? g + key : g));
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [status, submitGuess]);

  const reset = () => {
    setAnswer(pickWord());
    setSubmitted([]);
    setCurrentGuess("");
    setLetterStates({});
    setStatus("playing");
    setShake(false);
  };

  const rows = Array.from({ length: MAX_ATTEMPTS }, (_, i) => i);

  const keyClass = (letter) => {
    const state = letterStates[letter];
    return state ? keyboardStateClass[state] : "";
  };

  const renderCell = (rowIndex, colIndex) => {
    const submittedRow = submitted[rowIndex];
    const isCurrentRow = rowIndex === submitted.length;

    if (submittedRow) {
      const state = submittedRow.results[colIndex];
      return (
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-lg text-xl font-black animate-flip ${
            cellStateClass[state]
          }`}
          style={{ animationDelay: `${colIndex * 90}ms` }}
        >
          {submittedRow.guess[colIndex]}
        </span>
      );
    }

    if (isCurrentRow) {
      const letter = currentGuess[colIndex] || "";
      return (
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-lg border-2 text-xl font-black ${
            letter
              ? "border-blue-400 bg-white text-blue-900"
              : "border-blue-200 bg-white text-blue-900"
          }`}
        >
          {letter}
        </span>
      );
    }

    return (
      <span className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-blue-100 bg-white" />
    );
  };

  const statsChips = [
    { label: "Jugadas", value: stats.played },
    { label: "Ganadas", value: stats.wins },
    { label: "Racha", value: stats.streak },
    { label: "Mejor", value: stats.bestStreak },
  ];

  return (
    <div className="pb-16">
      <section className="bg-white rounded-3xl shadow-lg p-4 md:p-8 max-w-2xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <h2 className="text-xl font-black text-blue-900">Wordle</h2>
          <div className="flex flex-wrap gap-2">
            {statsChips.map((chip) => (
              <span
                key={chip.label}
                className="rounded-full border border-blue-900/10 bg-blue-50 px-3 py-1 text-center"
              >
                <span className="block text-[10px] font-bold uppercase text-blue-900/70">
                  {chip.label}
                </span>
                <span className="font-mono font-black text-blue-900">
                  {chip.value}
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <div
            className={`flex flex-col gap-1.5 ${
              shake ? "animate-shake" : ""
            }`}
          >
            {rows.map((rowIndex) => (
              <div key={rowIndex} className="flex gap-1.5">
                {[0, 1, 2, 3, 4].map((colIndex) =>
                  renderCell(rowIndex, colIndex)
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-1.5">
          {KEYBOARD_ROWS.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex justify-center gap-1"
            >
              {row.map((key) => {
                if (key === "ENTER") {
                  return (
                    <button
                      key={key}
                      onClick={submitGuess}
                      aria-label="Enviar intento"
                      className="flex h-12 items-center justify-center rounded-lg bg-blue-200 px-2 text-xs font-black text-blue-900 transition hover:bg-blue-300 active:scale-95"
                    >
                      <FiCornerDownLeft />
                    </button>
                  );
                }
                if (key === "BACK") {
                  return (
                    <button
                      key={key}
                      onClick={() =>
                        setCurrentGuess((g) => g.slice(0, -1))
                      }
                      aria-label="Borrar letra"
                      className="flex h-12 items-center justify-center rounded-lg bg-blue-200 px-2 text-xs font-black text-blue-900 transition hover:bg-blue-300 active:scale-95"
                    >
                      <FiDelete />
                    </button>
                  );
                }
                return (
                  <button
                    key={key}
                    onClick={() =>
                      setCurrentGuess((g) =>
                        g.length < WORD_LENGTH ? g + key : g
                      )
                    }
                    className={`flex h-12 w-9 items-center justify-center rounded-lg text-sm font-black transition active:scale-95 md:w-10 ${keyClass(
                      key
                    )} ${
                      letterStates[key]
                        ? ""
                        : "bg-blue-50 text-blue-900 hover:bg-blue-100"
                    }`}
                  >
                    {key}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {status !== "playing" && (
          <div
            className={`mt-6 rounded-2xl border p-5 text-center ${
              status === "won"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            <p className="text-2xl font-black">
              {status === "won"
                ? `¡Ganaste en ${submitted.length} ${
                    submitted.length === 1 ? "intento" : "intentos"
                  }!`
                : "¡Perdiste!"}
            </p>
            {status === "lost" && (
              <p className="mt-1 font-bold">
                La palabra era: {answer.toUpperCase()}
              </p>
            )}
            <button
              onClick={reset}
              className="mt-4 rounded-full bg-blue-800 px-6 py-2.5 font-bold text-white transition hover:bg-blue-900 active:scale-95"
            >
              Otra palabra
            </button>
          </div>
        )}
      </section>

      <Toast toasts={toasts} onDismiss={dismiss} />
    </div>
  );
};

export default Wordle;