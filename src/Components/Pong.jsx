import React, { useState, useEffect, useRef } from "react";
import { FiPause, FiPlay, FiRotateCcw } from "react-icons/fi";

const WIDTH = 800;
const HEIGHT = 400;
const PADDLE_WIDTH = 12;
const PADDLE_HEIGHT = 72;
const PADDLE_SPEED = 6;
const BALL_SIZE = 12;
const WIN_SCORE = 5;
const BEST_KEY = "pongBest";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const collides = (a, b) =>
  a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

const createGame = () => ({
  leftY: HEIGHT / 2 - PADDLE_HEIGHT / 2,
  rightY: HEIGHT / 2 - PADDLE_HEIGHT / 2,
  ballX: WIDTH / 2 - BALL_SIZE / 2,
  ballY: HEIGHT / 2 - BALL_SIZE / 2,
  ballVx: 4 * (Math.random() < 0.5 ? -1 : 1),
  ballVy: (Math.random() - 0.5) * 4,
  keys: {},
});

const Pong = () => {
  const canvasRef = useRef(null);
  const gameRef = useRef(createGame());
  const statusRef = useRef("idle");
  const scoreRef = useRef({ left: 0, right: 0 });

  const [status, setStatus] = useState("idle");
  const [score, setScore] = useState({ left: 0, right: 0 });
  const [winner, setWinner] = useState(null);
  const [best, setBest] = useState(() => {
    try {
      return parseInt(localStorage.getItem(BEST_KEY) ?? "0", 10) || 0;
    } catch {
      return 0;
    }
  });

  statusRef.current = status;

  const draw = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const g = gameRef.current;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.setLineDash([10, 10]);
    ctx.strokeStyle = "#bfdbfe";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(WIDTH / 2, 0);
    ctx.lineTo(WIDTH / 2, HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "#1e40af";
    ctx.fillRect(0, g.leftY, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.fillRect(WIDTH - PADDLE_WIDTH, g.rightY, PADDLE_WIDTH, PADDLE_HEIGHT);

    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(
      g.ballX + BALL_SIZE / 2,
      g.ballY + BALL_SIZE / 2,
      BALL_SIZE / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  };

  const resetBall = (dir) => {
    const g = gameRef.current;
    g.ballX = WIDTH / 2 - BALL_SIZE / 2;
    g.ballY = HEIGHT / 2 - BALL_SIZE / 2;
    g.ballVx = 4 * dir;
    g.ballVy = (Math.random() - 0.5) * 4;
  };

  const scorePoint = (side) => {
    scoreRef.current = {
      ...scoreRef.current,
      [side]: scoreRef.current[side] + 1,
    };
    setScore(scoreRef.current);

    if (scoreRef.current[side] >= WIN_SCORE) {
      setStatus("gameover");
      setWinner(side);
      setBest((prev) => {
        const next = Math.max(prev, scoreRef.current[side]);
        try {
          localStorage.setItem(BEST_KEY, String(next));
        } catch {
          // localStorage no disponible (modo privado, etc.)
        }
        return next;
      });
    } else {
      resetBall(side === "left" ? 1 : -1);
    }
  };

  const update = (dt) => {
    const g = gameRef.current;
    const keys = g.keys;

    if (keys.w || keys.arrowup) g.leftY -= PADDLE_SPEED * dt;
    if (keys.s || keys.arrowdown) g.leftY += PADDLE_SPEED * dt;
    g.leftY = clamp(g.leftY, 0, HEIGHT - PADDLE_HEIGHT);

    const aiTarget = g.ballY - PADDLE_HEIGHT / 2;
    const diff = aiTarget - g.rightY;
    if (Math.abs(diff) > 2) {
      g.rightY += Math.sign(diff) * Math.min(3.2 * dt, Math.abs(diff));
    }
    g.rightY = clamp(g.rightY, 0, HEIGHT - PADDLE_HEIGHT);

    g.ballX += g.ballVx * dt;
    g.ballY += g.ballVy * dt;

    if (g.ballY <= 0 || g.ballY >= HEIGHT - BALL_SIZE) {
      g.ballVy *= -1;
    }

    const ballRect = { x: g.ballX, y: g.ballY, w: BALL_SIZE, h: BALL_SIZE };
    const leftRect = { x: 0, y: g.leftY, w: PADDLE_WIDTH, h: PADDLE_HEIGHT };
    const rightRect = {
      x: WIDTH - PADDLE_WIDTH,
      y: g.rightY,
      w: PADDLE_WIDTH,
      h: PADDLE_HEIGHT,
    };

    if (collides(ballRect, leftRect) && g.ballVx < 0) {
      g.ballVx = Math.min(Math.abs(g.ballVx) * 1.06, 12);
      const hitPos = (g.ballY + BALL_SIZE / 2 - g.leftY) / PADDLE_HEIGHT;
      g.ballVy = (hitPos - 0.5) * 8;
      g.ballX = PADDLE_WIDTH;
    }
    if (collides(ballRect, rightRect) && g.ballVx > 0) {
      g.ballVx = -Math.min(Math.abs(g.ballVx) * 1.06, 12);
      const hitPos = (g.ballY + BALL_SIZE / 2 - g.rightY) / PADDLE_HEIGHT;
      g.ballVy = (hitPos - 0.5) * 8;
      g.ballX = WIDTH - PADDLE_WIDTH - BALL_SIZE;
    }

    if (g.ballX < -BALL_SIZE) scorePoint("right");
    if (g.ballX > WIDTH) scorePoint("left");
  };

  useEffect(() => {
    let raf;
    let last = performance.now();

    const loop = (now) => {
      const dt = Math.min((now - last) / 16.67, 3);
      last = now;
      if (statusRef.current === "playing") {
        update(dt);
      }
      draw();
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (
        ["ArrowUp", "ArrowDown", "w", "W", "s", "S", " "].includes(e.key)
      ) {
        e.preventDefault();
      }
      gameRef.current.keys[e.key.toLowerCase()] = true;
      if (e.key === " ") toggleStart();
    };
    const onKeyUp = (e) => {
      gameRef.current.keys[e.key.toLowerCase()] = false;
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  });

  const start = () => {
    gameRef.current = createGame();
    scoreRef.current = { left: 0, right: 0 };
    setScore({ left: 0, right: 0 });
    setWinner(null);
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

  const holdKey = (key, pressed) => {
    gameRef.current.keys[key] = pressed;
  };

  const overlayText =
    status === "idle"
      ? "Pulsa para empezar"
      : status === "paused"
      ? "Juego en pausa"
      : winner === "left"
      ? "¡Has ganado!"
      : "¡La máquina gana!";

  return (
    <div className="pb-16">
      <section className="bg-white rounded-3xl shadow-lg p-4 md:p-8 max-w-3xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <h2 className="text-xl font-black text-blue-900">Pong</h2>
          <div className="flex gap-2">
            <span className="rounded-full border border-blue-900/10 bg-blue-50 px-4 py-1 text-center">
              <span className="block text-[10px] font-bold uppercase text-blue-900/70">
                Marcador
              </span>
              <span className="font-mono font-black text-blue-900">
                {score.left} - {score.right}
              </span>
            </span>
            <span className="rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-center">
              <span className="block text-[10px] font-bold uppercase text-amber-700/80">
                Récord
              </span>
              <span className="font-mono font-black text-amber-700">{best}</span>
            </span>
          </div>
        </div>

        <div className="relative">
          <canvas
            ref={canvasRef}
            width={WIDTH}
            height={HEIGHT}
            className="h-auto w-full rounded-2xl border border-blue-900/10 bg-white shadow-inner"
          />

          {status !== "playing" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl bg-blue-900/70 backdrop-blur-sm">
              <p className="px-6 text-center text-xl font-black text-white">
                {overlayText}
              </p>
              {status === "gameover" && (
                <p className="font-mono font-black text-white/90">
                  {score.left} - {score.right}
                </p>
              )}
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

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
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
          <div className="flex gap-2">
            <button
              onPointerDown={() => holdKey("w", true)}
              onPointerUp={() => holdKey("w", false)}
              onPointerLeave={() => holdKey("w", false)}
              className="rounded-full border border-blue-900/10 bg-blue-50 px-4 py-2.5 font-bold text-blue-900 transition hover:bg-blue-100 active:scale-95"
            >
              Subir
            </button>
            <button
              onPointerDown={() => holdKey("s", true)}
              onPointerUp={() => holdKey("s", false)}
              onPointerLeave={() => holdKey("s", false)}
              className="rounded-full border border-blue-900/10 bg-blue-50 px-4 py-2.5 font-bold text-blue-900 transition hover:bg-blue-100 active:scale-95"
            >
              Bajar
            </button>
          </div>
        </div>

        <p className="mt-4 text-center text-sm font-bold text-blue-900/70">
          Mueve tu pala con las flechas o W/S. Espacio para pausar. Primero a 5
          puntos.
        </p>
      </section>
    </div>
  );
};

export default Pong;