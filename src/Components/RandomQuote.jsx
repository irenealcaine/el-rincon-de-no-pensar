import React, { useState } from "react";
import Quotes from "../data/Quotes.js";

const RandomQuote = () => {
  const [fraseAleatoria, setFraseAleatoria] = useState("");
  const [mostrarExplicacion, setMostrarExplicacion] = useState(false);

  const generarFraseAleatoria = () => {
    const indiceAleatorio = Math.floor(Math.random() * Quotes.length);
    const frase = Quotes[indiceAleatorio];
    setFraseAleatoria(frase);
    setMostrarExplicacion(false);
  };
  const toggleMostrarExplicacion = () => {
    setMostrarExplicacion(!mostrarExplicacion);
  };

  return (
    <div className="bg-blue-100 flex flex-col items-center justify-center">
      {fraseAleatoria && (
        <div className="mb-8 px-4 py-2 bg-blue-900 text-white rounded-lg w-10/12 md:w-9/12 text-center">
          <p
            className={`text-3xl md:text-6xl uppercase font-bold font-oswald tracking-tighter after:content-['"'] before:content-['"']`}
          >
            {fraseAleatoria.randomQuote}
          </p>
          <p className="text-lg mt-4 text-right italic before:content-['-_']">
            {fraseAleatoria.author}
          </p>
          <button
            className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={toggleMostrarExplicacion}
          >
            {mostrarExplicacion
              ? "Ocultar explicación"
              : "¿Por qué me inspira?"}
          </button>
          {mostrarExplicacion && (
            <p className="mt-4 mb-8 w-10/12 px-4 py-2 mx-auto text-lg border-2 border-blue-300 rounded-xl">
              {fraseAleatoria.inspiration}
            </p>
          )}
        </div>
      )}

      <button
        className="bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
        onClick={generarFraseAleatoria}
      >
        {!fraseAleatoria ? "Generar frase aleatoria" : "Generar otra frase"}
      </button>
    </div>
  );
};

export default RandomQuote;
