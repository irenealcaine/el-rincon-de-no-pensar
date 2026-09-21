import React, { useState, useEffect } from "react";
import Button from "./Button";

const STORAGE_KEY = "ticTacToeScores";

const loadScores = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { x: 0, o: 0, draws: 0 };
  } catch {
    return { x: 0, o: 0, draws: 0 };
  }
};

function calculateWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }

  return null;
}

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [scores, setScores] = useState(loadScores);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
    } catch {
      // localStorage no disponible
    }
  }, [scores]);

  const handleClick = (index) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const result = calculateWinner(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
      setScores((prev) => ({
        ...prev,
        [result.winner === "X" ? "x" : "o"]:
          prev[result.winner === "X" ? "x" : "o"] + 1,
      }));
    } else if (newBoard.every((square) => square !== null)) {
      setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setWinningLine([]);
    setXIsNext(true);
  };

  const isGameOver = winner || board.every((square) => square !== null);

  return (
    <section className="bg-white rounded-3xl shadow-lg p-6 md:p-8 flex flex-col items-center">
      <div className="mb-5 text-center">
        {isGameOver ? (
          <span
            className={`px-6 py-2 rounded-full font-black text-2xl ${
              winner === "X"
                ? "bg-orange-100 text-orange-700"
                : winner === "O"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {winner ? `¡Gana ${winner}!` : "¡Empate!"}
          </span>
        ) : (
          <span className="px-6 py-2 rounded-full bg-blue-100 text-blue-800 font-bold text-xl">
            Turno de {xIsNext ? "X" : "O"}
          </span>
        )}
      </div>

      <div className="grid w-full max-w-xs grid-cols-3 gap-2 rounded-3xl bg-blue-900 p-2.5 shadow-lg sm:max-w-sm md:gap-3 md:p-3">
        {board.map((value, index) => {
          const isWinningCell = winningLine.includes(index);
          return (
            <button
              key={index}
              onClick={() => handleClick(index)}
              disabled={!!value || isGameOver}
              className={`group aspect-square w-full rounded-2xl font-tictactoe text-4xl font-bold transition-all duration-200 flex items-center justify-center sm:text-5xl md:text-6xl ${
                isWinningCell
                  ? winner === "X"
                    ? "bg-orange-700 text-white"
                    : "bg-emerald-700 text-white"
                  : "bg-blue-50 hover:bg-white"
              }`}
            >
              {value ? (
                <span
                  className={`cell-pop ${
                    isWinningCell
                      ? "text-white"
                      : value === "X"
                      ? "text-orange-700"
                      : "text-emerald-700"
                  }`}
                >
                  {value}
                </span>
              ) : (
                <span className="opacity-0 group-hover:opacity-30 text-blue-900 text-3xl sm:text-4xl md:text-5xl transition-opacity">
                  {xIsNext ? "X" : "O"}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex gap-3 md:gap-4">
        <div className="px-5 py-2 rounded-2xl bg-orange-50 text-center min-w-16">
          <p className="text-xs font-bold text-orange-700 uppercase">X gana</p>
          <p className="font-mono text-3xl font-black text-orange-700">
            {scores.x}
          </p>
        </div>
        <div className="px-5 py-2 rounded-2xl bg-blue-50 text-center min-w-16 content-end">
          <p className="text-xs font-bold text-blue-700 uppercase">Empates</p>
          <p className="font-mono text-3xl font-black text-blue-700">
            {scores.draws}
          </p>
        </div>
        <div className="px-5 py-2 rounded-2xl bg-emerald-50 text-center min-w-16">
          <p className="text-xs font-bold text-emerald-700 uppercase">O gana</p>
          <p className="font-mono text-3xl font-black text-emerald-700">
            {scores.o}
          </p>
        </div>
      </div>

      {isGameOver && (
        <Button className="mt-6" onClickValue={resetGame} value={"Nuevo juego"} />
      )}
    </section>
  );
}

export default TicTacToe;