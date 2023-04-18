import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Menus from "../data/Menus.js";
import { FaDragon, FaArrowLeft, FaGamepad } from "react-icons/fa";
import { BsChatQuote, BsFillCaretUpFill } from "react-icons/bs";
import { TfiClose } from "react-icons/tfi";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { CgNotes } from "react-icons/cg";
import { TbPuzzle } from "react-icons/tb";
import { MdOutlineWatchLater } from "react-icons/md";

const menuItems = [
  {
    title: "Juegos",
    icon: <FaGamepad className="w-8 h-8" />,
    to: "/games",
    links: [
      {
        title: "Tic-tac-toe",
        to: "/games/tic-tac-toe",
        icon: <TfiClose className="h-6" />,
      },
    ],
  },
  {
    title: "Proyectos",
    icon: <AiOutlineFundProjectionScreen className="w-8 h-8" />,
    to: "/projects",
    links: [
      {
        title: "Blog",
        to: "/projects/blog",
        icon: <CgNotes className="h-6" />,
      },
      {
        title: "Frases célebres",
        to: "/projects/quotes",
        icon: <BsChatQuote className="h-6" />,
      },
    ],
  },
  {
    title: "Componentes",
    icon: <TbPuzzle className="w-8 h-8" />,
    to: "/components",
    links: [
      {
        title: "Reloj",
        to: "/components/watch",
        icon: <MdOutlineWatchLater className="h-6" />,
      },
    ],
  },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [gamesSubMenuOpen, setGamesSubMenuOpen] = useState(true);
  const [projectsSubMenuOpen, setProjectsSubMenuOpen] = useState(true);
  const [componentsSubMenuOpen, setComponentsSubMenuOpen] = useState(true);

  return (
    <div className="flex z-10 top-0 left-0 fixed md:relative font-caveat">
      <div
        className={`${open ? "w-60" : "w-16"
          } duration-200 h-screen p-2 pt-8 bg-blue-700 sticky top-0 left-0`}
      >
        <FaArrowLeft
          className={` duration-200 absolute cursor-pointer rounded-full -right-3 top-20 h-7 w-7 p-1 text-blue-200 border-2 border-blue-900 bg-blue-700 ${!open && "rotate-180"
            }`}
          onClick={() => setOpen(!open)}
        />
        <Link
          to={"/"}
          className="flex items-center duration-200 hover:bg-blue-400 rounded-md text-blue-100 hover:text-blue-900"
        >
          <div className="flex gap-x-4 items-center ">
            <FaDragon
              className={`duration-500 w-12 h-12 p-1 ${open && "rotate-[360deg]"
                }`}
            />
            <h1
              className={` origin-left font-medium text-3xl duration-200  ${!open && "scale-0"
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
                className="relative text-blue-100 text-lg flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-400 hover:text-blue-900 duration-200 mt-2 rounded-md"
                onClick={() =>
                  // setGamesSubMenuOpen(!gamesSubMenuOpen)
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
                {/* <BsFillCaretDownFill
                  className={`duration-200 cursor-pointer w-6 h-4 hover:h-6 absolute right-2 ${gamesSubMenuOpen && "rotate-180"
                    } ${!open && "hidden"}`}
                /> */}
                {menuItem.links && (
                  <BsFillCaretUpFill
                    className={`duration-200 cursor-pointer w-6 h-4 hover:h-6 absolute right-2
                    ${menuItem.title === "Juegos"
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
                    className={` text-blue-100 flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-400 hover:text-blue-900 rounded-md duration-200 ml-10 ${!open && "hidden"
                      } ${
                      // gamesSubMenuOpen ? "block" : "hidden"
                      menuItem.title === "Juegos"
                        ? gamesSubMenuOpen && "hidden"
                        : menuItem.title === "Proyectos"
                          ? projectsSubMenuOpen && "hidden"
                          : menuItem.title === "Componentes" &&
                          componentsSubMenuOpen &&
                          "hidden"
                      }`}
                  >
                    {link.icon}
                    {link.title}
                    {/* {menuItem.links && (
                      <BsFillCaretDownFill
                        className={`duration-200 cursor-pointer w-6 h-4 hover:h-6 absolute right-2 ${menuItem.subMenu === "games"
                            ? gamesSubMenuOpen && "rotate-180"
                            : menuItem.subMenu === "projects"
                              ? projectsSubMenuOpen && "rotate-180"
                              : menuItem.subMenu === "components" &&
                              componentsSubMenuOpen &&
                              "rotate-180"
                          } ${!open && "hidden"}`}
                      />
                    )} */}
                  </Link>
                ))}
              </div>

            </div>
          ))}
          {/* <div>
            <Link
              to="/games"
              className="relative text-blue-100 text-lg flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-400 hover:text-blue-900 duration-200 mt-2 rounded-md"
              onClick={() => setGamesSubMenuOpen(!gamesSubMenuOpen)}
            >
              <FaGamepad className="w-8 h-8" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Juegos
              </span>
              <BsFillCaretDownFill
                className={`duration-200 cursor-pointer w-6 h-4 hover:h-6 absolute right-2 ${
                  gamesSubMenuOpen && "rotate-180"
                } ${!open && "hidden"}`}
              />
            </Link>
            <div>
              <Link
                to="/games/tic-tac-toe"
                className={`text-blue-100 flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-400 hover:text-blue-900 rounded-md duration-200 ml-10 ${
                  !open && "hidden"
                } ${gamesSubMenuOpen ? "block" : "hidden"}`}
              >
                <TfiClose className="h-6" />
                Tic-tac-toe
              </Link>
            </div>
          </div>

          <div>
            <Link
              to="/projects"
              className="relative text-blue-100 text-lg flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-400 hover:text-blue-900 duration-200 mt-2 rounded-md"
              onClick={() => setProjectsSubMenuOpen(!projectsSubMenuOpen)}
            >
              <AiOutlineFundProjectionScreen className="w-8 h-8" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Proyectos
              </span>
              <BsFillCaretDownFill
                className={`duration-200 cursor-pointer w-6 h-4 hover:h-6 absolute right-2 ${
                  projectsSubMenuOpen && "rotate-180"
                } ${!open && "hidden"}`}
              />
            </Link>
            <div>
              <Link
                to="/projects/blog"
                className={`text-blue-100 flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-400 hover:text-blue-900 rounded-md duration-200 ml-10 ${
                  !open && "hidden"
                } ${projectsSubMenuOpen ? "block" : "hidden"}`}
              >
                <CgNotes className="h-6" />
                Blog
              </Link>
              <Link
                to="/projects/quotes"
                className={`text-blue-100 flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-400 hover:text-blue-900 rounded-md duration-200 ml-10 ${
                  !open && "hidden"
                } ${projectsSubMenuOpen ? "block" : "hidden"}`}
              >
                <BsChatQuote className="h-6" />
                Frases célebres
              </Link>
            </div>
          </div>

          <div>
            <Link
              to="/components"
              className="relative text-blue-100 text-lg flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-400 hover:text-blue-900 duration-200 mt-2 rounded-md"
              onClick={() => setComponentsSubMenuOpen(!componentsSubMenuOpen)}
            >
              <TbPuzzle className="w-8 h-8" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Componentes
              </span>
              <BsFillCaretDownFill
                className={`duration-200 cursor-pointer w-6 h-4 hover:h-6 absolute right-2 ${
                  componentsSubMenuOpen && "rotate-180"
                } ${!open && "hidden"}`}
              />
            </Link>
            <div>
              <Link
                to="/components/watch"
                className={`text-blue-100 flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-400 hover:text-blue-900 rounded-md duration-200 ml-10 ${
                  !open && "hidden"
                } ${componentsSubMenuOpen ? "block" : "hidden"}`}
              >
                <MdOutlineWatchLater className="h-6" />
                Reloj
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
