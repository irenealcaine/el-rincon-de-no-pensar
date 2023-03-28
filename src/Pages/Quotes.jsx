import React from "react";
import Header from "../Components/Header";
import Quote from "../Components/Quote";

const Quotes = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"Frases célebres"} />
      <Quote />
    </div>
  );
};

export default Quotes;
