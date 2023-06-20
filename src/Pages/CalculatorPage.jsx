import React from 'react'
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Calculator from '../Components/Calculator';

const CalculatorPage = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"Calculadora"} />
      <Calculator />
      <Footer />
    </div>
  )
}

export default CalculatorPage
