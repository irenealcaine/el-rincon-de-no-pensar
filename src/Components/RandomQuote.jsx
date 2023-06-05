import React, { useState } from "react";
import Quotes from "../data/Quotes.js";
import { AiOutlineClose, AiOutlineQuestion } from "react-icons/ai";
import Button from "./Button.jsx";

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
    <div className={`pb-16 flex flex-col items-center justify-start relative`}>
      <div
        className={` w-10/12 md:w-9/12 quote-container ${
          showQuote ? "show" : ""
        }`}
      >
        {randomQuote && (
          <div className="px-4 py-2 bg-blue-900 text-white rounded-lg text-center relative">
            <p
              className={`text-2xl md:text-6xl uppercase font-bold font-oswald tracking-tighter after:content-['"'] before:content-['"']`}
            >
              {randomQuote.quote}
            </p>
            <p className="mt-4 mb-8 text-right italic before:content-['-_']">
              {randomQuote.author}
            </p>
            <button
              className="absolute left-2 bottom-2 mt-8 bg-blue-900 border border-blue-400 hover:text-black duration-500 hover:bg-blue-400  font-bold p-1 rounded-full transition-200"
              onClick={toggleShowExplanation}
            >
              {showExplanation ? <AiOutlineClose /> : <AiOutlineQuestion />}
            </button>
            {showExplanation && (
              <p className="font-oswald mt-8 mb-8 w-full md:w-8/12 mx-auto text-lg md:text-2xl text-blue-100 decoration-blue-600 decoration-2 underline">
                {randomQuote.inspiration}
              </p>
            )}
          </div>
        )}
      </div>

      <Button
        className={!randomQuote ? "" : "absolute bottom-1 right-4"}
        onClickValue={() => {
          generarFraseAleatoria();
        }}
        value={!randomQuote ? "Generar frase aleatoria" : "Generar otra frase"}
      />
    </div>
  );
};

export default RandomQuote;
