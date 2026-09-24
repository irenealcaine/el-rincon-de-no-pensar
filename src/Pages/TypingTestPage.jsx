import React from "react";
import Footer from "../Components/Footer";
import TypingTest from "../Components/TypingTest";
import PageIntro from "../Components/PageIntro";

const TypingTestPage = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <PageIntro
          tagline={"~ teclas sueltas, dedos listos ~"}
          title={"Mecanografía"}
          description={
            "Practica tu velocidad de escritura con textos generados al azar. Mide tus PPM, precisión y bate tu récord."
          }
          backTo={"/projects"}
          backLabel={"Volver a proyectos"}
        />
        <TypingTest />
      </main>
      <Footer />
    </div>
  );
};

export default TypingTestPage;