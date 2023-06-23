import React, { useState } from "react";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import Chart from "chart.js/auto";
import Button from "./Button";

const WeightTable = () => {
  const [weightData, setWeightData] = useState([]);
  const [rowData, setRowData] = useState([{ date: "", weight: "", i: "" }]);
  const [dateWarning, setDateWarning] = useState("");

  const handleAddRow = () => {
    const newRow = { date: "", weight: "", i: "" };
    setRowData([...rowData, newRow]);
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
    const newWeightData = rowData.map((row, index) => ({
      i: parseFloat(index + 1),
      date: row.date,
      weight: parseFloat(row.weight),
    }));
    setWeightData(newWeightData);
  };

  const chartData = {
    labels: weightData.map((data) => data.date),
    datasets: [
      {
        label: "Peso",
        data: weightData.map((data) => data.weight),
        fill: true,
        borderColor: "rgb(37, 99, 235)",
        tension: 0.2,
        pointRadius: 1, // Tamaño de los puntos
        pointHoverRadius: 3,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Fecha",
        },
      },
      y: {
        title: {
          display: true,
          text: "Peso",
        },
      },
    },
  };

  return (
    <div className="container mx-auto p-4">
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th className="border p-2">Fecha</th>
            <th className="border p-2">Peso</th>
          </tr>
        </thead>
        <tbody>
          {rowData.map((row, index) => (
            <tr key={index}>
              <td className="border p-2">
                <input
                  type="date"
                  name="date"
                  value={row.date}
                  onChange={(e) => handleInputChange(e, index)}
                  className="w-full border-gray-300 p-1"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  name="weight"
                  value={row.weight}
                  onChange={(e) => handleInputChange(e, index)}
                  className="w-full border-gray-300 p-1"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {dateWarning && (
        <p className="text-red-500 font-bold mb-6 py-1 px-4 border border-red-500 rounded text-center">
          {dateWarning}
        </p>
      )}

      <div className="flex">
        <Button
          type={"green"}
          onClickValue={handleAddRow}
          value={"Agregar fila"}
          className={"mr-2"}
        />

        <Button onClickValue={handleSaveData} value={"Guardar cambios"} />
      </div>

      <div className="mt-4">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default WeightTable;
