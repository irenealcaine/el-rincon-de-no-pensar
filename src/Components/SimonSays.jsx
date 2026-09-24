import React, { useState, useEffect, useRef } from "react";
import { FiPlay, FiRepeat, FiRotateCcw } from "react-icons/fi";

const BEST_KEY = "simonBest";

const COLORS = [
  {
    id: "rojo",
    base: "bg-red-500",
    active: "bg-red-300",
    glow: "shadow-[0_0_35px_rgba(239,68,68,0.7)]",
    tone: 329.63,
  },
  {
    id: "azul",
    base: "bg-blue-600",
    active: "bg-blue-400",
    glow: "shadow-[0_0_35px_rgba(59,130,246,0.7)]",
    tone: 261.63,
  },
  {
    id: "verde",
    base: "bg-green-500",
    active: "bg-green-300",
    glow: "shadow-[0_0_35px_rgba(34,197,94,0.7)]",
    tone: 220,
  },
  {
    id: "amarillo",
    base: "bg-amber-400",
    active: "bg-amber-200",
    glow: "shadow-[0_0_35px_rgba(251,191,36,0.7)]",
    tone: 392,
  },
];

const SimonSays = () => {
  const [status, setStatus] = useState("idle");
  const [round, setRound] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);
  const [pressedIndex, setPressedIndex] = useState(null);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [best, setBest] = useState(() => {
    try {
      return parseInt(localStorage.getItem(BEST_KEY) ?? "0", 10) || 0;
    } catch {
      return 0;
    }
  });

  const sequenceRef = useRef([]);
  const timeoutRefs = useRef([]);
  const audioRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(BEST_KEY, String(best));
    } catch {
      // localStorage no disponible (modo privado, etc.)
    }
  }, [best]);

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(clearTimeout);
    };
  }, []);

  const clearTimeouts = () => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  };

  const getAudio = () => {
    if (!audioRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return null;
      audioRef.current = new AudioContext();
    }
    return audioRef.current;
  };

  const playTone = (index) => {
    const ctx = getAudio();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = COLORS[index].tone;
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    osc.start(now);
    osc.stop(now + 0.4);
  };

  const flash = (index, duration = 200) => {
    setPressedIndex(index);
    timeoutRefs.current.push(
      setTimeout(() => setPressedIndex(null), duration)
    );
  };

  const playSequence = () => {
    clearTimeouts();
    setStatus("computer");
    setActiveIndex(null);
    let i = 0;
    const step = () => {
      if (i < sequenceRef.current.length) {
        const idx = sequenceRef.current[i];
        setActiveIndex(idx);
        playTone(idx);
        timeoutRefs.current.push(
          setTimeout(() => {
            setActiveIndex(null);
            i++;
            timeoutRefs.current.push(setTimeout(step, 450));
          }, 550)
        );
      } else {
        setStatus("player");
        setPlayerIndex(0);
      }
    };
    timeoutRefs.current.push(setTimeout(step, 700));
  };

  const startGame = () => {
    clearTimeouts();
    sequenceRef.current = [Math.floor(Math.random() * 4)];
    setRound(0);
    setStatus("computer");
    playSequence();
  };

  const handleColorClick = (index) => {
    if (status !== "player") return;
    flash(index);
    playTone(index);

    if (index !== sequenceRef.current[playerIndex]) {
      setStatus("lost");
      clearTimeouts();
      return;
    }

    const nextIndex = playerIndex + 1;
    if (nextIndex === sequenceRef.current.length) {
      const newRound = round + 1;
      setRound(newRound);
      setBest((b) => Math.max(b, newRound));
      sequenceRef.current = [...sequenceRef.current, Math.floor(Math.random() * 4)];
      timeoutRefs.current.push(setTimeout(playSequence, 900));
    } else {
      setPlayerIndex(nextIndex);
    }
  };

  const statusText = {
    idle: "Pulsa empezar cuando quieras.",
    computer: "Simón dice... mira y memoriza.",
    player: "Tu turno: repite la secuencia.",
    lost: `Has perdido. Llegaste a la ronda ${round}.`,
  }[status];

  const button =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 font-bold transition active:scale-95";

  return (
    <div className="pb-16">
      <section className="bg-white rounded-3xl shadow-lg p-4 md:p-8 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-blue-900">Simón dice</h2>
          <div className="flex gap-2 text-sm font-bold">
            <span className="rounded-full bg-blue-50 border border-blue-900/10 px-3 py-1 text-blue-900">
              Ronda: {round}
            </span>
            <span className="rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-amber-700">
              Récord: {best}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
          {COLORS.map((color, index) => {
            const lit = pressedIndex === index || activeIndex === index;
            return (
              <button
                key={color.id}
                onClick={() => handleColorClick(index)}
                aria-label={color.id}
                disabled={status === "computer"}
                className={`aspect-square rounded-3xl transition-all duration-150 ${color.base} ${
                  lit ? `${color.active} ${color.glow} scale-[1.02]` : ""
                } hover:brightness-110 active:scale-95 disabled:cursor-not-allowed ${
                  status === "player" ? "opacity-100" : "opacity-80"
                }`}
              />
            );
          })}
        </div>

        <p className="mt-6 text-center font-bold text-blue-900/80">
          {statusText}
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {status === "idle" && (
            <button onClick={startGame} className={`${button} bg-blue-800 text-white hover:bg-blue-900`}>
              <FiPlay />
              Empezar
            </button>
          )}
          {status === "player" && (
            <button onClick={playSequence} className={`${button} border border-blue-900/10 bg-white/70 text-blue-900 hover:bg-white`}>
              <FiRepeat />
              Repetir secuencia
            </button>
          )}
          {(status === "lost" || status === "computer") && (
            <button onClick={startGame} className={`${button} bg-blue-800 text-white hover:bg-blue-900`}>
              <FiRotateCcw />
              {status === "lost" ? "Volver a empezar" : "Nueva partida"}
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default SimonSays;