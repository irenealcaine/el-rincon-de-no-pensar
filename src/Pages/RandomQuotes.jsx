import React from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import RandomQuote from "../Components/RandomQuote";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";

const FilmStrip = ({ className }) => (
  <div
    className={`pointer-events-none hidden lg:flex flex-col justify-between py-8 gap-1.5 ${className}`}
  >
    {Array.from({ length: 24 }).map((_, index) => (
      <span key={index} className="w-4 h-4 rounded-sm bg-blue-900/10" />
    ))}
  </div>
);

const RandomQuotes = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"Frases célebres"} />
      <main className="relative max-w-6xl mx-auto px-4 md:px-8 pb-4">
        <FilmStrip className="absolute top-0 bottom-0 left-3" />
        <FilmStrip className="absolute top-0 bottom-0 right-3" />

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8 pb-6">
          <div>
            <p className="font-tictactoe text-blue-800/70 text-base tracking-wide">
              ~ la proyección de hoy ~
            </p>
            <p className="text-blue-900/60 mt-1 max-w-md">
              Citas célebres con su puntito de humor. Pulsa el botón a ver qué
              sale.
            </p>
          </div>
          <Button
            type={"violet"}
            onClickValue={() => {
              navigate("/projects");
            }}
            value={"Proyectos"}
          />
        </div>

        <RandomQuote />
      </main>
      <Footer />
    </div>
  );
};

export default RandomQuotes;