import React from "react";
import Header from "../Components/Header";
import Subtitle from "../Components/Subtitle";
import HiperLink from "../Components/HiperLink";
import menuItems from "../data/MenuItems";
import ListItems from "../Components/ListItems";

const Home = () => {
  const introduction1 = `Bienvenidos a 'El Rincón de no pensar', una web donde se encuentran proyectos pequeños pero llenos de encanto, todos ellos hecos con React y Tailwind. Aquí, presento una colección de creaciones modestas que, aunque demasiado pequeñas para tener su propio sitio web, merecen ser apreciadas y compartidas.`;

  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"El rincón de no pensar"} />
      <Subtitle subtitle={introduction1} />
      <ListItems mapItems={menuItems} />
      <p className="text-center mt-8 px-8 pt-4 md:w-6/12 mx-auto">
        Todo el código está disponible en{" "}
        <HiperLink
          href={"https://github.com/irenealcaine/el-rincon-de-no-pensar"}
          text={"Github"}
        />
        , siéntete libre de curiosear
      </p>

      <p className="text-center px-8 pt-4 md:w-6/12 mx-auto">
        Échale un ojo tambien a mi{" "}
        <HiperLink
          href={"https://irenealcainealvarez.es/"}
          text={"web personal"}
        />
        .
      </p>

      <p className="text-center px-8 py-4 md:w-6/12 mx-auto">
        Contacto:{" "}
        <HiperLink
          href={"mailto:irenealcainealvarez@gmail.com"}
          text={"irenealcainealvarez@gmail.com"}
        />
      </p>
    </div>
  );
};

export default Home;
