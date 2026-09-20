import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import menuItems from "../data/MenuItems.js";
import { FaArrowLeft } from "react-icons/fa";
import { BsFillCaretUpFill } from "react-icons/bs";
import { GiSofa } from "react-icons/gi";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [gamesSubMenuOpen, setGamesSubMenuOpen] = useState(true);
  const [projectsSubMenuOpen, setProjectsSubMenuOpen] = useState(true);
  const [componentsSubMenuOpen, setComponentsSubMenuOpen] = useState(true);

  const location = useLocation();

  const isCurrentPage = (menuItem) => {
    return location.pathname === menuItem.to;
  };

  const toggleSection = (section) => {
    if (section === "Juegos") {
      setGamesSubMenuOpen((prev) => !prev);
      setProjectsSubMenuOpen(true);
      setComponentsSubMenuOpen(true);
    } else if (section === "Proyectos") {
      setProjectsSubMenuOpen((prev) => !prev);
      setGamesSubMenuOpen(true);
      setComponentsSubMenuOpen(true);
    } else if (section === "Componentes") {
      setComponentsSubMenuOpen((prev) => !prev);
      setGamesSubMenuOpen(true);
      setProjectsSubMenuOpen(true);
    }
  };

  return (
    <div className="flex z-10 top-0 left-0 fixed md:relative">
      <div
        className={`${
          open ? "w-60" : "w-12"
        } duration-300 h-screen p-2 pt-8 bg-gradient-to-b from-ink to-[#141b24] shadow-2xl sticky top-0 left-0`}
      >
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú lateral" : "Abrir menú lateral"}
          aria-expanded={open}
          className="absolute -right-3 top-20 rounded-full border-2 border-clay/60 bg-ink p-0 text-paper-100 shadow-md transition duration-200 hover:scale-110 hover:bg-clay focus:outline-none focus:ring-2 focus:ring-paper-300"
        >
          <FaArrowLeft
            className={`duration-200 h-7 w-7 cursor-pointer rounded-full p-1 ${
              !open && "rotate-180"
            }`}
          />
        </button>
        <Link
          to={"/"}
          className="flex items-center duration-200 hover:bg-white/10 rounded-xl text-paper-100 hover:text-white"
        >
          <div className="flex gap-x-3 items-center px-1">
            <GiSofa
              className={`duration-500 w-8 h-8 p-1 ${
                open && "rotate-[360deg] md:w-12 md:h-12"
              }`}
            />
            <p
              className={`origin-left font-bold text-2xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              Inicio
            </p>
          </div>
        </Link>

        <div className="pt-6">
          {menuItems.map((menuItem, index) => (
            <div key={index}>
              <Link
                to={menuItem.to}
                aria-label={menuItem.title}
                className={`relative text-paper-100/80 font-semibold text-lg flex items-center gap-x-3 cursor-pointer p-2 hover:bg-white/10 hover:text-white duration-200 mt-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-paper-300 ${
                  isCurrentPage(menuItem) && "bg-clay text-white shadow-lg"
                } ${!open && "justify-center px-0"}`}
                onClick={() => toggleSection(menuItem.title)}
              >
                <span
                  className={`${
                    isCurrentPage(menuItem) ? "text-white" : "text-paper-100/70"
                  }`}
                >
                  {menuItem.icon}
                </span>
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {menuItem.title}
                </span>
                {menuItem.links && (
                  <BsFillCaretUpFill
                    className={`duration-200 cursor-pointer w-6 h-4 absolute right-2 ${
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
                    aria-label={link.title}
                    className={`mt-0.5 text-paper-100/80 flex items-center gap-x-3 cursor-pointer p-1.5 hover:bg-white/10 hover:text-white rounded-lg duration-200 focus:outline-none focus:ring-2 focus:ring-paper-300 ${
                      menuItem.title === "Juegos"
                        ? gamesSubMenuOpen && "hidden"
                        : menuItem.title === "Proyectos"
                        ? projectsSubMenuOpen && "hidden"
                        : menuItem.title === "Componentes" &&
                          componentsSubMenuOpen &&
                          "hidden"
                    } ${isCurrentPage(link) && "bg-clay text-white"}`}
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