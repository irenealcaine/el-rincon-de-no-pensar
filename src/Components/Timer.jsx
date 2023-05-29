import React, { useState, useEffect } from "react";
import useInterval from "../Hooks/useInterval"; // custom hook to handle setInterval
import Header from "./Header";

const Timer = () => {
  const [workInterval, setWorkInterval] = useState(25); // work interval in minutes
  const [restInterval, setRestInterval] = useState(5); // rest interval in minutes
  const [isActive, setIsActive] = useState(false); // is timer active or not
  const [timeLeft, setTimeLeft] = useState(workInterval * 60);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

  // convert minutes to seconds
  const workIntervalInSeconds = workInterval * 60;
  const restIntervalInSeconds = restInterval * 60;

  // handle start/stop button click

  function handleStartStopClick() {
    setIsActive((prevIsActive) => !prevIsActive);
    setTimeLeft(workInterval * 60);
  }

  // handle reset button click
  const handleResetClick = () => {
    setIsActive(false);
    setTimeLeft(workIntervalInSeconds);
  };

  // handle work/rest interval change
  const handleIntervalChange = (event) => {
    const { name, value } = event.target;
    if (name === "work") {
      setWorkInterval(parseInt(value));
    } else {
      setRestInterval(parseInt(value));
    }
  };

  // handle timer tick

  function handleTick() {
    setTimeLeft((timeLeft) => timeLeft - 1);
    console.log(timeLeft);
  }

  // useInterval custom hook to handle setInterval
  useInterval(
    handleTick,
    isActive ? 1000 : null // only run if isActive is true
  );

  // handle timer reaching 0

  useEffect(() => {
    if (timeLeft === 0) {
      // play sound and switch to work/rest interval
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

  // determine if current interval is work or rest
  const [isRestInterval, setIsRestInterval] = useState(false);

  return (
    <div className="min-h-screen bg-blue-100">
      <Header title={"Cronómetro Pomodoro"} />
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-xl md:text-3xl font-bold mb-4">Pomodoro Timer</h1>
        <div className="flex flex-col md:flex-row mb-4">
          <div className="md:mr-4">
            <label htmlFor="workInterval">Work Interval (minutes)</label>
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
            <label htmlFor="restInterval">Rest Interval (minutes)</label>
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
        <div className="flex items-center">
          <button
            onClick={handleStartStopClick}
            className={`${
              isActive ? "bg-red-500" : "bg-green-500"
            } text-white font-bold py-2 px-4 rounded mr-4`}
          >
            {isActive ? "Stop" : "Start"}
          </button>
          <button
            onClick={handleResetClick}
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
