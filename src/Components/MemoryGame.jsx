import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import { FiClock } from "react-icons/fi";

const memoryItems = [
  { id: 1, img: "https://img.icons8.com/?size=512&id=62yTna5C9Gw6&format=png" },
  { id: 2, img: "https://img.icons8.com/?size=512&id=eFPBXQop6V2m&format=png" },
  { id: 3, img: "https://img.icons8.com/?size=512&id=D2NqKl85S8Ye&format=png" },
  { id: 4, img: "https://img.icons8.com/?size=512&id=LoL4bFzqmAa0&format=png" },
  { id: 5, img: "https://img.icons8.com/?size=512&id=MR3dZdlA53te&format=png" },
  { id: 6, img: "https://img.icons8.com/?size=512&id=nj0Uj45LGUYh&format=png" },
];

const STORAGE_KEY = "memoryHistory";

const loadHistory = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const shuffle = (arr) => [...arr, ...arr].sort(() => Math.random() - 0.5);

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
};

const MemoryGame = () => {
  const [items, setItems] = useState(() =>
    shuffle(memoryItems).map((item, index) => ({ ...item, key: index, stat: "" }))
  );
  const [prev, setPrev] = useState(-1);
  const [gameOver, setGameOver] = useState(false);
  const [moves, setMoves] = useState(0);
  const [started, setStarted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [history, setHistory] = useState(loadHistory);

  useEffect(() => {
    if (!started || gameOver) return;
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, [started, gameOver]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch {
      // localStorage no disponible
    }
  }, [history]);

  const check = (current) => {
    if (current === prev) return;
    const newMoves = moves + 1;
    setMoves(newMoves);

    if (items[current].id === items[prev].id) {
      const next = items.map((item, index) =>
        index === current || index === prev ? { ...item, stat: "correct" } : item
      );
      setItems(next);
      setPrev(-1);
      if (next.every((item) => item.stat === "correct")) {
        setGameOver(true);
        setHistory((prevHistory) =>
          [
            {
              id: Date.now(),
              date: new Date().toLocaleDateString("es-ES"),
              moves: newMoves,
              time: elapsed,
            },
            ...prevHistory,
          ].slice(0, 10)
        );
      }
    } else {
      const next = items.map((item, index) =>
        index === current || index === prev ? { ...item, stat: "wrong" } : item
      );
      setItems(next);
      setTimeout(() => {
        setItems((currentItems) =>
          currentItems.map((item, index) =>
            index === current || index === prev ? { ...item, stat: "" } : item
          )
        );
        setPrev(-1);
      }, 500);
    }
  };

  const handleClick = (index) => {
    if (gameOver) return;
    if (!started) setStarted(true);
    if (
      items[index].stat === "correct" ||
      items[index].stat === "active" ||
      items[index].stat === "wrong"
    ) {
      return;
    }
    if (prev === -1) {
      setItems((currentItems) =>
        currentItems.map((item, i) => (i === index ? { ...item, stat: "active" } : item))
      );
      setPrev(index);
    } else {
      check(index);
    }
  };

  const handleNewGame = () => {
    setItems(
      shuffle(memoryItems).map((item, index) => ({ ...item, key: index, stat: "" }))
    );
    setGameOver(false);
    setPrev(-1);
    setMoves(0);
    setStarted(false);
    setElapsed(0);
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex flex-wrap items-center gap-5">
            <span className="font-mono text-lg font-black text-blue-900">
              Movimientos: {moves}
            </span>
            <span className="font-mono text-lg font-black text-blue-900 inline-flex items-center gap-1.5">
              <FiClock /> {formatTime(elapsed)}
            </span>
          </div>
          <Button onClickValue={handleNewGame} value={"Reiniciar"} />
        </div>

        {gameOver && (
          <div className="mb-6 text-center px-6 py-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <p className="font-black text-2xl text-emerald-600">¡Has ganado!</p>
            <p className="text-emerald-700/70">
              Lo conseguiste en {moves} {moves === 1 ? "movimiento" : "movimientos"}{" "}
              y {formatTime(elapsed)}.
            </p>
          </div>
        )}

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4">
          {items.map((item) => (
            <Card
              key={item.key}
              item={item}
              id={item.key}
              handleClick={handleClick}
            />
          ))}
        </div>
      </section>

      <section className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
        <h2 className="font-black text-blue-900 mb-2">Partidas anteriores</h2>
        <p className="text-sm text-blue-900/50 mb-4">
          Las últimas 10 partidas completadas, con movimientos y tiempo.
        </p>
        {history.length === 0 ? (
          <p className="text-blue-900/50 text-center py-6">
            Aún no hay partidas guardadas. ¡Juega una y aparecerá aquí!
          </p>
        ) : (
          <ul className="divide-y divide-blue-900/10">
            {history.map((entry) => (
              <li
                key={entry.id}
                className="flex items-center justify-between gap-3 py-3"
              >
                <span className="text-sm font-bold text-blue-900/70">
                  {entry.date}
                </span>
                <span className="font-mono text-sm text-blue-900">
                  {entry.moves} {entry.moves === 1 ? "movimiento" : "movimientos"}
                </span>
                <span className="font-mono text-sm font-black text-blue-900">
                  {formatTime(entry.time)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default MemoryGame;