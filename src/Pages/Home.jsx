import React from "react";
import Header from "../Components/Header";
import Subtitle from "../Components/Subtitle";
import menuItems from "../data/MenuItems";
import ListItems from "../Components/ListItems";

const Home = () => {
  const introduction1 = `Bienvenidos a 'El Rincón de no pensar', un espacio virtual donde se encuentran proyectos pequeños pero llenos de encanto. Aquí, en esta acogedora web, les presento una colección de creaciones modestas que, aunque demasiado pequeñas para tener su propio sitio web, merecen ser apreciadas y compartidas.`;
  const introduction2 = `En este rincón digital, encontrarás una variedad de proyectos, componentes sueltos y juegos, todos ellos desarrollados con amor utilizando las tecnologías React y Tailwind CSS. ¡Espero que disfrutes de tu visita y encuentres inspiración en estos proyectos nacidos de la pasión por el desarrollo web!`;

  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"El rincón de no pensar"} />
      <Subtitle subtitle={introduction1} />
      <ListItems mapItems={menuItems} />
      <Subtitle subtitle={introduction2} />
      <p>Contacto:</p>
    </div>
  );
};

export default Home;
