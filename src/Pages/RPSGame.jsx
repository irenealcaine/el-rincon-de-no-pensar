import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import RPS from "../Components/RPS";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";

const RPSGame = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"Piedra papel tijeras"} />
      <Button
        type={"violet"}
        className={"ml-8"}
        onClickValue={() => {
          navigate("/games");
        }}
        value={"Juegos"}
      />
      <RPS />
      <Footer />
    </div>
  );
};

export default RPSGame;
