import React from "react";
import Footer from "../Components/Footer";
import SimonSays from "../Components/SimonSays";
import PageIntro from "../Components/PageIntro";

const SimonSaysGame = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <PageIntro
          tagline={"~ mira, memoriza, repite ~"}
          title={"Simón dice"}
          description={
            "Memoriza la secuencia de colores cada vez más larga y no falles. Con sonido y todo."
          }
          backTo={"/games"}
          backLabel={"Volver a juegos"}
        />
        <SimonSays />
      </main>
      <Footer />
    </div>
  );
};

export default SimonSaysGame;