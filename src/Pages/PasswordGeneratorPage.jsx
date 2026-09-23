import React from "react";
import Footer from "../Components/Footer";
import PasswordGenerator from "../Components/PasswordGenerator";
import PageIntro from "../Components/PageIntro";

const PasswordGeneratorPage = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <PageIntro
          tagline={"~ una clave fuerte, una cosa menos ~"}
          title={"Generador de contraseñas"}
          description={
            "Crea contraseñas seguras al instante: elige la longitud, los tipos de caracteres y mira el nivel de seguridad."
          }
          backTo={"/projects"}
          backLabel={"Volver a proyectos"}
        />
        <PasswordGenerator />
      </main>
      <Footer />
    </div>
  );
};

export default PasswordGeneratorPage;