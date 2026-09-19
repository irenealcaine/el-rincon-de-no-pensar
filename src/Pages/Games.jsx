import React from "react";
import Header from "../Components/Header";
import menuItems from "../data/MenuItems";
import ListItems from "../Components/ListItems";
import Footer from "../Components/Footer";
import PageIntro from "../Components/PageIntro";

const Games = () => {
  return (
    <div className="min-h-screen bg-blue-100">
      <Header title={"Juegos"} />
      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <PageIntro
          tagline={"~ vicio sano ~"}
          title={"Juegos"}
          description={
            "Recopilación de juegos, he de decir que ha sido mas divertido crearlos que jugarlos, pero ahí están, para que otros se entretengan."
          }
          backTo={"/"}
          backLabel={"Volver al inicio"}
        />
        <ListItems mapItems={menuItems[2].links} />
      </main>
      <Footer />
    </div>
  );
};

export default Games;