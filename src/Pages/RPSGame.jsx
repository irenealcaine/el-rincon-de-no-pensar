import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import RPS from "../Components/RPS";
import PageIntro from "../Components/PageIntro";

const RPSGame = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"Piedra papel tijeras"} />
      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <PageIntro
          tagline={"~ elige bien ~"}
          title={"Piedra, papel o tijeras"}
          description={
            "El juego de siempre, ahora contra la máquina. ¿Serás capaz de ganarle?"
          }
          backTo={"/games"}
          backLabel={"Volver a juegos"}
        />
        <RPS />
      </main>
      <Footer />
    </div>
  );
};

export default RPSGame;