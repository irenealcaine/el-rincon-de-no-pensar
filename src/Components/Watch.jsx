import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import PageIntro from "./PageIntro";

const Watch = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourDegrees = hours * 30 + minutes * 0.5 + 180;
  const minuteDegrees = minutes * 6 + seconds * 0.1 + 180;
  const secondDegrees = seconds * 6 + 180;

  return (
    <div className="min-h-screen bg-blue-100">
      <Header title={"Reloj"} />
      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <PageIntro
          tagline={"~ ¿qué hora es? ~"}
          title={"Reloj"}
          description={
            "Un reloj analógico hecho con React que marca la hora en tiempo real."
          }
          backTo={"/components"}
          backLabel={"Volver a componentes"}
        />
        <div className="h-full flex justify-center items-center">
          <div className="relative w-72 h-72 rounded-full border-4 border-blue-500 bg-white">
            <div
              className="absolute top-1/2 left-1/2 w-0.5 h-16 bg-blue-700 rounded transform -translate-x-1/2 translate-y-full"
              style={{
                transform: `rotate(${hourDegrees}deg)`,
                transformOrigin: "top",
              }}
            />
            <div
              className="absolute top-1/2 left-1/2 w-0.5 h-28 bg-blue-700 rounded "
              style={{
                transform: `rotate(${minuteDegrees}deg)`,
                transformOrigin: "top",
              }}
            />
            <div
              className="absolute top-1/2 left-1/2 w-0.5 h-32 bg-blue-200 rounded transform -translate-x-1/2 translate-y-full"
              style={{
                transform: `rotate(${secondDegrees}deg)`,
                transformOrigin: "top",
              }}
            />
            <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-blue-100 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Watch;