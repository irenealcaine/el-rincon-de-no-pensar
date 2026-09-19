import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Timer from "../Components/Timer";
import PageIntro from "../Components/PageIntro";

const TimerPage = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"Temporizador pomodoro"} />
      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <PageIntro
          tagline={"~ concéntrate ~"}
          title={"Temporizador pomodoro"}
          description={
            "Gestiona intervalos de trabajo y descanso con la técnica pomodoro."
          }
          backTo={"/components"}
          backLabel={"Volver a componentes"}
        />
        <Timer />
      </main>
      <Footer />
    </div>
  );
};

export default TimerPage;