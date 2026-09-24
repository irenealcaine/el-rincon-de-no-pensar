import React from "react";
import Footer from "../Components/Footer";
import Minesweeper from "../Components/Minesweeper";
import PageIntro from "../Components/PageIntro";

const MinesweeperGame = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <PageIntro
          tagline={"~ no pises la mina ~"}
          title={"Buscaminas"}
          description={
            "Descubre casillas, usa los números como pistas y marca las minas con banderas antes de que se te acabe la suerte."
          }
          backTo={"/games"}
          backLabel={"Volver a juegos"}
        />
        <Minesweeper />
      </main>
      <Footer />
    </div>
  );
};

export default MinesweeperGame;