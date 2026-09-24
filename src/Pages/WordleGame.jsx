import React from "react";
import Footer from "../Components/Footer";
import Wordle from "../Components/Wordle";
import PageIntro from "../Components/PageIntro";

const WordleGame = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <PageIntro
          tagline={"~ cinco letras, seis intentos ~"}
          title={"Wordle"}
          description={
            "Adivina la palabra oculta de cinco letras. Cada intento te da pistas: verde, amarillo o gris."
          }
          backTo={"/games"}
          backLabel={"Volver a juegos"}
        />
        <Wordle />
      </main>
      <Footer />
    </div>
  );
};

export default WordleGame;