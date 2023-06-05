import React, { useState, useEffect } from "react";
import Button from "./Button";

const IdleGame = () => {
  const [score, setScore] = useState(0);
  const [base, setBase] = useState({ level: 0, cost: 100 });
  const [bonus1, setBonus1] = useState({ level: 0, cost: 15, base: 15 });
  const [bonus2, setBonus2] = useState({ level: 0, cost: 100, base: 100 });
  const E = 2.71828;

  const handleClick = () => {
    setScore((prevScore) => prevScore + Math.pow(2, base.level));
  };

  const handleReset = () => {
    setScore(0);
    setBonus1({ level: 0, cost: 15, base: 15 });
    setBonus2({ level: 0, cost: 100, base: 100 });
    setBase({ level: 0, cost: 100 });
  };

  useEffect(() => {
    const bonusInterval = setInterval(() => {
      setScore(
        (prevScore) => prevScore + bonus1.level * 0.01 + bonus2.level * 0.1
      );
    }, 100);

    return () => {
      clearInterval(bonusInterval);
    };
  }, [bonus1.level, bonus2.level]);

  const handleBaseClick = () => {
    setScore(score - base.cost);
    setBase((prevBase) => ({
      ...prevBase,
      level: prevBase.level + 1,
      cost: prevBase.cost ** 1.2,
    }));
    console.log(base);
  };

  const handleBonus1Click = () => {
    setScore(score - bonus1.cost);
    setBonus1((prevBonus1) => ({
      ...prevBonus1,
      level: prevBonus1.level + 1,
      cost: prevBonus1.base * E ** ((prevBonus1.level + 1) * 0.14),
    }));
    console.log(bonus1);
  };

  const handleBonus2Click = () => {
    setScore(score - bonus2.cost);
    setBonus2((prevBonus2) => ({
      ...prevBonus2,
      level: prevBonus2.level + 1,
      cost: prevBonus2.base * E ** ((prevBonus2.level + 1) * 0.14),
    }));
    console.log(bonus2);
  };

  const isBonus1ButtonDisabled = score < bonus1.cost;
  const isBonus2ButtonDisabled = score < bonus2.cost;
  const isBaseButtonDisabled = score < base.cost;

  return (
    <div className="p-8 flex flex-col items-center">
      <p className="text-2xl md:text-4xl">
        Puntuación: {score.toFixed(2)} puntos
      </p>
      <p className="text-2xl md:text-4xl">
        Bonus: {(bonus1.level * 0.1 + bonus2.level * 1).toFixed(2)} puntos /
        segundo
      </p>
      <hr className="h-1 bg-green-400/40 my-2 w-full" />
      <p>{2 ** base.level} puntos por click</p>
      <Button
        className={"bg-green-500 w-full md:w-5/12"}
        onClickValue={handleClick}
        value={"Click"}
      />
      <hr className="h-1 bg-green-400/40 my-2 w-full" />
      <p>Bonus 1</p>
      <p>
        {bonus1.level * 0.1} puntos/segundo, próximo nivel{" "}
        {((bonus1.level + 1) * 0.1).toFixed(2)} puntos/segundo
      </p>
      <Button
        className={` w-full md:w-5/12 ${
          isBonus1ButtonDisabled && "bg-gray-400 hover:bg-gray-400"
        }`}
        onClickValue={handleBonus1Click}
        value={
          "Nivel: " +
          bonus1.level +
          " -> Coste: " +
          bonus1.cost.toFixed(2) +
          " puntos"
        }
        disabled={isBonus1ButtonDisabled}
      />

      <p>Bonus 2</p>
      <p>
        {bonus2.level * 1} puntos/segundo, próximo nivel{" "}
        {((bonus2.level + 1) * 1).toFixed(2)} puntos/segundo
      </p>
      <Button
        className={` w-full md:w-5/12 ${
          isBonus2ButtonDisabled && "bg-gray-400 hover:bg-gray-400"
        }`}
        onClickValue={handleBonus2Click}
        value={
          "Nivel: " +
          bonus2.level +
          " -> Coste: " +
          bonus2.cost.toFixed(2) +
          " puntos"
        }
        disabled={isBonus2ButtonDisabled}
      />
      <hr className="h-1 bg-green-400/40 my-2 w-full" />

      <p>Subir nivel base</p>
      <p> Próximo nivel: {2 ** (base.level + 1)} puntos por click</p>
      <Button
        className={`w-full md:w-5/12 ${
          isBaseButtonDisabled && "bg-gray-400 hover:bg-gray-400"
        }`}
        onClickValue={handleBaseClick}
        value={
          "Nivel: " +
          base.level +
          " -> Coste: " +
          base.cost.toFixed(2) +
          " puntos"
        }
        disabled={isBaseButtonDisabled}
      />
      <hr className="h-1 bg-green-400/40 my-2 w-full" />

      <p>Resetear todos los valores</p>
      <Button
        className={"bg-red-700 w-full md:w-5/12"}
        onClickValue={handleReset}
        value={"Reset"}
      />
      <p>Agrega 100000000 puntos</p>
      <Button
        className={"bg-violet-400 w-full md:w-5/12"}
        onClickValue={() => setScore(score + 100000000)}
        value={"Truco"}
        disabled={""}
      />
    </div>
  );
};

export default IdleGame;
