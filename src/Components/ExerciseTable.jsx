import React, { useState } from "react";
import Button from "./Button";
import Subtitle from "./Subtitle";

const ExerciseTable = () => {
  const [flexiones, setFlexiones] = useState(0);
  const [sentadillas, setSentadillas] = useState(0);
  const [abdominales, setAbdominales] = useState(0);
  const [mostrarTabla, setMostrarTabla] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "flexiones") {
      setFlexiones(parseInt(value));
    } else if (name === "sentadillas") {
      setSentadillas(parseInt(value));
    } else if (name === "abdominales") {
      setAbdominales(parseInt(value));
    }
  };

  const generarTabla = () => {
    setMostrarTabla(true);
  };

  const renderTabla = () => {
    const tabla = [];
    let flexionesIncremento = 0;
    let sentadillasIncremento = 0;
    let abdominalesIncremento = 0;

    for (let semana = 0; semana <= 3; semana++) {
      const fila = [];

      if (semana >= 1) {
        flexionesIncremento += flexiones * 0.1;
        sentadillasIncremento += sentadillas * 0.2;
        abdominalesIncremento += abdominales * 0.25;
      }
      fila.push(
        <div className="p-4 bg-blue-500/40 border border-blue-300 font-bold">
          {" "}
          Semana {semana + 1}
        </div>
      );

      for (let dia = 1; dia <= 7; dia++) {
        if (dia === 3 || dia === 6) {
          fila.push(
            <div
              key={dia}
              className="italic p-4 border border-blue-300 text-center"
            >
              Descanso
            </div>
          );
        } else {
          const ejercicio = (
            <div className="p-2">
              {parseInt(flexiones + flexionesIncremento)} flex.
              <br />
              {parseInt(sentadillas + sentadillasIncremento)} sent.
              <br />
              {parseInt(abdominales + abdominalesIncremento)} abd.
            </div>
          );
          fila.push(
            <div key={dia} className="p-2 border border-blue-300">
              {ejercicio}
            </div>
          );
        }
      }

      tabla.push(
        <div key={semana} className="flex flex-col md:flex-row">
          {fila}
        </div>
      );
    }

    return tabla;
  };

  return (
    <div>
      <Subtitle subtitle={"¿Cuántas repeticiones eres capaz de hacer?"} />
      <div className="flex flex-col md:flex-row flex-wrap items-center md:justify-center gap-4">
        <label className="w-7/12 md:w-auto">
          Flexiones:{" "}
          <input
            type="number"
            name="flexiones"
            value={flexiones}
            onChange={handleInputChange}
            className={"px-4 w-full md:w-auto rounded border border-blue-700"}
          />
        </label>
        <label className="w-7/12 md:w-auto">
          Sentadillas:{" "}
          <input
            type="number"
            name="sentadillas"
            value={sentadillas}
            onChange={handleInputChange}
            className={"px-4 w-full md:w-auto rounded border border-blue-700"}
          />
        </label>
        <label className="w-7/12 md:w-auto">
          Abdominales:{" "}
          <input
            type="number"
            name="abdominales"
            value={abdominales}
            onChange={handleInputChange}
            className={"px-4 w-full md:w-auto rounded border border-blue-700"}
          />
        </label>

        <Button onClickValue={generarTabla} value={"Generar tabla"} />
      </div>
      {mostrarTabla && (
        <div>
          <p className="indent-2 mt-4 w-10/12 md:w-7/12 mx-auto">
            A continuación se muestra una tabla de entrenamiento mde 28 días,
            donde aumenta la intensidad cada semana
          </p>
          <p className="indent-2 mt-2 w-10/12 md:w-7/12 mx-auto">
            Recuerda que esto es orientativo, yo no tengo ni idea de nada de
            esto.
          </p>
          <div className="mx-auto w-10/12 mt-4">
            <div>{renderTabla()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseTable;
