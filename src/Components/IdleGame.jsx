import React, { useState, useEffect } from "react";
import Button from "./Button";

const IdleGame = () => {
  const [score, setScore] = useState(0);
  const [base, setBase] = useState({ level: 0, cost: 100 });
  const [bonus1, setBonus1] = useState({ level: 0, cost: 15, base: 15 });
  const [bonus2, setBonus2] = useState({ level: 0, cost: 100, base: 100 });
  const [bonus3, setBonus3] = useState({ level: 0, cost: 1000, base: 1000 });
  const [upgrade1, setUpgrade1] = useState({
    level: 0,
    cost: 1000,
    base: 1000,
  });
  const [upgrade2, setUpgrade2] = useState({
    level: 0,
    cost: 5000,
    base: 5000,
  });
  const [upgrade3, setUpgrade3] = useState({
    level: 0,
    cost: 10000,
    base: 10000,
  });
  const E = 2.71828;

  const handleClick = () => {
    setScore((prevScore) => prevScore + Math.pow(2, base.level));
  };

  const handleReset = () => {
    setScore(0);
    setBonus1({ level: 0, cost: 15, base: 15 });
    setBonus2({ level: 0, cost: 100, base: 100 });
    setBonus3({ level: 0, cost: 1000, base: 1000 });
    setUpgrade1({ level: 0, cost: 1000, base: 1000 });
    setUpgrade2({ level: 0, cost: 5000, base: 5000 });
    setUpgrade3({ level: 0, cost: 10000, base: 10000 });
    setBase({ level: 0, cost: 100 });
  };

  useEffect(() => {
    const bonusInterval = setInterval(() => {
      setScore(
        (prevScore) =>
          prevScore +
          2 ** upgrade1.level * bonus1.level * 0.01 +
          2 ** upgrade2.level * bonus2.level * 0.1 +
          2 ** upgrade3.level * bonus3.level * 0.8
      );
    }, 100);

    return () => {
      clearInterval(bonusInterval);
    };
  }, [
    bonus1.level,
    bonus2.level,
    bonus3.level,
    upgrade1.level,
    upgrade2.level,
    upgrade3.level,
  ]);

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

  const handleBonus3Click = () => {
    setScore(score - bonus3.cost);
    setBonus3((prevBonus3) => ({
      ...prevBonus3,
      level: prevBonus3.level + 1,
      cost: prevBonus3.base * E ** ((prevBonus3.level + 1) * 0.14),
    }));
    console.log(bonus3);
  };

  const handleUpgrade1Click = () => {
    setScore(score - upgrade1.cost);
    setUpgrade1((prevUpgrade1) => ({
      ...prevUpgrade1,
      level: prevUpgrade1.level + 1,
      cost: prevUpgrade1.base * E ** ((prevUpgrade1.level + 1) * 0.14),
    }));
    console.log(upgrade1);
  };

  const handleUpgrade2Click = () => {
    setScore(score - upgrade2.cost);
    setUpgrade2((prevUpgrade2) => ({
      ...prevUpgrade2,
      level: prevUpgrade2.level + 1,
      cost: prevUpgrade2.base * E ** ((prevUpgrade2.level + 1) * 0.14),
    }));
    console.log(upgrade2);
  };

  const handleUpgrade3Click = () => {
    setScore(score - upgrade3.cost);
    setUpgrade3((prevUpgrade3) => ({
      ...prevUpgrade3,
      level: prevUpgrade3.level + 1,
      cost: prevUpgrade3.base * E ** ((prevUpgrade3.level + 1) * 0.14),
    }));
    console.log(upgrade3);
  };

  const isBonus1ButtonDisabled = score < bonus1.cost;
  const isBonus2ButtonDisabled = score < bonus2.cost;
  const isBonus3ButtonDisabled = score < bonus3.cost;
  const isBaseButtonDisabled = score < base.cost;
  const isUpgrade1ButtonDisabled = score < upgrade1.cost;
  const isUpgrade2ButtonDisabled = score < upgrade2.cost;
  const isUpgrade3ButtonDisabled = score < upgrade3.cost;

  return (
    <div className="p-8 flex flex-col items-center">
      <div className="rounded-xl shadow-lg bg-blue-50 p-4">
        <p className="text-2xl md:text-4xl">
          Puntuación: {score.toFixed(2)} puntos
        </p>
        <p className="md:text-2xl">
          (
          {(
            2 ** upgrade1.level * bonus1.level * 0.1 +
            2 ** upgrade2.level * bonus2.level * 1 +
            2 ** upgrade3.level * bonus3.level * 8
          ).toFixed(1)}{" "}
          puntos/s)
        </p>
      </div>
      <div className="rounded-xl shadow-lg bg-blue-50 p-4">
        <p>{2 ** base.level} puntos por click</p>
        <Button
          type={"green"}
          className={"w-56 h-56 rounded-full"}
          onClickValue={handleClick}
          value={"Click"}
        />

        <p>Bonus 1</p>
        <p>
          {(2 ** upgrade1.level * bonus1.level * 0.1).toFixed(2)} puntos/s,
          próximo nivel{" "}
          {(2 ** upgrade1.level * (bonus1.level + 1) * 0.1).toFixed(2)} puntos/s
        </p>
        <Button
          type={isBonus1ButtonDisabled && "gray"}
          className={`w-full md:w-5/12`}
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
          {(2 ** upgrade2.level * bonus2.level * 1).toFixed(2)} puntos/s,
          próximo nivel{" "}
          {(2 ** upgrade2.level * (bonus2.level + 1) * 1).toFixed(2)} puntos/s
        </p>

        <Button
          type={isBonus2ButtonDisabled && "gray"}
          className={` w-full md:w-5/12`}
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

        <p>Bonus 3</p>
        <p>
          {(2 ** upgrade3.level * bonus3.level * 8).toFixed(2)} puntos/s,
          próximo nivel{" "}
          {(2 ** upgrade3.level * (bonus3.level + 1) * 8).toFixed(2)} puntos/s
        </p>

        <Button
          type={isBonus3ButtonDisabled && "gray"}
          className={` w-full md:w-5/12`}
          onClickValue={handleBonus3Click}
          value={
            "Nivel: " +
            bonus3.level +
            " -> Coste: " +
            bonus3.cost.toFixed(2) +
            " puntos"
          }
          disabled={isBonus3ButtonDisabled}
        />
      </div>
      <div className="rounded-xl shadow-lg bg-blue-50 p-4">
        <p>Subir nivel base</p>
        <p> Próximo nivel: {2 ** (base.level + 1)} puntos por click</p>
        <Button
          type={isBaseButtonDisabled && "gray"}
          className={`w-full md:w-5/12`}
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

        <p>Subir nivel bonus 1</p>
        <p>
          {" "}
          Próximo nivel:{" "}
          {(2 ** (upgrade1.level + 1) * bonus1.level * 0.1).toFixed(2)} puntos/s
        </p>
        <Button
          type={isUpgrade1ButtonDisabled && "gray"}
          className={`w-full md:w-5/12`}
          onClickValue={handleUpgrade1Click}
          value={
            "Nivel: " +
            upgrade1.level +
            " -> Coste: " +
            upgrade1.cost.toFixed(2) +
            " puntos"
          }
          disabled={isUpgrade1ButtonDisabled}
        />

        <p>Subir nivel bonus 2</p>
        <p>
          {" "}
          Próximo nivel:{" "}
          {(2 ** (upgrade2.level + 1) * bonus2.level * 1).toFixed(2)} puntos/s
        </p>
        <Button
          type={isUpgrade2ButtonDisabled && "gray"}
          className={`w-full md:w-5/12`}
          onClickValue={handleUpgrade2Click}
          value={
            "Nivel: " +
            upgrade2.level +
            " -> Coste: " +
            upgrade2.cost.toFixed(2) +
            " puntos"
          }
          disabled={isUpgrade2ButtonDisabled}
        />

        <p>Subir nivel bonus 3</p>
        <p>
          {" "}
          Próximo nivel:{" "}
          {(2 ** (upgrade3.level + 1) * bonus3.level * 8).toFixed(2)} puntos/s
        </p>
        <Button
          type={isUpgrade3ButtonDisabled && "gray"}
          className={`w-full md:w-5/12`}
          onClickValue={handleUpgrade3Click}
          value={
            "Nivel: " +
            upgrade3.level +
            " -> Coste: " +
            upgrade3.cost.toFixed(2) +
            " puntos"
          }
          disabled={isUpgrade3ButtonDisabled}
        />
      </div>
      <div className="rounded-xl shadow-lg bg-blue-50 p-4">
        <p>Resetear todos los valores</p>
        <Button
          type={"red"}
          className={"w-full md:w-5/12"}
          onClickValue={handleReset}
          value={"Reset"}
        />
        <p>Agrega 100000000 puntos</p>
        <Button
          type={"violet"}
          className={"w-full md:w-5/12"}
          onClickValue={() => setScore(score + 100000000)}
          value={"Truco"}
          disabled={""}
        />
      </div>
    </div>
  );
};

export default IdleGame;
