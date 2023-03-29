import React, { useState } from "react";
import Quotes from "../data/Quotes.js";

const RandomQuote = () => {
  const [randomQuote, setRandomQuote] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  const generarFraseAleatoria = () => {
    const randomIndex = Math.floor(Math.random() * Quotes.length);
    const selectedQuote = Quotes[randomIndex];
    setRandomQuote(selectedQuote);
    setShowExplanation(false);
  };
  const toggleShowExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  return (
    <div className="bg-blue-100 flex flex-col items-center justify-center">
      {randomQuote && (
        <div className="mb-8 px-4 py-2 bg-blue-900 text-white rounded-lg w-10/12 md:w-9/12 text-center">
          <p
            className={`text-3xl md:text-6xl uppercase font-bold font-oswald tracking-tighter after:content-['"'] before:content-['"']`}
          >
            {/* {randomQuote.quote}
            H<span>o</span>la */}
            {/* {<div>H{<span>o</span>}la</div>} */}
            {randomQuote.quote}
          </p>
          <p className="text-lg mt-4 text-right italic before:content-['-_']">
            {randomQuote.author}
          </p>
          <button
            className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={toggleShowExplanation}
          >
            {showExplanation ? "Ocultar explicación" : "¿Por qué me inspira?"}
          </button>
          {showExplanation && (
            <p className="mt-4 mb-8 w-10/12 px-4 py-2 mx-auto text-lg border-2 border-blue-300 rounded-xl">
              {randomQuote.inspiration}
            </p>
          )}
        </div>
      )}

      <button
        className="bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
        onClick={generarFraseAleatoria}
      >
        {!randomQuote ? "Generar frase aleatoria" : "Generar otra frase"}
      </button>
    </div>
  );
};

export default RandomQuote;
