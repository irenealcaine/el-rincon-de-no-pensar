import React, { useState } from 'react';
import Button from './Button';

const ExerciseTable = () => {
  const [flexiones, setFlexiones] = useState(0);
  const [sentadillas, setSentadillas] = useState(0);
  const [abdominales, setAbdominales] = useState(0);
  const [mostrarTabla, setMostrarTabla] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'flexiones') {
      setFlexiones(parseInt(value));
    } else if (name === 'sentadillas') {
      setSentadillas(parseInt(value));
    } else if (name === 'abdominales') {
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
      fila.push(<th className='p-2 bg-blue-500/40 border border-black'> Semana {semana + 1}</th>);

      for (let dia = 1; dia <= 7; dia++) {
        if (dia === 3 || dia === 6) {
          fila.push(<td key={dia} className='italic p-2 border border-black'>Descanso</td>);
        }
        else {
          const ejercicio = (
            <div className='p-2'>
              {parseInt(flexiones + flexionesIncremento)} flexiones
              <br />
              {parseInt(sentadillas + sentadillasIncremento)} sentadillas
              <br />
              {parseInt(abdominales + abdominalesIncremento)} abdominales
            </div>
          );
          fila.push(<td key={dia} className='p-2 border border-black'>{ejercicio}</td>);
        }
      }

      tabla.push(<tr key={semana} className=''>{fila}</tr>);
    }

    return tabla;
  };

  return (
    <div>
      <div className='flex flex-col md:flex-row flex-wrap items-center md:justify-center gap-4'>
        <label>
          Flexiones:{" "}
          <input
            type="number"
            name="flexiones"
            value={flexiones}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Sentadillas:{" "}
          <input
            type="number"
            name="sentadillas"
            value={sentadillas}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Abdominales:{" "}
          <input
            type="number"
            name="abdominales"
            value={abdominales}
            onChange={handleInputChange}
          />
        </label>
        {/* <button onClick={generarTabla}>Generar Tabla</button> */}
        <Button onClickValue={generarTabla} value={"Generar tabla"} />
      </div>
      {mostrarTabla && (
        <table className='table-fixed mx-auto mt-4 border-collapse border border-black'>
          <tbody>{renderTabla()}</tbody>
        </table>
      )}
    </div>
  );
};

export default ExerciseTable;
