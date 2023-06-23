import React from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import RandomQuote from "../Components/RandomQuote";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";

const RandomQuotes = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"Frases célebres"} />
      <Button
        type={"violet"}
        className={"ml-8"}
        onClickValue={() => {
          navigate("/projects");
        }}
        value={"Proyectos"}
      />
      <RandomQuote />
      <Footer />
    </div>
  );
};

export default RandomQuotes;
