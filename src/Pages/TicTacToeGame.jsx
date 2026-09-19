import React from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import TicTacToe from "../Components/TicTacToe";
import PageIntro from "../Components/PageIntro";

const TicTacToeGame = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"3 en raya"} />
      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <PageIntro
          tagline={"~ a ver quién gana ~"}
          title={"3 en raya"}
          description={
            "El clásico tres en raya para dos jugadores. Turnos, risas y alguna que otra trampa."
          }
          backTo={"/games"}
          backLabel={"Volver a juegos"}
        />
        <div className="flex flex-wrap flex-col md:flex-row items-center md:justify-center gap-4 md:gap-6 lg:gap-8">
          <TicTacToe />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TicTacToeGame;