import React from "react";
import Footer from "../Components/Footer";
import ExpenseSplitter from "../Components/ExpenseSplitter";
import PageIntro from "../Components/PageIntro";

const ExpenseSplitterPage = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <PageIntro
          tagline={"~ cada quien su parte ~"}
          title={"Repartir gastos"}
          description={
            "Añade a tu grupo, apunta quién pagó qué y mira quién debe a quién, con la forma más justa de saldar cuentas."
          }
          backTo={"/projects"}
          backLabel={"Volver a proyectos"}
        />
        <ExpenseSplitter />
      </main>
      <Footer />
    </div>
  );
};

export default ExpenseSplitterPage;