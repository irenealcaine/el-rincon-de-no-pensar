import React, { useState, useEffect } from "react";
import useInterval from "../Hooks/useInterval";
import Button from "./Button";
import { FiPlay, FiPause, FiRotateCcw, FiSkipForward } from "react-icons/fi";

const STORAGE_KEY = "pomodoroCounter";

const Timer = () => {
  const [workInterval, setWorkInterval] = useState(25);
  const [restInterval, setRestInterval] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(workInterval * 60);
  const [isRestInterval, setIsRestInterval] = useState(false);
  const [pomodoros, setPomodoros] = useState(() => {
    try {
      return parseInt(localStorage.getItem(STORAGE_KEY), 10) || 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(pomodoros));
    } catch {
      // localStorage no disponible
    }
  }, [pomodoros]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const workIntervalInSeconds = workInterval * 60;
  const restIntervalInSeconds = restInterval * 60;

  const handleStartStopClick = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const handleResetClick = () => {
    setIsActive(false);
    setIsRestInterval(false);
    setTimeLeft(workIntervalInSeconds);
  };

  const handleSkipClick = () => {
    setTimeLeft(
      isRestInterval ? workIntervalInSeconds : restIntervalInSeconds
    );
    setIsRestInterval(!isRestInterval);
  };

  const handleIntervalChange = (event) => {
    const { name, value } = event.target;
    const parsed = parseInt(value, 10) || 0;
    if (name === "work") {
      setWorkInterval(parsed);
      if (!isActive) {
        setIsRestInterval(false);
        setTimeLeft(parsed * 60);
      }
    } else {
      setRestInterval(parsed);
    }
  };

  function handleTick() {
    setTimeLeft((timeLeft) => (timeLeft > 0 ? timeLeft - 1 : timeLeft));
  }

  useInterval(handleTick, isActive ? 1000 : null);

  useEffect(() => {
    if (timeLeft === 0) {
      const audio = new Audio(
        "https://www.soundjay.com/misc/sounds/bell-ringing-03a.mp3"
      );
      audio.play();
      if (!isRestInterval) {
        setPomodoros((prev) => prev + 1);
      }
      setTimeLeft(
        isRestInterval ? workIntervalInSeconds : restIntervalInSeconds
      );
      setIsRestInterval(!isRestInterval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, workIntervalInSeconds, restIntervalInSeconds]);

  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const total = isRestInterval ? restIntervalInSeconds : workIntervalInSeconds;
  const fraction = total > 0 ? timeLeft / total : 0;
  const ringOffset = circumference * (1 - fraction);

  return (
    <section className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg p-6 md:p-10">
      <div className="flex flex-col items-center">
        <span
          className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors duration-500 ${
            isRestInterval
              ? "bg-violet-100 text-violet-700"
              : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {isRestInterval ? "Descanso" : "Trabajo"}
        </span>

        <div className="relative mt-6">
          <svg
            viewBox="0 0 280 280"
            className="w-64 h-64 md:w-72 md:h-72 -rotate-90"
          >
            <circle
              cx="140"
              cy="140"
              r={radius}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="12"
            />
            <circle
              cx="140"
              cy="140"
              r={radius}
              fill="none"
              stroke={isRestInterval ? "#8b5cf6" : "#10b981"}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={ringOffset}
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-oswald text-5xl md:text-6xl font-bold text-blue-900 tabular-nums">
              {formatTime(timeLeft)}
            </span>
            <span className="mt-1 text-sm font-bold text-blue-900/50">
              {pomodoros} {pomodoros === 1 ? "pomodoro" : "pomodoros"}
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-md">
          <Button
            type={isActive ? "red" : "green"}
            onClickValue={handleStartStopClick}
            value={
              isActive ? (
                <span className="inline-flex items-center gap-2">
                  <FiPause /> Pausar
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <FiPlay /> Iniciar
                </span>
              )
            }
            className={"w-full"}
          />
          <Button
            type={"gray"}
            onClickValue={handleResetClick}
            value={
              <span className="inline-flex items-center gap-2">
                <FiRotateCcw /> Reiniciar
              </span>
            }
            className={"w-full"}
          />
          <Button
            type={"violet"}
            onClickValue={handleSkipClick}
            value={
              <span className="inline-flex items-center gap-2">
                <FiSkipForward /> Saltar
              </span>
            }
            className={"w-full"}
          />
        </div>

        <div className="mt-8 w-full max-w-md grid grid-cols-2 gap-4">
          <label className="block">
            <span className="block text-sm font-bold text-blue-900/70 mb-1">
              Trabajo (min)
            </span>
            <input
              type="number"
              min="1"
              name="work"
              value={workInterval}
              onChange={handleIntervalChange}
              disabled={isActive}
              className="w-full rounded-xl border border-blue-900/10 bg-blue-50/50 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-bold text-blue-900/70 mb-1">
              Descanso (min)
            </span>
            <input
              type="number"
              min="1"
              name="rest"
              value={restInterval}
              onChange={handleIntervalChange}
              disabled={isActive}
              className="w-full rounded-xl border border-blue-900/10 bg-blue-50/50 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50"
            />
          </label>
        </div>
      </div>
    </section>
  );
};

export default Timer;