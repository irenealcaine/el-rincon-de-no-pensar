import React from "react";
import Footer from "../Components/Footer";
import RandomQuote from "../Components/RandomQuote";
import PageIntro from "../Components/PageIntro";

const RandomQuotes = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <main className="relative max-w-6xl mx-auto px-4 md:px-8 pb-4">
        <PageIntro
          tagline={"~ la proyección de hoy ~"}
          title={"Frases célebres"}
          description={
            "Citas célebres con su puntito de humor. Pulsa el botón a ver qué sale."
          }
          backTo={"/projects"}
          backLabel={"Volver a proyectos"}
        />

        <RandomQuote />
      </main>
      <Footer />
    </div>
  );
};

export default RandomQuotes;