import React from "react";
import Footer from "../Components/Footer";
import Pong from "../Components/Pong";
import PageIntro from "../Components/PageIntro";

const PongGame = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <PageIntro
          tagline={"~ tú contra la máquina ~"}
          title={"Pong"}
          description={
            "El clásico de las arcades: devuelve la pelota con tu pala y llega a 5 puntos antes que la máquina."
          }
          backTo={"/games"}
          backLabel={"Volver a juegos"}
        />
        <Pong />
      </main>
      <Footer />
    </div>
  );
};

export default PongGame;