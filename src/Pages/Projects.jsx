import React from "react";
import Header from "../Components/Header";
import menuItems from "../data/MenuItems";
import ListItems from "../Components/ListItems";

const Projects = () => {
  return (
    <div className="min-h-screen bg-blue-100">
      <Header title={"Proyectos"} />
      <ListItems mapItems={menuItems[0].links} />
    </div>
  );
};

export default Projects;
