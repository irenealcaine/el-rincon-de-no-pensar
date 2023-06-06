import React from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import ListItems from "../Components/ListItems";
import Subtitle from "../Components/Subtitle";
import menuItems from "../data/MenuItems";

const Components = () => {
  return (
    <div className="min-h-screen bg-blue-100">
      <Header title={"Componentes"} />
      <Subtitle
        subtitle={
          "Algunos componentes de React sueltos que tengo esperanza de reciclar algún día. La mayoría de componentes de esta página no aparecen en esta sección (el sidebar, el botón...), pero siempre puedes echales un vistazo en el repositorio de la web."
        }
      />
      <div className="w-full text-center mb-4">
        <a href="https://github.com/irenealcaine/el-rincon-de-no-pensar">
          Repositorio
        </a>
      </div>
      <ListItems mapItems={menuItems[1].links} />
      <Footer />
    </div>
  );
};

export default Components;
