import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import menuItems from "../data/MenuItems";
import ListItems from "../Components/ListItems";
import PageIntro from "../Components/PageIntro";

const Projects = () => {
  return (
    <div className="min-h-screen bg-blue-100">
      <Header title={"Proyectos"} />
      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <PageIntro
          tagline={"~ cosas pequeñas con encanto ~"}
          title={"Proyectos"}
          description={
            "Estos son mis proyectos, ejercicios que hago para practicar pero no lo suficientemente elaborados o complejos para crear su propia web."
          }
          backTo={"/"}
          backLabel={"Volver al inicio"}
        />
        <ListItems mapItems={menuItems[0].links} />
      </main>
      <Footer />
    </div>
  );
};

export default Projects;