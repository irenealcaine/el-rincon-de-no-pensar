import React from "react";
import Header from "../Components/Header";
import menuItems from "../data/MenuItems";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"El rincón de no pensar"} />
      <div className="flex flex-col md:flex-row gap-8 justify-center">
      {
        menuItems.map((item)=>{
          return(
            <Link
            to={item.to}
            className="flex flex-col items-center text-blue-900">
              <p className="p-4 border-2 border-blue-900 rounded-full">{item.bigIcon}</p>
              <p className="">{item.title}</p>
            </Link>
          )
        })
      }
      </div>
    </div>
  );
};

export default Home;
