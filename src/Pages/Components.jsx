import React from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import menuItems from "../data/MenuItems";

const Components = () => {
  return (
    <div className="min-h-screen bg-blue-100">
      <Header title={"Componentes"} />
      <div className="flex flex-col md:flex-row gap-8 justify-center">
        {menuItems[1].links.map((item) => {
          return (
            <Link
              to={item.to}
              className="flex flex-col items-center text-blue-900 "
            >
              <p className="p-4 border-2 border-blue-900 rounded-full hover:bg-blue-500 hover:text-white transition duration-300">
                {item.bigIcon}
              </p>
              <p className="font-bold text-xl">{item.title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Components;
