import React from "react";
import Footer from "../Components/Footer";
import ColorPalette from "../Components/ColorPalette";
import PageIntro from "../Components/PageIntro";

const ColorPalettePage = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <PageIntro
          tagline={"~ juega con el color ~"}
          title={"Paleta de colores"}
          description={
            "Genera paletas de colores aleatorios, copia su código hexadecimal o RGB y guarda las que más te gusten."
          }
          backTo={"/projects"}
          backLabel={"Volver a proyectos"}
        />
        <ColorPalette />
      </main>
      <Footer />
    </div>
  );
};

export default ColorPalettePage;