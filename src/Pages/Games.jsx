import React from "react";
import Header from "../Components/Header";
import menuItems from "../data/MenuItems";
import ListItems from "../Components/ListItems";
import Footer from "../Components/Footer";
import Subtitle from "../Components/Subtitle";


const Games = () => {
  return (
    <div className="min-h-screen bg-blue-100">
      <Header title={"Juegos"} />
      <Subtitle subtitle={"Recopilación de juegos, he de decir que ha sido mas divertido crearlos que jugarlos, pero ahí están, para que otros se entretengan."}/>
      <ListItems mapItems={menuItems[2].links} />
      <Footer />
    </div>
  );
};

export default Games;
