import { useState } from "react";
import clsx from "clsx";

const X_CLASS = "text-red-500";
const O_CLASS = "text-blue-500";

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (index) => {
    const value = board[index];
    const classes = clsx(
      "border-2 border-gray-300 w-16 h-16 flex justify-center items-center text-2xl font-bold cursor-pointer",
      {
        [X_CLASS]: value === "X",
        [O_CLASS]: value === "O",
      }
    );
    return (
      <div className={classes} onClick={() => handleClick(index)}>
        {value}
      </div>
    );
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="flex">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="flex">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div className="my-4">{status}</div>
      <button
        className="bg-gray-400 text-white px-4 py-2 rounded-md"
        onClick={() => setBoard(Array(9).fill(null))}
      >
        Reset
      </button>
    </div>
  );
}

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
      return board[a];
    }
  }
  return null;
}

export default TicTacToe;
