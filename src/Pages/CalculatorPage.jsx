import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Calculator from "../Components/Calculator";
import PageIntro from "../Components/PageIntro";

const CalculatorPage = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"Calculadora"} />
      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <PageIntro
          tagline={"~ echa cuentas ~"}
          title={"Calculadora"}
          description={
            "Una calculadora sencilla hecha con React y Tailwind para operaciones del día a día."
          }
          backTo={"/components"}
          backLabel={"Volver a componentes"}
        />
        <Calculator />
      </main>
      <Footer />
    </div>
  );
};

export default CalculatorPage;