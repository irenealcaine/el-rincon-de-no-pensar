import React, { useState } from "react";
import { Line } from "react-chartjs-2";
// tslint:disable:no-unused-variable 
import Chart from "chart.js/auto";
// import { differenceInDays } from "date-fns";

const WeightTable = () => {
  const [weightData, setWeightData] = useState([]);
  const [rowData, setRowData] = useState([{ date: "", weight: "", i: "" }]);

  // useEffect(() => {
  //   Chart.register(Chart.controllers.line);
  // }, []);

  const handleAddRow = () => {
    const newRow = { date: "", weight: "", i: "" };
    setRowData([...rowData, newRow]);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedRowData = [...rowData];
    // const currentDate = new Date(value);

    // const previousDates = updatedRowData
    //   .slice(0, index)
    //   .map((row) => new Date(row.date));

    // const isDateValid = previousDates.every((date) => currentDate >= date);

    // if (!isDateValid) {
    //   alert("La fecha no puede ser anterior a las fechas anteriores.");
    //   return;
    // }

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

  // const adjustChartData = (data) => {
  //   const adjustedData = [];

  //   for (let i = 0; i < data.length; i++) {
  //     adjustedData.push(data[i]);

  //     if (i < data.length - 1) {
  //       const currentDate = new Date(data[i].date);
  //       const nextDate = new Date(data[i + 1].date);
  //       const difference = differenceInDays(nextDate, currentDate);

  //       if (difference > 1) {
  //         for (let j = 1; j < difference; j++) {
  //           const intermediateDate = new Date(currentDate);
  //           intermediateDate.setDate(currentDate.getDate() + j);

  //           adjustedData.push({
  //             i: parseFloat(i + 1) + parseFloat(j) / (difference + 1),
  //             date: intermediateDate,
  //             weight: null,
  //           });
  //         }
  //       }
  //     }
  //   }

  //   return adjustedData;
  // };

  const chartData = {
    labels: weightData.map((data) => data.date),
    datasets: [
      {
        label: "Peso",
        data: weightData.map((data) => data.weight),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
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
      <div className="flex">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={handleAddRow}
        >
          Agregar Fila
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSaveData}
        >
          Guardar Datos
        </button>
      </div>

      <div className="mt-4">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default WeightTable;
