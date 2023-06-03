import React, { useState, useEffect } from "react";
import Button from "./Button";

const IdleGame = () => {
  const [score, setScore] = useState(0);
  const [bonusButtonDisabled, setBonusButtonDisabled] = useState(true);
  const [baseButtonDisabled, setBaseButtonDisabled] = useState(true);
  const [baseLvl, setBaseLvl] = useState(1);
  const [baseCost, setBaseCost] = useState(5);
  const [bonus1Lvl, setBonus1Lvl] = useState(0);
  const [bonus1Cost, setBonus1Cost] = useState(5);

  const handleClick = () => {
    setScore(score + baseLvl * 1.5);
  };

  const handleReset = () => {
    setScore(0);
    setBonus1Lvl(0);
    setBonus1Cost(5);
    setBaseLvl(1);
    setBaseCost(5);
    console.log("bonus 1 lvl: " + bonus1Lvl);
  };

  useEffect(() => {
    const bonusInterval = setInterval(() => {
      setScore((prevScore) => prevScore + bonus1Lvl * 0.01);
    }, 1000);

    return () => {
      clearInterval(bonusInterval);
    };
  }, [bonus1Lvl]);

  useEffect(() => {
    if (score >= bonus1Cost) {
      setBonusButtonDisabled(false);
    } else {
      setBonusButtonDisabled(true);
    }
  }, [score, bonus1Cost]);

  useEffect(() => {
    if (score >= baseCost) {
      setBaseButtonDisabled(false);
    } else {
      setBaseButtonDisabled(true);
    }
  }, [score, baseCost]);

  const handleBaseClick = () => {
    setBaseLvl(baseLvl + 1);
    setBaseCost(baseCost * 1.5);
    console.log("bonus 1 lvl: " + bonus1Lvl);
  };

  const handleBonusClick = () => {
    setBonus1Lvl(bonus1Lvl + 1);
    setBonus1Cost(bonus1Cost * 1.5);
    console.log("bonus 1 lvl: " + bonus1Lvl);
  };

  return (
    <div>
      <p className="text-4xl">Puntuación: {score.toFixed(2)} puntos</p>
      <p>{baseLvl * 1.5} puntos por click</p>
      <Button
        className={"bg-green-500"}
        onClickValue={handleClick}
        value={"Click"}
      />
      <p>Subir nivel base (cada click genera 1.5 puntos por el nivel base)</p>
      <Button
        className={baseButtonDisabled && "bg-gray-400"}
        onClickValue={handleBaseClick}
        value={baseLvl + " " + baseCost.toFixed(2)}
        disabled={baseButtonDisabled}
      />
      <p>Subir nivel bonus 1 (se generan nivelBonus1*1.5*0.01 puntos)</p>
      <Button
        className={bonusButtonDisabled && "bg-gray-400"}
        onClickValue={handleBonusClick}
        value={bonus1Lvl + " " + bonus1Cost.toFixed(2)}
        disabled={bonusButtonDisabled}
      />
      <p>Resetear</p>
      <Button
        className={"bg-red-700"}
        onClickValue={handleReset}
        value={"Reset"}
      />
    </div>
  );
};

export default IdleGame;
