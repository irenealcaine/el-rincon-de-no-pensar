import React, { useState } from "react";
import Button from "./Button";

const ExerciseTable = () => {
  const [flexiones, setFlexiones] = useState(0);
  const [sentadillas, setSentadillas] = useState(0);
  const [abdominales, setAbdominales] = useState(0);
  const [mostrarTabla, setMostrarTabla] = useState(false);

  const dias = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

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

  const semanas = [];
  let flexionesIncremento = 0;
  let sentadillasIncremento = 0;
  let abdominalesIncremento = 0;

  for (let semana = 0; semana < 4; semana++) {
    if (semana >= 1) {
      flexionesIncremento += flexiones * 0.1;
      sentadillasIncremento += sentadillas * 0.2;
      abdominalesIncremento += abdominales * 0.25;
    }
    semanas.push({
      numero: semana + 1,
      flexiones: parseInt(flexiones + flexionesIncremento),
      sentadillas: parseInt(sentadillas + sentadillasIncremento),
      abdominales: parseInt(abdominales + abdominalesIncremento),
    });
  }

  const inputs = [
    { name: "flexiones", label: "Flexiones", value: flexiones },
    { name: "sentadillas", label: "Sentadillas", value: sentadillas },
    { name: "abdominales", label: "Abdominales", value: abdominales },
  ];

  return (
    <div className="pb-16">
      <section className="bg-white rounded-3xl shadow-lg p-6 md:p-8 mb-8">
        <h2 className="text-xl font-black text-blue-900">
          ¿Cuántas repeticiones eres capaz de hacer?
        </h2>
        <p className="text-blue-900/80 text-sm mt-1 mb-6">
          Introduce tus marcas y genera un plan de entrenamiento de 4 semanas.
        </p>

        <div className="flex flex-col md:flex-row md:items-end gap-4">
          {inputs.map((input) => (
            <label key={input.name} className="flex-1 w-full">
              <span className="block text-sm font-bold text-blue-900/80 mb-1">
                {input.label}
              </span>
              <input
                type="number"
                min="0"
                name={input.name}
                value={input.value}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-blue-900/10 bg-blue-50/50 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/40"
              />
            </label>
          ))}
          <Button onClickValue={generarTabla} value={"Generar tabla"} />
        </div>
      </section>

      {mostrarTabla && (
        <section className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
          <h2 className="text-xl font-black text-blue-900">Tu plan de 28 días</h2>
          <p className="text-blue-900/80 text-sm mt-1 mb-6">
            La intensidad aumenta cada semana. Recuerda que esto es orientativo,
            yo no tengo ni idea de nada de esto.
          </p>

          <div className="space-y-4">
            {semanas.map((semana) => (
              <div
                key={semana.numero}
                className="rounded-2xl border border-blue-900/10 overflow-hidden"
              >
                <div className="bg-blue-900 text-white px-4 py-2.5 font-black">
                  Semana {semana.numero}
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-7 gap-px bg-blue-900/10">
                  {dias.map((dia, index) => {
                    const diaNumero = index + 1;
                    const descanso = diaNumero === 3 || diaNumero === 6;
                    return (
                      <div
                        key={dia}
                        className={`p-3 ${
                          descanso ? "bg-blue-50/70" : "bg-white"
                        }`}
                      >
                        <p className="font-bold text-sm text-blue-900">
                          {dia}
                        </p>
                        {descanso ? (
                          <p className="italic text-blue-900/80 text-sm mt-1">
                            Descanso
                          </p>
                        ) : (
                          <div className="mt-1 space-y-0.5 text-sm font-medium">
                            <p>
                              <span className="font-bold text-emerald-700">
                                flex.
                              </span>{" "}
                              {semana.flexiones}
                            </p>
                            <p>
                              <span className="font-bold text-sky-700">
                                sent.
                              </span>{" "}
                              {semana.sentadillas}
                            </p>
                            <p>
                              <span className="font-bold text-violet-700">
                                abd.
                              </span>{" "}
                              {semana.abdominales}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ExerciseTable;