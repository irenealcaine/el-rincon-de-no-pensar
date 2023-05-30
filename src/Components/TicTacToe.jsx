import React, { useState } from "react";

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

    return (
      <>
        <div
          className={`border border-blue-300 w-16 md:w-24 lg:w-32 aspect-square flex justify-center items-center text-2xl md:text-4xl lg:text-6xl font-bold cursor-pointer ${
            value === "X" ? "text-red-500" : "text-green-500"
          }`}
          onClick={() => handleClick(index)}
        >
          {value}
        </div>
      </>
    );
  };

  const winner = calculateWinner(board);
  const isGameOver = winner || board.every((square) => square !== null);
  const status = isGameOver
    ? winner
      ? `Winner: ${winner}`
      : "It's a tie!"
    : `Next player: ${xIsNext ? "X" : "O"}`;
    
  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        {[0, 1, 2].map((index) => renderSquare(index))}
      </div>
      <div className="flex">
        {[3, 4, 5].map((index) => renderSquare(index))}
      </div>
      <div className="flex">
        {[6, 7, 8].map((index) => renderSquare(index))}
      </div>
      <div className="my-4">{status}</div>
      {isGameOver && (
        <button
          className="bg-blue-400 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-500"
          onClick={() => setBoard(Array(9).fill(null))}
        >
          Reset
        </button>
      )}
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
