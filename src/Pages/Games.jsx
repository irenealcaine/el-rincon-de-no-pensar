import React from "react";
import Header from "../Components/Header";
import menuItems from "../data/MenuItems";
import ListItems from "../Components/ListItems";

const Games = () => {
  return (
    <div className="min-h-screen bg-blue-100">
      <Header title={"Juegos"} />
      <ListItems mapItems={menuItems[2].links} />
    </div>
  );
};

export default Games;
