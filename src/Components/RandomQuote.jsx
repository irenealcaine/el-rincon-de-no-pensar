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
      setShowExplanation(false);
    }, 300);

    setTimeout(() => {
      setShowQuote(true);
    }, 300);
  };

  const toggleShowExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  return (
    <div
      className={`min-h-[85vh] bg-blue-100 flex flex-col items-center justify-centerc relative`}
    >
      <div
        className={` w-10/12 md:w-9/12 quote-container ${
          showQuote ? "show" : ""
        }`}
      >
        {randomQuote && (
          <div className="mb-24 px-4 py-2 bg-blue-900 text-white rounded-lg text-center relative">
            <p
              className={`text-2xl md:text-6xl uppercase font-bold font-oswald tracking-tighter after:content-['"'] before:content-['"']`}
            >
              {randomQuote.quote}
            </p>
            <p className="mt-4 mb-8 text-right italic before:content-['-_']">
              {randomQuote.author}
            </p>
            <button
              className="absolute left-2 bottom-2 mt-8 bg-blue-900 border border-blue-400 hover:text-black duration-500 hover:bg-blue-400  font-bold py-1 px-3 rounded-full transition-200"
              onClick={toggleShowExplanation}
            >
              {showExplanation ? "X" : "?"}
            </button>
            {showExplanation && (
              <p className="font-oswald mt-8 mb-8 w-full md:w-8/12 mx-auto text-lg md:text-2xl text-blue-100 decoration-blue-600 decoration-2 underline">
                {randomQuote.inspiration}
              </p>
            )}
          </div>
        )}
      </div>

      <button
        className={`bg-blue-900 duration-500 hover:bg-blue-500 hover:text-blue-900 text-white font-bold py-2 px-4 rounded ${
          !randomQuote ? "" : "absolute bottom-10 right-1"
        }`}
        onClick={() => {
          generarFraseAleatoria();
        }}
      >
        {!randomQuote ? "Generar frase aleatoria" : "Generar otra frase"}
      </button>
    </div>
  );
};

export default RandomQuote;
