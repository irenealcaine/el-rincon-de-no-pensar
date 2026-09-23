import React from "react";
import Footer from "../Components/Footer";
import FAQ from "../Components/FAQ";
import PageIntro from "../Components/PageIntro";
import Faqs from "../data/Faqs";

const FAQPage = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <main className="max-w-3xl mx-auto px-4 md:px-8 pb-16">
        <PageIntro
          tagline={"~ resuelve tus dudas ~"}
          title={"Preguntas frecuentes"}
          description={
            "Respuestas a las dudas más comunes sobre este rincón, sus componentes y su funcionamiento."
          }
          backTo={"/components"}
          backLabel={"Volver a componentes"}
        />
        <FAQ faqs={Faqs} />
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;