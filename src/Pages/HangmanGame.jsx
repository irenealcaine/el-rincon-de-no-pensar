import React from "react";
import Footer from "../Components/Footer";
import Hangman from "../Components/Hangman";
import PageIntro from "../Components/PageIntro";

const HangmanGame = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <PageIntro
          tagline={"~ adivina la palabra ~"}
          title={"El ahorcado"}
          description={
            "Adivina la palabra oculta letra a letra antes de que se complete el muñeco."
          }
          backTo={"/games"}
          backLabel={"Volver a juegos"}
        />
        <Hangman />
      </main>
      <Footer />
    </div>
  );
};

export default HangmanGame;