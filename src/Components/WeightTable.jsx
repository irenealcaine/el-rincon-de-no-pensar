import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";
import Button from "./Button";
import Toast from "./Toast";
import Tabs from "./Tabs";
import useToast from "../Hooks/useToast";
import { FiClipboard, FiTrendingUp } from "react-icons/fi";

const STORAGE_KEY = "weightTracker";

const loadStoredData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const WeightTable = () => {
  const [weightData, setWeightData] = useState(
    () => loadStoredData()?.weightData ?? []
  );
  const [rowData, setRowData] = useState(() => {
    const stored = loadStoredData();
    return stored?.rowData?.length
      ? stored.rowData
      : [{ date: "", weight: "", i: "" }];
  });
  const [dateWarning, setDateWarning] = useState("");
  const [showEditor, setShowEditor] = useState(() => {
    const stored = loadStoredData();
    return !(stored?.weightData?.length > 0);
  });
  const { toasts, showToast, dismiss } = useToast();

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-");
    return `${d}/${m}/${y}`;
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ rowData, weightData }));
    } catch {
      // localStorage no disponible (modo privado, etc.)
    }
  }, [rowData, weightData]);

  const handleAddRow = () => {
    const newRow = { date: "", weight: "", i: "" };
    setRowData([...rowData, newRow]);
    showToast("Fila añadida", "info");
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedRowData = [...rowData];

    // Check if the entered date is earlier than previous dates
    if (name === "date" && index > 0) {
      const previousDates = updatedRowData
        .slice(0, index)
        .map((row) => row.date);
      if (previousDates.some((date) => date > value)) {
        setDateWarning("¡La fecha es anterior a las fechas anteriores!");
        showToast("La fecha es anterior a las fechas anteriores", "error");
      } else {
        setDateWarning("");
      }
    }

    updatedRowData[index] = {
      ...updatedRowData[index],
      [name]: value,
      i: index + 1,
    };
    setRowData(updatedRowData);
  };

  const handleSaveData = () => {
    const newWeightData = rowData
      .filter((row) => row.date && row.weight !== "")
      .map((row, index) => ({
        i: parseFloat(index + 1),
        date: row.date,
        weight: parseFloat(row.weight),
      }));
    setWeightData(newWeightData);
    setShowEditor(false);
    showToast("Pesos guardados correctamente", "success");
  };

  const chartData = {
    datasets: [
      {
        label: "Peso",
        data: weightData.map((data) => ({ x: data.date, y: data.weight })),
        fill: true,
        backgroundColor: "rgba(37, 99, 235, 0.15)",
        borderColor: "rgb(37, 99, 235)",
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: "rgb(37, 99, 235)",
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          displayFormats: {
            day: "dd/MM",
          },
          tooltipFormat: "dd/MM/yyyy",
        },
        title: {
          display: true,
          text: "Fecha",
        },
        grid: {
          color: "rgba(30, 58, 138, 0.08)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Peso (kg)",
        },
        grid: {
          color: "rgba(30, 58, 138, 0.08)",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.parsed.y} kg`,
        },
      },
    },
  };

  return (
    <div className="pb-16">
      <section className="bg-white rounded-3xl shadow-lg p-4 md:p-6">
        <Tabs
          tabs={[
            {
              label: "Registro",
              icon: <FiClipboard />,
              content: (
                <>
                  {showEditor || weightData.length === 0 ? (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-black text-blue-900">
                          Registro
                        </h2>
                        {weightData.length > 0 && (
                          <button
                            onClick={() => setShowEditor(false)}
                            className="text-sm font-bold text-blue-800 hover:text-blue-600 transition"
                          >
                            ← Ver datos guardados
                          </button>
                        )}
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-blue-900 text-white">
                              <th className="p-3 text-left font-bold rounded-l-xl w-1/2">
                                Fecha
                              </th>
                              <th className="p-3 text-left font-bold rounded-r-xl w-1/2">
                                Peso (kg)
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {rowData.map((row, index) => (
                              <tr
                                key={index}
                                className="border-b border-blue-900/10 last:border-0"
                              >
                                <td className="p-3">
                                  <input
                                    type="date"
                                    name="date"
                                    value={row.date}
                                    onChange={(e) => handleInputChange(e, index)}
                                    className="w-full rounded-lg border border-blue-900/10 bg-blue-50/50 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/40"
                                  />
                                </td>
                                <td className="p-3">
                                  <input
                                    type="number"
                                    step="0.1"
                                    name="weight"
                                    value={row.weight}
                                    onChange={(e) => handleInputChange(e, index)}
                                    className="w-full rounded-lg border border-blue-900/10 bg-blue-50/50 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/40"
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {dateWarning && (
                        <p className="mt-4 text-red-700 font-bold bg-red-50 border border-red-200 rounded-xl py-2 px-4 text-center">
                          {dateWarning}
                        </p>
                      )}

                      <div className="mt-4 flex flex-col sm:flex-row gap-3">
                        <Button
                          type={"green"}
                          onClickValue={handleAddRow}
                          value={"Agregar fila"}
                        />
                        <Button
                          onClickValue={handleSaveData}
                          value={"Guardar cambios"}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xl font-black text-blue-900">
                          Datos guardados
                        </h2>
                        <span className="text-sm font-bold text-blue-900/80">
                          {weightData.length}{" "}
                          {weightData.length === 1 ? "entrada" : "entradas"}
                        </span>
                      </div>

                      <div className="max-h-96 overflow-y-auto rounded-xl border border-blue-900/10">
                        <table className="w-full text-sm">
                          <thead className="sticky top-0 bg-blue-900 text-white">
                            <tr>
                              <th className="p-2 text-left font-bold">#</th>
                              <th className="p-2 text-left font-bold">Fecha</th>
                              <th className="p-2 text-left font-bold">
                                Peso (kg)
                              </th>
                              <th className="p-2 text-left font-bold">Δ</th>
                            </tr>
                          </thead>
                          <tbody>
                            {weightData.map((data, index) => {
                              const prev =
                                index > 0 ? weightData[index - 1].weight : null;
                              const delta =
                                prev !== null ? data.weight - prev : null;
                              return (
                                <tr
                                  key={index}
                                  className="border-b border-blue-900/5 last:border-0 hover:bg-blue-50/50"
                                >
                                  <td className="p-2 text-blue-900/80">
                                    {index + 1}
                                  </td>
                                  <td className="p-2 font-medium text-blue-900">
                                    {formatDate(data.date)}
                                  </td>
                                  <td className="p-2 font-bold text-blue-900">
                                    {data.weight} kg
                                  </td>
                                  <td className="p-2">
                                    {delta !== null && (
                                      <span
                                        className={
                                          delta > 0
                                            ? "text-red-700"
                                            : delta < 0
                                            ? "text-emerald-700"
                                            : "text-blue-900/80"
                                        }
                                      >
                                        {delta > 0 ? "+" : ""}
                                        {delta.toFixed(1)} kg
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      <button
                        onClick={() => setShowEditor(true)}
                        className="mt-4 rounded-full bg-blue-800 text-white font-bold px-6 py-2.5 hover:bg-blue-900 transition active:scale-95"
                      >
                        Añadir / editar datos
                      </button>
                    </>
                  )}
                </>
              ),
            },
            {
              label: "Evolución",
              icon: <FiTrendingUp />,
              content: (
                <>
                  <h2 className="text-xl font-black text-blue-900 mb-4">
                    Evolución
                  </h2>
                  {weightData.length > 0 ? (
                    <div className="h-80">
                      <Line data={chartData} options={chartOptions} />
                    </div>
                  ) : (
                    <p className="text-blue-900/80 text-center py-16">
                      Añade filas, pulsa "Guardar cambios" y aquí verás la
                      evolución de tu peso.
                    </p>
                  )}
                </>
              ),
            },
          ]}
        />
      </section>
      <Toast toasts={toasts} onDismiss={dismiss} />
    </div>
  );
};

export default WeightTable;