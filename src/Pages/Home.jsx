import React from "react";
import Header from "../Components/Header";
import Subtitle from "../Components/Subtitle";
import menuItems from "../data/MenuItems";
import { Link } from "react-router-dom";

const Home = () => {
  const introduction = `Bienvenidos a 'El Rincón de no pensar', un espacio virtual donde se encuentran proyectos pequeños pero llenos de encanto. Aquí, en esta acogedora web, les presento una colección de creaciones modestas que, aunque demasiado pequeñas para tener su propio sitio web, merecen ser apreciadas y compartidas. En este rincón digital, encontrarás una variedad de proyectos, componentes sueltos y juegos, todos ellos desarrollados con amor utilizando las tecnologías React y Tailwind CSS. ¡Espero que disfrutes de tu visita y encuentres inspiración en estos proyectos nacidos de la pasión por el desarrollo web!`;

  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"El rincón de no pensar"} />
      <Subtitle subtitle={introduction} />
      <div className="flex flex-wrap gap-8 justify-center px-8">
        {menuItems.map((item) => {
          return (
            <div className="">
              <Link
                to={item.to}
                className=" flex flex-col items-center text-blue-900"
              >
                <p className="p-4 border-2 border-blue-900 rounded-full hover:bg-blue-500 hover:text-white transition duration-300 shadow-blue-500/50">
                  {item.bigIcon}
                </p>
                <p className="font-bold text-xl">{item.title}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
