import React, { useState } from "react";
import Quotes from "../data/Quotes.js";
import { AiOutlineClose, AiOutlineQuestion } from "react-icons/ai";
import Button from "./Button.jsx";

const MarqueeLights = () => {
  const lights = Array.from({ length: 28 });
  return (
    <div className="flex justify-between gap-1 px-3 py-2 bg-blue-900/90 rounded-t-3xl border-b border-yellow-400/30">
      {lights.map((_, index) => (
        <span
          key={index}
          className={`marquee-light w-1.5 h-1.5 rounded-full ${
            index % 2 === 0 ? "bg-yellow-400" : "bg-blue-300/70"
          }`}
          style={{ animationDelay: `${(index % 5) * 0.2}s` }}
        />
      ))}
    </div>
  );
};

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

  const quoteNumber = randomQuote
    ? Quotes.findIndex((quote) => quote === randomQuote) + 1
    : 0;

  return (
    <div className="relative flex flex-col items-center justify-start pt-2">
      <div className="mb-8">
        <Button
          onClickValue={generarFraseAleatoria}
          value={randomQuote ? "Generar otra frase" : "Generar frase aleatoria"}
        />
      </div>

      <div
        className={`relative w-11/12 max-w-3xl quote-container ${
          showQuote ? "show" : ""
        }`}
      >
        {randomQuote ? (
          <div className="quote-card relative bg-blue-900 shadow-2xl rounded-3xl">
            <MarqueeLights />

            <div className="px-6 md:px-12 py-10 md:py-14 text-center">
              <p className="text-2xl md:text-4xl lg:text-5xl uppercase font-bold font-oswald tracking-tighter leading-tight text-white">
                {randomQuote.quote}
              </p>
            </div>

            <div className="border-t-2 border-dashed border-yellow-400/40 bg-blue-900/60 px-6 py-4 flex flex-wrap items-center justify-between gap-3 rounded-b-3xl">
              <p className="italic text-blue-100/90 before:content-['—_']">
                {randomQuote.author}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-blue-100 text-xs font-bold tracking-widest">
                  {quoteNumber}/{Quotes.length}
                </span>
                <button
                  className="bg-blue-900 border border-yellow-400/50 text-yellow-300 hover:bg-yellow-400 hover:text-blue-900 hover:border-yellow-400 duration-500 font-bold p-2 rounded-full transition-200"
                  onClick={toggleShowExplanation}
                  title="¿Por qué?"
                >
                  {showExplanation ? <AiOutlineClose /> : <AiOutlineQuestion />}
                </button>
              </div>
            </div>

            {showExplanation && (
              <div className="px-6 md:px-12 py-6 text-center bg-blue-900 rounded-b-3xl">
                <p className="font-oswald text-lg md:text-xl text-yellow-200">
                  {randomQuote.inspiration}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="quote-card relative bg-blue-900 shadow-2xl rounded-3xl">
            <MarqueeLights />
            <p className="px-6 py-16 md:py-20 text-center text-blue-200/80 font-bold">
              El cartel está vacío... pulsa el botón para empezar la proyección.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RandomQuote;