import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import menuItems from "../data/MenuItems";
import ListItems from "../Components/ListItems";
import Subtitle from "../Components/Subtitle";

const Projects = () => {
  return (
    <div className="min-h-screen bg-blue-100">
      <Header title={"Proyectos"} />
      <Subtitle
        subtitle={
          "Estos son mis proyectos, ejercicios que hago para pacticar pero no lo suficiemtemente elaborados o complejos para crear su propia web. Pásate por un blog con textos genéricos puramente escritos por chatGPT y por el generador de mis frases célebres favoritas mostradas de manera aleatoria."
        }
      />
      <ListItems mapItems={menuItems[0].links} />
      <Footer />
    </div>
  );
};

export default Projects;
