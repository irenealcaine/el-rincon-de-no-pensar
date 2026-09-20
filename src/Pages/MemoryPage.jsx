import React from "react";
import Footer from "../Components/Footer";
import MemoryGame from "../Components/MemoryGame";
import PageIntro from "../Components/PageIntro";

const MemoryPage = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <PageIntro
          tagline={"~ memoriza y encuentra ~"}
          title={"Parejas"}
          description={
            "Encuentra todas las parejas de cartas. Mejor suerte que memoria."
          }
          backTo={"/games"}
          backLabel={"Volver a juegos"}
        />
        <MemoryGame />
      </main>
      <Footer />
    </div>
  );
};

export default MemoryPage;