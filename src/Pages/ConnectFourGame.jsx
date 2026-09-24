import React from "react";
import Footer from "../Components/Footer";
import ConnectFour from "../Components/ConnectFour";
import PageIntro from "../Components/PageIntro";

const ConnectFourGame = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <PageIntro
          tagline={"~ cuatro en raya, pero vertical ~"}
          title={"Conecta 4"}
          description={
            "Tira tus fichas, alinea cuatro de tu color y gana. Para dos jugadores, en el mismo sitio."
          }
          backTo={"/games"}
          backLabel={"Volver a juegos"}
        />
        <ConnectFour />
      </main>
      <Footer />
    </div>
  );
};

export default ConnectFourGame;