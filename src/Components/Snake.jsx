import React, { useState, useEffect, useRef } from "react";
import useInterval from "../Hooks/useInterval";
import {
  FiArrowDown,
  FiArrowLeft,
  FiArrowRight,
  FiArrowUp,
  FiPause,
  FiPlay,
  FiRotateCcw,
} from "react-icons/fi";

const GRID_SIZE = 20;
const BEST_KEY = "snakeBest";
const DIR_VECTORS = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
};
const OPPOSITES = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

const START_SNAKE = [
  [10, 10],
  [9, 10],
  [8, 10],
];

const generateFood = (snakeArr) => {
  const occupied = new Set(snakeArr.map((seg) => `${seg[0]},${seg[1]}`));
  let key;
  do {
    const r = Math.floor(Math.random() * GRID_SIZE);
    const c = Math.floor(Math.random() * GRID_SIZE);
    key = `${r},${c}`;
  } while (occupied.has(key));
  return key.split(",").map(Number);
};

const Snake = () => {
  const snakeRef = useRef(START_SNAKE);
  const foodRef = useRef([15, 10]);
  const directionRef = useRef("right");
  const scoreRef = useRef(0);

  const [snake, setSnake] = useState(START_SNAKE);
  const [food, setFood] = useState(foodRef.current);
  const [status, setStatus] = useState("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => {
    try {
      return parseInt(localStorage.getItem(BEST_KEY) ?? "0", 10) || 0;
    } catch {
      return 0;
    }
  });

  const speed = Math.max(60, 130 - score * 2);

  const gameOver = () => {
    setStatus("gameover");
    setBest((prev) => {
      const next = Math.max(prev, scoreRef.current);
      try {
        localStorage.setItem(BEST_KEY, String(next));
      } catch {
        // localStorage no disponible (modo privado, etc.)
      }
      return next;
    });
  };

  const tick = () => {
    const head = snakeRef.current[0];
    const [dr, dc] = DIR_VECTORS[directionRef.current];
    const nr = head[0] + dr;
    const nc = head[1] + dc;

    if (nr < 0 || nr >= GRID_SIZE || nc < 0 || nc >= GRID_SIZE) {
      gameOver();
      return;
    }
    if (snakeRef.current.some((seg) => seg[0] === nr && seg[1] === nc)) {
      gameOver();
      return;
    }

    const ate = nr === foodRef.current[0] && nc === foodRef.current[1];
    const newSnake = [[nr, nc], ...snakeRef.current];

    if (ate) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
      foodRef.current = generateFood(newSnake);
      setFood(foodRef.current);
    } else {
      newSnake.pop();
    }

    snakeRef.current = newSnake;
    setSnake(newSnake);
  };

  useInterval(tick, status === "playing" ? speed : null);

  const changeDirection = (dir) => {
    if (OPPOSITES[dir] === directionRef.current) return;
    directionRef.current = dir;
  };

  const start = () => {
    snakeRef.current = START_SNAKE;
    setSnake(START_SNAKE);
    directionRef.current = "right";
    scoreRef.current = 0;
    setScore(0);
    foodRef.current = generateFood(START_SNAKE);
    setFood(foodRef.current);
    setStatus("playing");
  };

  const toggleStart = () => {
    if (status === "playing") {
      setStatus("paused");
    } else if (status === "paused") {
      setStatus("playing");
    } else {
      start();
    }
  };

  useEffect(() => {
    const onKey = (e) => {
      const map = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
        w: "up",
        W: "up",
        s: "down",
        S: "down",
        a: "left",
        A: "left",
        d: "right",
        D: "right",
      };
      if (map[e.key]) {
        e.preventDefault();
        changeDirection(map[e.key]);
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        toggleStart();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const snakeKeys = new Set(snake.map((seg) => `${seg[0]},${seg[1]}`));
  const headKey = `${snake[0][0]},${snake[0][1]}`;
  const foodKey = `${food[0]},${food[1]}`;

  const cells = Array.from(
    { length: GRID_SIZE * GRID_SIZE },
    (_, i) => `${Math.floor(i / GRID_SIZE)},${i % GRID_SIZE}`
  );

  const controlButton =
    "flex h-12 w-12 items-center justify-center rounded-xl border border-blue-900/10 bg-blue-50 text-blue-900 transition hover:bg-blue-100 active:scale-90";

  return (
    <div className="pb-16">
      <section className="bg-white rounded-3xl shadow-lg p-4 md:p-8 max-w-xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <h2 className="text-xl font-black text-blue-900">La serpiente</h2>
          <div className="flex gap-2">
            <span className="rounded-full border border-blue-900/10 bg-blue-50 px-3 py-1 text-center">
              <span className="block text-[10px] font-bold uppercase text-blue-900/70">
                Puntos
              </span>
              <span className="font-mono font-black text-blue-900">
                {score}
              </span>
            </span>
            <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-center">
              <span className="block text-[10px] font-bold uppercase text-amber-700/80">
                Récord
              </span>
              <span className="font-mono font-black text-amber-700">
                {best}
              </span>
            </span>
          </div>
        </div>

        <div className="relative">
          <div
            className="grid gap-px rounded-2xl bg-blue-900 p-1.5"
            style={{
              gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
            }}
          >
            {cells.map((key, index) => {
              const isFood = key === foodKey;
              const isHead = key === headKey;
              const isBody = snakeKeys.has(key);
              return (
                <div
                  key={index}
                  className={`aspect-square rounded-[3px] ${
                    isHead
                      ? "bg-emerald-600"
                      : isBody
                      ? "bg-emerald-400"
                      : isFood
                      ? "bg-red-500"
                      : "bg-blue-100/60"
                  }`}
                />
              );
            })}
          </div>

          {status !== "playing" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl bg-blue-900/70 backdrop-blur-sm">
              <p className="px-6 text-center text-xl font-black text-white">
                {status === "idle"
                  ? "Pulsa para empezar"
                  : status === "paused"
                  ? "Juego en pausa"
                  : `Has perdido con ${score} ${
                      score === 1 ? "punto" : "puntos"
                    }`}
              </p>
              <button
                onClick={toggleStart}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 font-bold text-blue-900 transition hover:bg-blue-50 active:scale-95"
              >
                {status === "gameover" ? <FiRotateCcw /> : <FiPlay />}
                {status === "gameover"
                  ? "Otra vez"
                  : status === "paused"
                  ? "Reanudar"
                  : "Empezar"}
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            onClick={toggleStart}
            className="inline-flex items-center gap-2 rounded-full bg-blue-800 px-5 py-2.5 font-bold text-white transition hover:bg-blue-900 active:scale-95"
          >
            {status === "playing" ? <FiPause /> : <FiPlay />}
            {status === "playing"
              ? "Pausar"
              : status === "paused"
              ? "Reanudar"
              : "Empezar"}
          </button>
        </div>

        <div className="mt-4 flex flex-col items-center gap-1.5">
          <button
            onClick={() => changeDirection("up")}
            aria-label="Arriba"
            className={controlButton}
          >
            <FiArrowUp />
          </button>
          <div className="flex gap-1.5">
            <button
              onClick={() => changeDirection("left")}
              aria-label="Izquierda"
              className={controlButton}
            >
              <FiArrowLeft />
            </button>
            <button
              onClick={() => changeDirection("down")}
              aria-label="Abajo"
              className={controlButton}
            >
              <FiArrowDown />
            </button>
            <button
              onClick={() => changeDirection("right")}
              aria-label="Derecha"
              className={controlButton}
            >
              <FiArrowRight />
            </button>
          </div>
        </div>

        <p className="mt-4 text-center text-sm font-bold text-blue-900/70">
          Mueve con las flechas o WASD. Espacio para pausar.
        </p>
      </section>
    </div>
  );
};

export default Snake;