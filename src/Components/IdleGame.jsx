import React, { useState, useEffect } from "react";
import Button from "./Button";

const IdleGame = () => {
  const [score, setScore] = useState(0);
  const [bonusButtonDisabled, setBonusButtonDisabled] = useState(true);
  const [baseButtonDisabled, setBaseButtonDisabled] = useState(true);
  const [base, setBase] = useState({ level: 0, cost: 100 });
  const [bonus1, setBonus1] = useState({ level: 0, cost: 5 });
  const E = 2.71828;

  const handleClick = () => {
    setScore((prevScore) => prevScore + Math.pow(2, base.level));
  };

  const handleReset = () => {
    setScore(0);
    setBonus1({ level: 0, cost: 5 });
    setBase({ level: 1, cost: 5 });
  };

  useEffect(() => {
    const bonusInterval = setInterval(() => {
      setScore((prevScore) => prevScore + bonus1.level * 0.1);
    }, 1000);

    return () => {
      clearInterval(bonusInterval);
    };
  }, [bonus1.level]);

  useEffect(() => {
    setBonusButtonDisabled(score < bonus1.cost);
  }, [score, bonus1.cost]);

  useEffect(() => {
    setBaseButtonDisabled(score < base.cost);
  }, [score, base.cost]);

  const handleBaseClick = () => {
    setScore(score - base.cost);
    setBase((prevBase) => ({
      ...prevBase,
      level: prevBase.level + 1,
      cost: prevBase.cost ** 2,
    }));
    console.log(base);
  };

  const handleBonusClick = () => {
    setScore(score - bonus1.cost);
    setBonus1((prevBonus1) => ({
      ...prevBonus1,
      level: prevBonus1.level + 1,
      cost: prevBonus1.cost ** 2,
    }));
    console.log(bonus1);
  };

  return (
    <div>
      <p className="text-4xl">Puntuación: {score.toFixed(2)} puntos</p>
      <hr />
      <p>--------------------------------------</p>

      <p>{base.level * 1.1} puntos por click</p>
      <Button
        className={"bg-green-500"}
        onClickValue={handleClick}
        value={"Click"}
      />
      <hr />
      <p>--------------------------------------</p>
      <p>
        Subir nivel bonus 1 ({bonus1.level * 0.01} puntos/segundo, prox lvl{" "}
        {(bonus1.level + 1) * 0.01} puntos/segundo)
      </p>
      <Button
        className={bonusButtonDisabled && "bg-gray-400"}
        onClickValue={handleBonusClick}
        value={bonus1.level + " " + bonus1.cost}
        disabled={bonusButtonDisabled}
      />
      <hr />
      <p>--------------------------------------</p>
      <p>
        Subir nivel base (prox lvl: {(parseInt(base.level) + 1) * 1.1} puntos
        por click)
      </p>
      <Button
        className={baseButtonDisabled && "bg-gray-400"}
        onClickValue={handleBaseClick}
        value={base.level + " " + base.cost}
        disabled={baseButtonDisabled}
      />
      <hr />
      <p>--------------------------------------</p>

      <Button
        className={"bg-red-700"}
        onClickValue={handleReset}
        value={"Reset"}
      />
    </div>
  );
};

export default IdleGame;
