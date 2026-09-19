import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Watch from "../Components/Watch";
import PageIntro from "../Components/PageIntro";

const WatchPage = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"Reloj"} />
      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <PageIntro
          tagline={"~ ¿qué hora es? ~"}
          title={"Reloj"}
          description={
            "Un reloj analógico hecho con React que marca la hora en tiempo real, con husos horarios."
          }
          backTo={"/components"}
          backLabel={"Volver a componentes"}
        />
        <Watch />
      </main>
      <Footer />
    </div>
  );
};

export default WatchPage;