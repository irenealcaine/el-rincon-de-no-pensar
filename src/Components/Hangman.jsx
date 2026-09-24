import React, { useState } from "react";
import { FiFrown, FiRefreshCw, FiSmile } from "react-icons/fi";

const WORDS = [
  "casa",
  "perro",
  "gato",
  "sol",
  "luna",
  "arbol",
  "mariposa",
  "elefante",
  "jirafa",
  "planeta",
  "guitarra",
  "ventana",
  "montana",
  "rio",
  "playa",
  "libro",
  "computadora",
  "telefono",
  "chocolate",
  "helado",
  "futbol",
  "cine",
  "musica",
  "estrella",
  "corazon",
];

const ALPHABET = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
const MAX_GUESSES = 6;

const getRandomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];

const Hangman = () => {
  const [word, setWord] = useState(getRandomWord);
  const [guessed, setGuessed] = useState([]);
  const [wrong, setWrong] = useState(0);

  const normalized = word.toUpperCase();
  const letters = [...normalized.replace(/ /g, "")];
  const isWon = letters.every((l) => guessed.includes(l));
  const isLost = wrong >= MAX_GUESSES;
  const gameOver = isWon || isLost;

  const handleGuess = (letter) => {
    if (gameOver || guessed.includes(letter)) return;
    setGuessed((prev) => [...prev, letter]);
    if (!normalized.includes(letter)) {
      setWrong((w) => w + 1);
    }
  };

  const restart = () => {
    setWord(getRandomWord());
    setGuessed([]);
    setWrong(0);
  };

  const gallows = (
    <g stroke="#173a5e" strokeWidth="4" strokeLinecap="round" fill="none">
      <line x1="20" y1="140" x2="180" y2="140" />
      <line x1="55" y1="140" x2="55" y2="15" />
      <line x1="55" y1="15" x2="100" y2="15" />
      <line x1="100" y1="15" x2="100" y2="33" />
    </g>
  );

  const man = (
    <g stroke="#c96f3f" strokeWidth="4" strokeLinecap="round" fill="none">
      {wrong >= 1 && <circle cx="100" cy="45" r="12" />}
      {wrong >= 2 && <line x1="100" y1="57" x2="100" y2="95" />}
      {wrong >= 3 && <line x1="100" y1="67" x2="78" y2="85" />}
      {wrong >= 4 && <line x1="100" y1="67" x2="122" y2="85" />}
      {wrong >= 5 && <line x1="100" y1="95" x2="82" y2="125" />}
      {wrong >= 6 && <line x1="100" y1="95" x2="118" y2="125" />}
    </g>
  );

  const wrongLetters = guessed.filter((l) => !normalized.includes(l));

  return (
    <div className="pb-16">
      <section className="bg-white rounded-3xl shadow-lg p-4 md:p-8 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-black text-blue-900">El ahorcado</h2>
            <p className="text-sm text-blue-900/80">
              Adivina la palabra oculta. {MAX_GUESSES} fallos y se acabó.
            </p>
          </div>
          <button
            onClick={restart}
            className="inline-flex items-center gap-2 rounded-full border border-blue-900/10 bg-white/70 px-4 py-2 text-sm font-bold text-blue-900 transition hover:bg-white active:scale-95"
          >
            <FiRefreshCw />
            Reiniciar
          </button>
        </div>

        <svg viewBox="0 0 200 150" className="mx-auto h-40 w-56 md:h-44 md:w-64">
          {gallows}
          {man}
        </svg>

        <div className="mt-6 flex flex-wrap justify-center gap-1.5">
          {word.split("").map((char, i) => {
            const upper = char.toUpperCase();
            const isSpace = char === " ";
            const revealed = guessed.includes(upper);
            return (
              <span
                key={i}
                className={`flex h-11 w-8 md:h-12 md:w-10 items-center justify-center border-b-4 pb-1 text-2xl font-black md:text-3xl ${
                  isSpace
                    ? "w-5 border-transparent"
                    : revealed
                    ? "border-blue-800 text-blue-900"
                    : "border-blue-300"
                }`}
              >
                {revealed ? upper : ""}
              </span>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm font-bold">
          <span className="text-blue-900/80">
            Errores: {wrong}/{MAX_GUESSES}
          </span>
          {wrongLetters.length > 0 && (
            <span className="inline-flex flex-wrap gap-1.5">
              {wrongLetters.map((l) => (
                <span
                  key={l}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-red-700"
                >
                  {l}
                </span>
              ))}
            </span>
          )}
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-1.5">
          {ALPHABET.map((letter) => {
            const used = guessed.includes(letter);
            const correct = used && normalized.includes(letter);
            const bad = used && !normalized.includes(letter);
            return (
              <button
                key={letter}
                onClick={() => handleGuess(letter)}
                disabled={used || gameOver}
                className={`h-10 w-10 rounded-lg text-sm font-bold transition-all duration-200 ${
                  correct
                    ? "bg-emerald-500 text-white"
                    : bad
                    ? "bg-red-500 text-white"
                    : "border border-blue-900/10 bg-blue-50 text-blue-900 hover:bg-blue-100"
                } disabled:cursor-not-allowed disabled:opacity-70`}
              >
                {letter}
              </button>
            );
          })}
        </div>

        {gameOver && (
          <div
            className={`mt-6 rounded-2xl border p-5 text-center ${
              isWon
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            <p className="inline-flex items-center gap-2 text-2xl font-black">
              {isWon ? <FiSmile /> : <FiFrown />}
              {isWon ? "¡Has ganado!" : "¡Has perdido!"}
            </p>
            {!isWon && (
              <p className="mt-1 font-bold">
                La palabra era: {word.toUpperCase()}
              </p>
            )}
            <button
              onClick={restart}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-800 px-6 py-2.5 font-bold text-white transition hover:bg-blue-900 active:scale-95"
            >
              <FiRefreshCw />
              Jugar de nuevo
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Hangman;