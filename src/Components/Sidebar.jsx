import React, { useState } from "react";
import { Link } from "react-router-dom";
import Menus from "../data/Menus.js";
import { FaDragon, FaArrowLeft, FaGamepad } from "react-icons/fa";
import { BsChatQuote, BsFillCaretDownFill } from "react-icons/bs";
import { TfiClose } from "react-icons/tfi";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { CgNotes } from "react-icons/cg";
import { TbPuzzle } from "react-icons/tb";
import { MdOutlineWatchLater } from "react-icons/md";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [gamesSubMenuOpen, setGamesSubMenuOpen] = useState(false);
  const [projectsSubMenuOpen, setProjectsSubMenuOpen] = useState(false);
  const [componentsSubMenuOpen, setComponentsSubMenuOpen] = useState(false);

  return (
    <div className="flex z-10 top-0 left-0 fixed md:relative font-caveat">
      <div
        className={`${
          open ? "w-60" : "w-16"
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
            <FaDragon
              className={`duration-500 w-12 h-12 p-1 ${
                open && "rotate-[360deg]"
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
          <div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
