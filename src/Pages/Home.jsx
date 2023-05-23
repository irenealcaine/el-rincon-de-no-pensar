import React from "react";
import Header from "../Components/Header";
import menuItems from "../data/MenuItems";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"El rincón de no pensar"} />
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
