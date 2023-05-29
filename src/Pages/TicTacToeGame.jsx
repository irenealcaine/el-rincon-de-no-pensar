import React from "react";
import Header from "../Components/Header";
import TicTacToe from "../Components/TicTacToe";

const TicTacToeGame = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"Tic Tac Toe"} />
      <div className="flex flex-wrap flex-col md:flex-row items-center md:justify-center p-4 gap-4 md:gap-6 lg:gap-8 ">
        <TicTacToe />
      </div>
    </div>
  );
};

export default TicTacToeGame;
