import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import menuItems from "../data/MenuItems";
import ListItems from "../Components/ListItems";

const Projects = () => {
  return (
    <div className="min-h-screen bg-blue-100">
      <Header title={"Proyectos"} />
      <ListItems mapItems={menuItems[0].links} />
      <Footer/>
    </div>
  );
};

export default Projects;
