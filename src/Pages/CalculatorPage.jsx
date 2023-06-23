import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Calculator from "../Components/Calculator";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";

const CalculatorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"Calculadora"} />
      <Button
        type={"violet"}
        className={"ml-8"}
        onClickValue={() => {
          navigate("/components");
        }}
        value={"Componentes"}
      />
      <Calculator />
      <Footer />
    </div>
  );
};

export default CalculatorPage;
