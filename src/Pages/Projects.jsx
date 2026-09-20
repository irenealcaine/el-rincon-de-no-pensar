import React from "react";
import Footer from "../Components/Footer";
import menuItems from "../data/MenuItems";
import ListItems from "../Components/ListItems";
import PageIntro from "../Components/PageIntro";

const Projects = () => {
  return (
    <div className="texture-grain min-h-screen bg-blue-100">
      <main className="mx-auto max-w-6xl px-4 pb-24 md:px-8">
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