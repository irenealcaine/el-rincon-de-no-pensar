import React from "react";
import Header from "../Components/Header";
import Subtitle from "../Components/Subtitle";
import menuItems from "../data/MenuItems";
import ListItems from "../Components/ListItems";
import { GoMail } from "react-icons/go";

const Home = () => {
  const introduction1 = `Bienvenidos a 'El Rincón de no pensar', una web donde se encuentran proyectos pequeños pero llenos de encanto, todos ellos hecos con React y Tailwind. Aquí, presento una colección de creaciones modestas que, aunque demasiado pequeñas para tener su propio sitio web, merecen ser apreciadas y compartidas.`;

  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"El rincón de no pensar"} />
      <Subtitle subtitle={introduction1} />
      <ListItems mapItems={menuItems} />
      <p className="px-8 pt-4">
        Todo el código está disponible en{" "}
        <a
          href="https://github.com/irenealcaine/el-rincon-de-no-pensar"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Github
        </a>
        , siéntete libre de curiosear
      </p>
      <p className="px-8 py-4">
        Contacto:{" "}
        <a
          href="mailto:irenealcainealvarez@gmail.com"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          <GoMail className="inline-block" /> irenealcainealvarez@gmail.com
        </a>
      </p>
    </div>
  );
};

export default Home;
