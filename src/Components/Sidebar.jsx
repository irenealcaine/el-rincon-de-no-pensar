import React, { useState } from "react";
import { Link } from "react-router-dom";
import menuItems from "../data/MenuItems.js";
import { FaArrowLeft } from "react-icons/fa";
import { BsFillCaretUpFill } from "react-icons/bs";
import { GiSofa } from "react-icons/gi";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [gamesSubMenuOpen, setGamesSubMenuOpen] = useState(true);
  const [projectsSubMenuOpen, setProjectsSubMenuOpen] = useState(true);
  const [componentsSubMenuOpen, setComponentsSubMenuOpen] = useState(true);

  return (
    <div className="flex z-10 top-0 left-0 fixed md:relative font-caveat">
      <div
        className={`${
          open ? "w-60" : "w-12"
        } duration-200 h-screen p-2 pt-8 bg-blue-700 sticky top-0 left-0`}
      >
        <FaArrowLeft
          className={` duration-200 absolute cursor-pointer rounded-full -right-3 top-20 h-7 w-7 p-1 text-blue-200 border-2 border-blue-900 bg-blue-700 ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <Link
          to={"/"}
          className="flex items-center duration-200 hover:bg-blue-400 rounded-md text-blue-100 hover:text-blue-900"
        >
          <div className="flex gap-x-4 items-center ">
            <GiSofa
              className={`duration-500 w-8 h-8  p-1 ${
                open && "rotate-[360deg] md:w-12 md:h-12"
              }`}
            />
            <h1
              className={` origin-left font-medium text-3xl duration-200  ${
                !open && "scale-0"
              }`}
            >
              Inicio
            </h1>
          </div>
        </Link>

        <div className="pt-6">
          {menuItems.map((menuItem, index) => (
            <div key={index}>
              <Link
                to={menuItem.to}
                className="relative text-white text-bold text-lg flex items-center gap-x-4 cursor-pointer p-1 hover:bg-blue-400 hover:text-blue-900 duration-200 mt-4 rounded-md"
                onClick={() =>
                  menuItem.title === "Juegos"
                    ? setGamesSubMenuOpen(!gamesSubMenuOpen)
                    : menuItem.title === "Proyectos"
                    ? setProjectsSubMenuOpen(!projectsSubMenuOpen)
                    : menuItem.title === "Componentes" &&
                      setComponentsSubMenuOpen(!componentsSubMenuOpen)
                }
              >
                {menuItem.icon}
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {menuItem.title}
                </span>
                {menuItem.links && (
                  <BsFillCaretUpFill
                    className={`duration-200 cursor-pointer w-6 h-4 hover:h-6 absolute right-2
                    ${
                      menuItem.title === "Juegos"
                        ? gamesSubMenuOpen && "rotate-180"
                        : menuItem.title === "Proyectos"
                        ? projectsSubMenuOpen && "rotate-180"
                        : menuItem.title === "Componentes" &&
                          componentsSubMenuOpen &&
                          "rotate-180"
                    } ${!open && "hidden"}`}
                  />
                )}
              </Link>
              <div>
                {menuItem.links.map((link, subIndex) => (
                  <Link
                    key={subIndex}
                    to={link.to}
                    className={` text-blue-200 flex items-center gap-x-4 cursor-pointer p-1 hover:bg-blue-400 hover:text-blue-900 rounded-md duration-200  ${
                      menuItem.title === "Juegos"
                        ? gamesSubMenuOpen && "hidden"
                        : menuItem.title === "Proyectos"
                        ? projectsSubMenuOpen && "hidden"
                        : menuItem.title === "Componentes" &&
                          componentsSubMenuOpen &&
                          "hidden"
                    }`}
                  >
                    <span className={`${!open ? "mx-auto" : "ml-6"}`}>
                      {link.icon}
                    </span>
                    <span className={`${!open && "hidden"}`}>{link.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
