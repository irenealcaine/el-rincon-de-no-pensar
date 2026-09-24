import React, { useState, useEffect } from "react";
import Button from "./Button";

const ROWS = 6;
const COLS = 7;
const STORAGE_KEY = "connectFourScores";

const emptyBoard = () =>
  Array.from({ length: ROWS }, () => Array(COLS).fill(null));

const loadScores = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { r: 0, y: 0, draws: 0 };
  } catch {
    return { r: 0, y: 0, draws: 0 };
  }
};

const checkWin = (board, row, col, player) => {
  const dirs = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];
  for (const [dr, dc] of dirs) {
    const cells = [[row, col]];
    for (const sign of [1, -1]) {
      let r = row + dr * sign;
      let c = col + dc * sign;
      while (
        r >= 0 &&
        r < ROWS &&
        c >= 0 &&
        c < COLS &&
        board[r][c] === player
      ) {
        cells.push([r, c]);
        r += dr * sign;
        c += dc * sign;
      }
    }
    if (cells.length >= 4) return cells;
  }
  return null;
};

const ConnectFour = () => {
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState("R");
  const [winner, setWinner] = useState(null);
  const [winningCells, setWinningCells] = useState([]);
  const [hoveredCol, setHoveredCol] = useState(null);
  const [scores, setScores] = useState(loadScores);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
    } catch {
      // localStorage no disponible (modo privado, etc.)
    }
  }, [scores]);

  const dropRow = (col) => {
    for (let r = ROWS - 1; r >= 0; r--) {
      if (!board[r][col]) return r;
    }
    return -1;
  };

  const handleColumnClick = (col) => {
    if (winner || board[0][col]) return;

    const row = dropRow(col);
    if (row === -1) return;

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    const winning = checkWin(newBoard, row, col, currentPlayer);
    if (winning) {
      setWinner(currentPlayer);
      setWinningCells(winning);
      setScores((prev) => ({
        ...prev,
        [currentPlayer === "R" ? "r" : "y"]:
          prev[currentPlayer === "R" ? "r" : "y"] + 1,
      }));
    } else if (newBoard.every((rowArr) => rowArr.every(Boolean))) {
      setWinner("draw");
      setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
    } else {
      setCurrentPlayer(currentPlayer === "R" ? "Y" : "R");
    }
  };

  const resetGame = () => {
    setBoard(emptyBoard());
    setCurrentPlayer("R");
    setWinner(null);
    setWinningCells([]);
    setHoveredCol(null);
  };

  const discClass = (value) =>
    value === "R"
      ? "bg-red-500"
      : value === "Y"
      ? "bg-amber-400"
      : "bg-blue-100";

  const isGameOver = !!winner;

  return (
    <section className="bg-white rounded-3xl shadow-lg p-6 md:p-8 flex flex-col items-center">
      <div className="mb-5 text-center">
        {isGameOver ? (
          <span
            className={`px-6 py-2 rounded-full font-black text-2xl ${
              winner === "R"
                ? "bg-red-100 text-red-700"
                : winner === "Y"
                ? "bg-amber-100 text-amber-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {winner === "R"
              ? "¡Gana Rojo!"
              : winner === "Y"
              ? "¡Gana Amarillo!"
              : "¡Empate!"}
          </span>
        ) : (
          <span
            className={`inline-flex items-center gap-2 px-6 py-2 rounded-full font-bold text-xl text-blue-800 ${
              currentPlayer === "R" ? "bg-red-100" : "bg-amber-100"
            }`}
          >
            <span
              className={`h-4 w-4 rounded-full ${
                currentPlayer === "R" ? "bg-red-500" : "bg-amber-400"
              }`}
            />
            Turno de {currentPlayer === "R" ? "Rojo" : "Amarillo"}
          </span>
        )}
      </div>

      <div
        className="grid w-full max-w-sm rounded-3xl bg-blue-900 p-2.5 shadow-lg sm:max-w-md md:p-3"
        style={{
          gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
          gap: "0.375rem",
        }}
      >
        {board.map((rowArr, r) =>
          rowArr.map((value, c) => {
            const isWinning = winningCells.some(([wr, wc]) => wr === r && wc === c);
            const isPreview =
              hoveredCol === c && r === dropRow(c) && !winner;
            return (
              <button
                key={`${r}-${c}`}
                onClick={() => handleColumnClick(c)}
                onMouseEnter={() => setHoveredCol(c)}
                onMouseLeave={() => setHoveredCol(null)}
                disabled={!!winner || (r === 0 && !!board[r][c])}
                aria-label={`Columna ${c + 1}`}
                className="aspect-square rounded-full transition active:scale-95"
              >
                <span
                  className={`block h-full w-full rounded-full transition-all duration-200 ${
                    isWinning
                      ? `${discClass(value)} ring-4 ring-white`
                      : isPreview
                      ? currentPlayer === "R"
                        ? "bg-red-500/30"
                        : "bg-amber-400/30"
                      : discClass(value)
                  }`}
                />
              </button>
            );
          })
        )}
      </div>

      <div className="mt-6 flex gap-3 md:gap-4">
        <div className="px-5 py-2 rounded-2xl bg-red-50 text-center min-w-16">
          <p className="text-xs font-bold text-red-700 uppercase">Rojo gana</p>
          <p className="font-mono text-3xl font-black text-red-700">
            {scores.r}
          </p>
        </div>
        <div className="px-5 py-2 rounded-2xl bg-blue-50 text-center min-w-16 content-end">
          <p className="text-xs font-bold text-blue-700 uppercase">Empates</p>
          <p className="font-mono text-3xl font-black text-blue-700">
            {scores.draws}
          </p>
        </div>
        <div className="px-5 py-2 rounded-2xl bg-amber-50 text-center min-w-16">
          <p className="text-xs font-bold text-amber-700 uppercase">
            Amarillo gana
          </p>
          <p className="font-mono text-3xl font-black text-amber-700">
            {scores.y}
          </p>
        </div>
      </div>

      {isGameOver && (
        <Button className="mt-6" onClickValue={resetGame} value={"Nuevo juego"} />
      )}
    </section>
  );
};

export default ConnectFour;