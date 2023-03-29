import React from "react";
import Header from "../Components/Header";
import RandomQuote from "../Components/RandomQuote";

const RandomQuotes = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"Frases célebres"} />
      <RandomQuote />
    </div>
  );
};

export default RandomQuotes;
