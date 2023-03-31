import React, { useState } from "react";
import { Link } from "react-router-dom";
import Menus from "../data/Menus.js";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  return (
    <div className="flex z-10 top-0 left-0 fixed md:relative font-caveat">
      <div
        className={`${
          open ? "w-60" : "w-16"
        } duration-200 h-screen p-2 pt-8 bg-blue-700 sticky top-0 left-0`}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/109/109618.png"
          alt="/"
          className={` duration-200 absolute cursor-pointer rounded-full -right-3 top-20 h-8 p-1 border-2 border-blue-900 bg-blue-700 ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <Link
          to={"/"}
          className="flex items-center duration-200 hover:bg-blue-400 rounded-md text-blue-100 hover:text-blue-900"
        >
          <div className="flex gap-x-4 items-center ">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5169/5169265.png"
              alt="/"
              className={`duration-500 w-12 p-1 ${open && "rotate-[360deg]"}`}
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

        <ul className="pt-6">
          {Menus.map((menu, index) => (
            <div>
              <Link
                to={`${menu.to}`}
                key={index}
                className={`text-blue-100 text-lg flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-400 hover:text-blue-900 duration-200 mt-2 rounded-md`}
              >
                <img src={menu.src} className="w-8" alt="/" />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {" "}
                  {menu.title}
                </span>
                {menu.submenu ? (
                  <img
                    alt="/"
                    src="https://cdn-icons-png.flaticon.com/512/25/25637.png"
                    onClick={() => setSubMenuOpen(!subMenuOpen)}
                    className={`duration-200 cursor-pointer w-12 h-4 hover:h-6 ${
                      !subMenuOpen && "rotate-180"
                    } ${!open && "hidden"}`}
                  />
                ) : (
                  ""
                )}
              </Link>
              {menu.submenu ? (
                <ul>
                  {menu.submenu.map((submenu, index) => (
                    <Link
                      to={`${menu.to}/${submenu.to}`}
                      className={`text-blue-100 flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-400 hover:text-blue-900 rounded-md duration-200 ml-10 ${
                        !open && "hidden"
                      } ${subMenuOpen ? "block" : "hidden"}`}
                    >
                      <img src={submenu.src} alt="/" className="h-4" />

                      {submenu.title}
                    </Link>
                  ))}
                </ul>
              ) : (
                ""
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
