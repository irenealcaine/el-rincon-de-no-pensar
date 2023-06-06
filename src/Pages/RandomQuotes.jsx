import React from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import RandomQuote from "../Components/RandomQuote";

const RandomQuotes = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"Frases célebres"} />
      <RandomQuote />
      <Footer />
    </div>
  );
};

export default RandomQuotes;
