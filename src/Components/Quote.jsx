import React from "react";
import RandomQuotes from "../data/RandomQuotes.js";

const Quote = () => {
  return (
    <div className="p-4">
      {RandomQuotes.map((quote, index) => (
        <div>
          <p className=" text-center text-xl">{quote.randomQuote}</p>
          <p className="uppercase text-right">{quote.author}</p>
        </div>
      ))}
    </div>
  );
};

export default Quote;
