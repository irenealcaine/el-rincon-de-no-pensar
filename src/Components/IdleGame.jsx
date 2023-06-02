import React, { useState, useEffect } from "react";
import Button from "./Button";

const IdleGame = () => {
  const [score, setScore] = useState(0);
  const [bonusButtonDisabled, setBonusButtonDisabled] = useState(true);
  const [bonus1Lvl, setBonus1Lvl] = useState(0);

  const handleClick = () => {
    setScore(score + 1);
  };

  const handleReset = () => {
    setScore(0.0);
    setBonus1Lvl(0);
  };

  useEffect(() => {
    console.log(`score: ${score}`);
  }, [1000]);

  useEffect(() => {
    const bonusInterval = setInterval(() => {
      setScore((prevScore) => prevScore + bonus1Lvl * 0.01);
    }, 1000);

    const lastUpdateTime = localStorage.getItem("lastUpdateTime");
    if (lastUpdateTime) {
      const elapsedTime = Date.now() - parseInt(lastUpdateTime);
      const bonusIncrement = Math.floor(elapsedTime / 1000) * 0.01;
      setScore((prevScore) => prevScore + bonusIncrement);
    }

    return () => {
      clearInterval(bonusInterval);
    };
  }, [1000]);

  useEffect(() => {
    if (score >= 15) {
      setBonusButtonDisabled(false);
    } else {
      setBonusButtonDisabled(true);
    }
    localStorage.setItem("lastUpdateTime", Date.now().toString());
  }, [1000]);

  const handleBonusClick = () => {
    setBonus1Lvl(bonus1Lvl + 1);
  };

  return (
    <div>
      <p className="text-4xl">Score: {score.toFixed(2)}</p>
      <Button className={""} onClickValue={handleClick} value={"Base"} />
      <Button
        className={bonusButtonDisabled && "bg-gray-400"}
        onClickValue={handleBonusClick}
        value={bonus1Lvl}
        // disabled={bonusButtonDisabled}
        disabled={bonusButtonDisabled}
      />
      <Button
        className={"bg-red-700"}
        onClickValue={handleReset}
        value={"Reset"}
      />
    </div>
  );
};

export default IdleGame;
