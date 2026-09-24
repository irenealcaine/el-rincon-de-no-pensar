import React, { useState, useEffect, useRef } from "react";
import { FaBomb } from "react-icons/fa";
import {
  FiClock,
  FiFlag,
  FiFrown,
  FiRotateCcw,
  FiSmile,
} from "react-icons/fi";

const DIFFICULTIES = {
  easy: { label: "Fácil", rows: 9, cols: 9, mines: 10 },
  medium: { label: "Medio", rows: 16, cols: 16, mines: 40 },
  hard: { label: "Difícil", rows: 16, cols: 30, mines: 99 },
};

const NUMBER_COLORS = {
  1: "text-blue-700",
  2: "text-emerald-600",
  3: "text-red-600",
  4: "text-indigo-600",
  5: "text-amber-700",
  6: "text-cyan-600",
  7: "text-pink-600",
  8: "text-gray-700",
};

const emptyBoard = (d) =>
  Array.from({ length: d.rows * d.cols }, () => ({
    mine: false,
    revealed: false,
    flagged: false,
    adjacent: 0,
  }));

const Minesweeper = () => {
  const [difficulty, setDifficulty] = useState("easy");
  const [board, setBoard] = useState(() => emptyBoard(DIFFICULTIES.easy));
  const [status, setStatus] = useState("playing");
  const [seconds, setSeconds] = useState(0);
  const [flags, setFlags] = useState(0);
  const [flagMode, setFlagMode] = useState(false);
  const minesPlacedRef = useRef(false);

  const d = DIFFICULTIES[difficulty];

  useEffect(() => {
    if (status !== "playing") return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [status]);

  const getNeighbors = (index) => {
    const r = Math.floor(index / d.cols);
    const c = index % d.cols;
    const neighbors = [];
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < d.rows && nc >= 0 && nc < d.cols) {
          neighbors.push(nr * d.cols + nc);
        }
      }
    }
    return neighbors;
  };

  const placeMines = (boardCopy, safeIndex) => {
    const total = d.rows * d.cols;
    const indices = new Set();
    while (indices.size < d.mines) {
      const idx = Math.floor(Math.random() * total);
      if (idx !== safeIndex) indices.add(idx);
    }
    indices.forEach((i) => (boardCopy[i].mine = true));
    boardCopy.forEach((cell, i) => {
      if (!cell.mine) {
        cell.adjacent = getNeighbors(i).filter((n) => boardCopy[n].mine).length;
      }
    });
  };

  const revealCell = (boardCopy, startIndex) => {
    const stack = [startIndex];
    while (stack.length) {
      const i = stack.pop();
      const cell = boardCopy[i];
      if (cell.revealed || cell.flagged || cell.mine) continue;
      cell.revealed = true;
      if (cell.adjacent === 0) {
        getNeighbors(i).forEach((n) => {
          if (!boardCopy[n].revealed && !boardCopy[n].flagged && !boardCopy[n].mine) {
            stack.push(n);
          }
        });
      }
    }
    return boardCopy;
  };

  const restart = (key = difficulty) => {
    minesPlacedRef.current = false;
    setDifficulty(key);
    setBoard(emptyBoard(DIFFICULTIES[key]));
    setStatus("playing");
    setSeconds(0);
    setFlags(0);
    setFlagMode(false);
  };

  const handleCellClick = (index) => {
    if (status !== "playing") return;
    if (flagMode) {
      handleFlag(index);
      return;
    }
    const cell = board[index];
    if (cell.revealed || cell.flagged) return;

    let next = board;
    if (!minesPlacedRef.current) {
      next = board.map((c) => ({ ...c }));
      placeMines(next, index);
      minesPlacedRef.current = true;
    }
    next = revealCell(next, index);

    if (next[index].mine) {
      next = next.map((c) => (c.mine ? { ...c, revealed: true } : c));
      setBoard(next);
      setStatus("lost");
      return;
    }

    const revealedCount = next.filter((c) => c.revealed).length;
    if (revealedCount === d.rows * d.cols - d.mines) {
      next = next.map((c) => (c.mine ? { ...c, flagged: true } : c));
      setBoard(next);
      setFlags(d.mines);
      setStatus("won");
      return;
    }
    setBoard(next);
  };

  const handleFlag = (index) => {
    if (status !== "playing") return;
    const cell = board[index];
    if (cell.revealed) return;
    const next = board.map((c, i) =>
      i === index ? { ...c, flagged: !c.flagged } : c
    );
    setBoard(next);
    setFlags((f) => f + (next[index].flagged ? 1 : -1));
  };

  const isEasy = difficulty === "easy";
  const cellClass = isEasy
    ? "h-8 w-8 md:h-9 md:w-9 text-sm md:text-base"
    : "h-6 w-6 md:h-8 md:w-8 text-xs md:text-sm";

  const pill =
    "rounded-full border border-blue-900/10 bg-white/70 px-3 py-1.5 text-sm font-bold text-blue-900 transition hover:bg-white";

  return (
    <div className="pb-16">
      <section className="bg-white rounded-3xl shadow-lg p-4 md:p-8 max-w-3xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex flex-wrap gap-2">
            {Object.entries(DIFFICULTIES).map(([key, diff]) => (
              <button
                key={key}
                onClick={() => restart(key)}
                className={`rounded-full px-4 py-1.5 text-sm font-bold transition-all duration-200 ${
                  difficulty === key
                    ? "bg-blue-800 text-white shadow-md"
                    : "border border-blue-900/10 bg-white/70 text-blue-900/80 hover:bg-white"
                }`}
              >
                {diff.label}
              </button>
            ))}
          </div>
          <button onClick={() => restart()} className={pill}>
            <FiRotateCcw className="inline mr-1.5" />
            Reiniciar
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-4 text-sm font-bold text-blue-900">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-900/10 bg-blue-50 px-3 py-1">
            <FaBomb className="text-red-600" />
            {flags}/{d.mines}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-900/10 bg-blue-50 px-3 py-1">
            <FiClock />
            {seconds}s
          </span>
          <button
            onClick={() => setFlagMode((f) => !f)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 transition ${
              flagMode
                ? "border-amber-400 bg-amber-50 text-amber-700"
                : "border-blue-900/10 bg-white/70 text-blue-900/80 hover:bg-white"
            }`}
          >
            <FiFlag className="text-amber-600" />
            Bandera
          </button>
          {status === "won" && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700">
              <FiSmile />
              ¡Ganaste!
            </span>
          )}
          {status === "lost" && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-red-700">
              <FiFrown />
              ¡Perdiste!
            </span>
          )}
        </div>

        <div className="overflow-x-auto pb-1">
          <div
            className="mx-auto w-max rounded-xl border border-blue-900/10 bg-blue-900/5 p-1"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${d.cols}, minmax(0, 1fr))`,
              gap: "0.25rem",
            }}
          >
            {board.map((cell, index) => {
              const r = Math.floor(index / d.cols) + 1;
              const c = (index % d.cols) + 1;
              return (
                <button
                  key={index}
                  onClick={() => handleCellClick(index)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    handleFlag(index);
                  }}
                  disabled={status !== "playing" || cell.revealed}
                  aria-label={`Celda fila ${r}, columna ${c}`}
                  className={`${cellClass} flex items-center justify-center rounded font-black select-none transition ${
                    cell.revealed
                      ? "bg-blue-50"
                      : "bg-blue-200 hover:bg-blue-300 active:scale-95"
                  } ${cell.flagged && !cell.revealed ? "bg-amber-100" : ""}`}
                >
                  {cell.flagged && !cell.revealed ? (
                    <FiFlag className="text-amber-600" />
                  ) : cell.revealed && cell.mine ? (
                    <FaBomb className="text-red-600" />
                  ) : cell.revealed && cell.adjacent > 0 ? (
                    <span className={NUMBER_COLORS[cell.adjacent]}>
                      {cell.adjacent}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-4 text-center text-sm font-bold text-blue-900/70">
          Clic para descubrir · Clic derecho (o mantener pulsado) para marcar
          una bandera.
        </p>
      </section>
    </div>
  );
};

export default Minesweeper;