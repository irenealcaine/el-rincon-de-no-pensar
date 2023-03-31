import React, { useState } from "react";
import Quotes from "../data/Quotes.js";

const RandomQuote = () => {
  const [randomQuote, setRandomQuote] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  const generarFraseAleatoria = () => {
    const randomIndex = Math.floor(Math.random() * Quotes.length);
    const selectedQuote = Quotes[randomIndex];
    setShowQuote(false);
    setTimeout(() => {
      setRandomQuote(selectedQuote);
    }, 500);

    setTimeout(() => {
      setShowQuote(true);
    }, 500);
  };

  const aparecer = () => {
    // setTimeout(() => {
    //   setShowQuote(true);
    // }, 1000);
  };

  const toggleShowExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  return (
    <div className="bg-blue-100 flex flex-col items-center justify-center">
      <div
        className={` w-10/12 md:w-9/12 quote-container ${
          showQuote ? "show" : ""
        }`}
      >
        {randomQuote && (
          <div className="mb-8 px-4 py-2 bg-blue-900 text-white rounded-lg text-center">
            <p
              className={`text-3xl md:text-6xl uppercase font-bold font-oswald tracking-tighter after:content-['"'] before:content-['"']`}
            >
              {randomQuote.quote}
            </p>
            <p className="text-lg mt-4 text-right italic before:content-['-_']">
              {randomQuote.author}
            </p>
            <button
              className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition-200"
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
      </div>

      <button
        className="bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          generarFraseAleatoria();
          aparecer();
        }}
      >
        {!randomQuote ? "Generar frase aleatoria" : "Generar otra frase"}
      </button>
    </div>
  );
};

export default RandomQuote;
