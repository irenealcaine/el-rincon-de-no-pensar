import React, { useState, useEffect } from "react";
import useInterval from "../Hooks/useInterval";
import Button from "./Button";
import Footer from "./Footer";
import Header from "./Header";

const Timer = () => {
  const [workInterval, setWorkInterval] = useState(25);
  const [restInterval, setRestInterval] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(workInterval * 60);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

  const workIntervalInSeconds = workInterval * 60;
  const restIntervalInSeconds = restInterval * 60;

  function handleStartStopClick() {
    setIsActive((prevIsActive) => !prevIsActive);
  }

  const handleResetClick = () => {
    setIsActive(false);
    setTimeLeft(workIntervalInSeconds);
  };

  const handleIntervalChange = (event) => {
    const { name, value } = event.target;
    if (name === "work") {
      setWorkInterval(parseInt(value));
    } else {
      setRestInterval(parseInt(value));
    }
  };

  function handleTick() {
    setTimeLeft((timeLeft) => timeLeft - 1);
  }

  useInterval(handleTick, isActive ? 1000 : null);

  useEffect(() => {
    if (timeLeft === 0) {
      const audio = new Audio(
        "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"
      );
      audio.play();
      setTimeLeft(
        isRestInterval ? workIntervalInSeconds : restIntervalInSeconds
      );
      setIsRestInterval(!isRestInterval);
      console.log(workInterval, restInterval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, workIntervalInSeconds, restIntervalInSeconds]);

  const [isRestInterval, setIsRestInterval] = useState(false);

  return (
    <div className="min-h-screen bg-blue-100">
      <Header title={"Cronómetro Pomodoro"} />
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-xl md:text-3xl font-bold mb-4">
          Cronómetro Pomodoro
        </h1>
        <div className="flex flex-col md:flex-row mb-4">
          <div className="md:mr-4">
            <label htmlFor="workInterval">Intervalo de trabajo (minutos)</label>
            <input
              type="number"
              name="work"
              id="workInterval"
              value={workInterval}
              onChange={handleIntervalChange}
              className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="restInterval">
              Intervalo de descanso (minutos)
            </label>
            <input
              type="number"
              name="rest"
              id="restInterval"
              value={restInterval}
              onChange={handleIntervalChange}
              className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="text-6xl font-bold mb-8">{formatTime(timeLeft)}</div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Button
            className={isActive ? "bg-red-500" : "bg-green-500"}
            onClickValue={handleStartStopClick}
            value={isActive ? "Pause" : "Start"}
          />
          <Button
            className={"bg-gray-500"}
            onClickValue={handleResetClick}
            value={"Reset"}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Timer;
