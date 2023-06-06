import React from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import TicTacToe from "../Components/TicTacToe";

const TicTacToeGame = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"3 en raya"} />
      <div className="flex flex-wrap flex-col md:flex-row items-center md:justify-center p-4 gap-4 md:gap-6 lg:gap-8 ">
        <TicTacToe />
      </div>
      <Footer />
    </div>
  );
};

export default TicTacToeGame;
