import React from "react";
import Footer from "../Components/Footer";
import Snake from "../Components/Snake";
import PageIntro from "../Components/PageIntro";

const SnakeGame = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <PageIntro
          tagline={"~ cómete la manzana ~"}
          title={"La serpiente"}
          description={
            "Guía a la serpiente para que coma sin chocarse con las paredes ni consigo misma. Cada bocado la acelera un poco más."
          }
          backTo={"/games"}
          backLabel={"Volver a juegos"}
        />
        <Snake />
      </main>
      <Footer />
    </div>
  );
};

export default SnakeGame;