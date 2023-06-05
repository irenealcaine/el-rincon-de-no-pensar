import React from "react";
import Header from "../Components/Header";
import ListItems from "../Components/ListItems";
import menuItems from "../data/MenuItems";

const Components = () => {
  return (
    <div className="min-h-screen bg-blue-100">
      <Header title={"Componentes"} />
      <ListItems mapItems={menuItems[1].links} />
    </div>
  );
};

export default Components;
