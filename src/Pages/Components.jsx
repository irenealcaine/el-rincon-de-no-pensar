import React from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import ListItems from "../Components/ListItems";
import PageIntro from "../Components/PageIntro";
import menuItems from "../data/MenuItems";
import HiperLink from "../Components/HiperLink";

const Components = () => {
  return (
    <div className="min-h-screen bg-blue-100">
      <Header title={"Componentes"} />
      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <PageIntro
          tagline={"~ piezas sueltas ~"}
          title={"Componentes"}
          description={
            "Algunos componentes de React sueltos que tengo esperanza de reciclar algún día. La mayoría de componentes de esta página no aparecen en esta sección (el sidebar, el botón...), pero siempre puedes echales un vistazo en el repositorio de la web."
          }
          backTo={"/"}
          backLabel={"Volver al inicio"}
        />
        <div className="w-full text-center mb-4">
          <HiperLink
            href={"https://github.com/irenealcaine/el-rincon-de-no-pensar"}
            text={"Repositorio"}
          />
        </div>
        <ListItems mapItems={menuItems[1].links} />
      </main>
      <Footer />
    </div>
  );
};

export default Components;