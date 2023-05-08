import React from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import menuItems from '../data/MenuItems'

const Projects = () => {
  return (
    <div className="min-h-screen bg-blue-100">
      <Header title={"Proyectos"} />
      <div className="flex flex-col md:flex-row gap-8 justify-center">
      {
        menuItems[0].links.map((item)=>{
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

export default Projects;
