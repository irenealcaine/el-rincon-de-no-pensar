import React, { useState, useEffect, useRef, useCallback } from "react";
import { FiRotateCcw, FiZap } from "react-icons/fi";

const BEST_KEY = "typingBestWpm";

const WORDS_POOL = [
  "casa", "perro", "gato", "sol", "luna", "mar", "cielo", "playa", "montana",
  "rio", "arbol", "flor", "viento", "nube", "agua", "fuego", "tierra", "hoja",
  "rama", "fruta", "verdura", "pan", "leche", "huevo", "queso", "carne",
  "pescado", "arroz", "tomate", "cebolla", "ajo", "sal", "azucar", "aceite",
  "harina", "maiz", "trigo", "manzana", "pera", "uva", "naranja", "limon",
  "platano", "fresa", "sandia", "mango", "coco", "nuez", "almendra", "cafe",
  "chocolate", "galleta", "pastel", "dulce", "sopa", "ensalada", "salsa",
  "pasta", "pizza", "tortilla", "taco", "chile", "pimiento", "zanahoria",
  "papas", "espinaca", "brocoli", "aguacate", "pepino", "calabaza", "elote",
  "garbanzo", "lenteja", "canela", "vainilla", "miel", "menta", "albahaca",
  "laurel", "comino", "oregano", "tomillo", "romero", "perejil", "cilantro",
  "haba", "remolacha", "berenjena", "guayaba", "papaya", "granada", "higo",
  "datil", "ciruela", "cereza", "frambuesa", "pomelo", "lima", "mandarina",
  "pina", "camino", "bosque", "valle", "campo", "pradera", "costa", "isla",
  "desierto", "volcan", "glaciar", "selva", "sabana", "cueva", "cascada",
  "laguna", "pantano", "estrella", "planeta", "galaxia", "cometa", "eclipse",
];

const LEVELS = {
  easy: { label: "Fácil", words: 10 },
  medium: { label: "Medio", words: 16 },
  hard: { label: "Difícil", words: 22 },
};

const buildText = (level) => {
  const count = LEVELS[level].words;
  const words = Array.from(
    { length: count },
    () => WORDS_POOL[Math.floor(Math.random() * WORDS_POOL.length)]
  );

  let text = words.join(" ");

  if (level === "hard") {
    const commaPositions = new Set();
    const n = Math.floor(words.length / 3);
    while (commaPositions.size < n) {
      commaPositions.add(Math.floor(Math.random() * (words.length - 1)) + 1);
    }
    text = words
      .map((w, i) => (commaPositions.has(i) ? `${w},` : w))
      .join(" ");
  }

  if (level !== "easy") {
    text = text.charAt(0).toUpperCase() + text.slice(1) + ".";
  }

  return text;
};

const TypingTest = () => {
  const [level, setLevel] = useState("easy");
  const [target, setTarget] = useState(() => buildText("easy"));
  const [typed, setTyped] = useState("");
  const [correctChars, setCorrectChars] = useState(0);
  const [status, setStatus] = useState("idle");
  const [elapsed, setElapsed] = useState(0);
  const [finalStats, setFinalStats] = useState(null);
  const [bestWpm, setBestWpm] = useState(() => {
    try {
      return parseInt(localStorage.getItem(BEST_KEY) ?? "0", 10) || 0;
    } catch {
      return 0;
    }
  });

  const startRef = useRef(null);

  useEffect(() => {
    if (status !== "typing") return;
    const id = setInterval(() => {
      setElapsed((Date.now() - startRef.current) / 1000);
    }, 200);
    return () => clearInterval(id);
  }, [status]);

  const countCorrect = useCallback(
    (value) => {
      let count = 0;
      for (let i = 0; i < Math.min(value.length, target.length); i++) {
        if (value[i] === target[i]) count++;
      }
      return count;
    },
    [target]
  );

  const handleInput = useCallback(
    (value) => {
      const trimmed = value.slice(0, target.length);

      if (status === "idle") {
        startRef.current = Date.now();
        setStatus("typing");
        setElapsed(0);
      }

      setTyped(trimmed);
      setCorrectChars(countCorrect(trimmed));

      if (trimmed.length === target.length) {
        const seconds = (Date.now() - startRef.current) / 1000;
        const minutes = seconds / 60;
        const wpm = minutes > 0 ? Math.round(trimmed.length / 5 / minutes) : 0;
        const accuracy =
          trimmed.length > 0
            ? Math.round((countCorrect(trimmed) / trimmed.length) * 100)
            : 100;
        setElapsed(seconds);
        setStatus("done");
        setFinalStats({ wpm, accuracy, time: seconds });
        setBestWpm((prev) => {
          const next = Math.max(prev, wpm);
          try {
            localStorage.setItem(BEST_KEY, String(next));
          } catch {
            // localStorage no disponible (modo privado, etc.)
          }
          return next;
        });
      }
    },
    [status, target, countCorrect]
  );

  const reset = (newLevel = level) => {
    setLevel(newLevel);
    setTarget(buildText(newLevel));
    setTyped("");
    setCorrectChars(0);
    setStatus("idle");
    setElapsed(0);
    setFinalStats(null);
  };

  const minutes = elapsed / 60;
  const liveWpm =
    minutes > 0 && status === "typing"
      ? Math.round(correctChars / 5 / minutes)
      : 0;
  const liveAccuracy =
    typed.length > 0 ? Math.round((correctChars / typed.length) * 100) : 100;

  const renderChar = (char, index) => {
    let className = "text-blue-900/25";
    if (index < typed.length) {
      className =
        typed[index] === char
          ? "text-blue-900"
          : "rounded bg-red-100 text-red-600";
    } else if (index === typed.length) {
      className = "rounded bg-blue-200 text-blue-900";
    }
    return (
      <span key={index} className={className}>
        {char}
      </span>
    );
  };

  const statChip = (label, value) => (
    <span className="rounded-full border border-blue-900/10 bg-blue-50 px-4 py-1.5 text-center">
      <span className="block text-[10px] font-bold uppercase text-blue-900/70">
        {label}
      </span>
      <span className="font-mono font-black text-blue-900">{value}</span>
    </span>
  );

  return (
    <div className="pb-16">
      <section className="bg-white rounded-3xl shadow-lg p-4 md:p-8 max-w-3xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex flex-wrap gap-2">
            {Object.entries(LEVELS).map(([key, levelInfo]) => (
              <button
                key={key}
                onClick={() => reset(key)}
                className={`rounded-full px-4 py-1.5 text-sm font-bold transition-all duration-200 ${
                  level === key
                    ? "bg-blue-800 text-white shadow-md"
                    : "border border-blue-900/10 bg-white/70 text-blue-900/80 hover:bg-white"
                }`}
              >
                {levelInfo.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-1.5 rounded-full border border-blue-900/10 bg-white/70 px-4 py-1.5 text-sm font-bold text-blue-900 transition hover:bg-white"
          >
            <FiRotateCcw />
            Reiniciar
          </button>
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-center gap-2">
          {status === "done"
            ? statChip("PPM", finalStats.wpm)
            : statChip("PPM", liveWpm)}
          {statChip("Precisión", `${liveAccuracy}%`)}
          {statChip("Tiempo", `${elapsed.toFixed(1)}s`)}
          {status === "done"
            ? statChip("Mejor", bestWpm)
            : statChip("Récord", bestWpm)}
        </div>

        <div className="rounded-2xl bg-blue-50/70 border border-blue-900/10 p-4 md:p-6">
          <p className="font-mono text-lg md:text-xl leading-relaxed break-words">
            {target.split("").map((char, index) => renderChar(char, index))}
          </p>
        </div>

        {status !== "done" ? (
          <>
            <input
              value={typed}
              onChange={(e) => handleInput(e.target.value)}
              placeholder="Empieza a escribir aquí..."
              autoFocus
              className="mt-4 w-full rounded-2xl border-2 border-blue-200 bg-white px-4 py-3 font-mono text-lg text-blue-900 outline-none placeholder:text-blue-900/40 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            />
            <p className="mt-2 text-center text-sm font-bold text-blue-900/70">
              El cronómetro arranca con tu primera tecla.
            </p>
          </>
        ) : (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center text-emerald-700">
            <p className="inline-flex items-center gap-2 text-2xl font-black">
              <FiZap />
              ¡Texto completado!
            </p>
            <p className="mt-1 font-bold">
              {finalStats.wpm} PPM con {finalStats.accuracy}% de precisión en{" "}
              {finalStats.time.toFixed(1)} segundos.
            </p>
            <button
              onClick={() => reset()}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-800 px-6 py-2.5 font-bold text-white transition hover:bg-blue-900 active:scale-95"
            >
              <FiRotateCcw />
              Otra vez
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default TypingTest;