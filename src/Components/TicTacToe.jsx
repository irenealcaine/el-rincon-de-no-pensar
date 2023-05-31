import React, { useState } from "react";

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [draws, setDraws] = useState(0);
  const [playerXWins, setPlayerXWins] = useState(0);
  const [playerOWins, setPlayerOWins] = useState(0);

  const handleClick = (index) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const calculatedWinner = calculateWinner(newBoard);
    if (calculatedWinner) {
      setWinner(calculatedWinner);
      if (calculatedWinner === "X") {
        setPlayerXWins((prevWins) => prevWins + 1);
      } else if (calculatedWinner === "O") {
        setPlayerOWins((prevWins) => prevWins + 1);
      }
    } else if (newBoard.every((square) => square !== null)) {
      setDraws((prevDraws) => prevDraws + 1);
    }
  };

  const renderSquare = (index) => {
    const value = board[index];
    const isX = value === "X";
    const textStyle = isX ? "text-red-500" : "text-green-500";

    return (
      <div
        className={`border border-blue-300 w-16 md:w-24 lg:w-32 aspect-square flex justify-center items-center text-2xl md:text-4xl lg:text-6xl font-bold cursor-pointer ${textStyle}`}
        onClick={() => handleClick(index)}
      >
        {value}
      </div>
    );
  };

  const isGameOver = winner || board.every((square) => square !== null);
  const status = isGameOver
    ? winner
      ? `Ganador: ${winner}`
      : "Es un empate!"
    : `Siguiente jugador: ${xIsNext ? "X" : "O"}`;

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

      <div>
        <div>Gana X: {playerXWins}</div>
        <div>Gana O: {playerOWins}</div>
        <div>Draws: {draws}</div>
      </div>

      <div>
        {isGameOver && (
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded-md"
            onClick={() => {
              setBoard(Array(9).fill(null));
              setWinner(null);
            }}
          >
            New Game
          </button>
        )}
      </div>
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
