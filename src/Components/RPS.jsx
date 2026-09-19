import { useState } from "react";
import Button from "./Button";
import { FaRegHandRock, FaRegHandPeace, FaRegHandPaper } from "react-icons/fa";
import { FiSmile, FiFrown, FiMinusCircle } from "react-icons/fi";

const piedra = <FaRegHandRock className="w-10 h-10 md:w-14 md:h-14" />;
const tijeras = <FaRegHandPeace className="w-10 h-10 md:w-14 md:h-14" />;
const papel = <FaRegHandPaper className="w-10 h-10 md:w-14 md:h-14" />;
const options = [piedra, papel, tijeras];

const piedraSmall = <FaRegHandRock className="w-6 h-6 md:w-8 md:h-8" />;
const tijerasSmall = <FaRegHandPeace className="w-6 h-6 md:w-8 md:h-8" />;
const papelSmall = <FaRegHandPaper className="w-6 h-6 md:w-8 md:h-8" />;
const smallOptions = [piedraSmall, papelSmall, tijerasSmall];

const RPS = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [ties, setTies] = useState(0);

  const getResult = (user, computer) => {
    if (user === computer) return "Es un empate";
    if (
      (user === piedra && computer === tijeras) ||
      (user === papel && computer === piedra) ||
      (user === tijeras && computer === papel)
    ) {
      return "Has ganado";
    }
    return "Has perdido";
  };

  const handleUserChoice = (option) => {
    const computerOption = options[Math.floor(Math.random() * options.length)];
    const roundResult = getResult(option, computerOption);

    setUserChoice(option);
    setComputerChoice(computerOption);
    setResult(roundResult);

    if (roundResult === "Has ganado") {
      setWins((w) => w + 1);
    } else if (roundResult === "Has perdido") {
      setLosses((l) => l + 1);
    } else {
      setTies((t) => t + 1);
    }
  };

  const handleReset = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult(null);
  };

  const resultStyle = {
    win: "bg-emerald-50 border border-emerald-200 text-emerald-600",
    loss: "bg-red-50 border border-red-200 text-red-600",
    tie: "bg-blue-50 border border-blue-200 text-blue-700",
  };

  const resultIcon = {
    win: <FiSmile />,
    loss: <FiFrown />,
    tie: <FiMinusCircle />,
  };

  const currentStyle =
    result === "Has ganado"
      ? "win"
      : result === "Has perdido"
      ? "loss"
      : "tie";

  return (
    <section className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg p-6 md:p-8">
      <div className="flex flex-col items-center">
        <div className="flex flex-wrap items-center justify-between gap-3 w-full mb-8">
          <div className="grid grid-cols-3 gap-3 flex-1 min-w-56">
            <div className="px-4 py-3 rounded-2xl bg-emerald-50 text-center">
              <p className="text-xs font-bold text-emerald-500 uppercase">
                Ganadas
              </p>
              <p className="font-mono text-3xl font-black text-emerald-600">
                {wins}
              </p>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-blue-50 text-center">
              <p className="text-xs font-bold text-blue-500 uppercase">
                Empates
              </p>
              <p className="font-mono text-3xl font-black text-blue-700">
                {ties}
              </p>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-red-50 text-center">
              <p className="text-xs font-bold text-red-500 uppercase">
                Perdidas
              </p>
              <p className="font-mono text-3xl font-black text-red-600">
                {losses}
              </p>
            </div>
          </div>
          <Button onClickValue={handleReset} value={"Otra vez"} />
        </div>

        <p className="font-bold text-blue-900/60 mb-3">Elige una opción</p>
        <div className="flex gap-4">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleUserChoice(option)}
              disabled={!!userChoice}
              className={`w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center transition-all duration-200 ${
                userChoice === option
                  ? "bg-violet-100 text-violet-700 ring-4 ring-violet-400 scale-105"
                  : "bg-blue-50 border-2 border-blue-200 text-blue-800 hover:bg-blue-100 disabled:opacity-40 disabled:cursor-not-allowed"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {userChoice && computerChoice && result && (
          <div className="mt-8 w-full">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-blue-50 border border-blue-900/10 py-2.5 text-center">
                <p className="text-[10px] font-bold text-blue-500 uppercase">
                  Tú
                </p>
                <span className="inline-block text-blue-800">
                  {smallOptions[options.indexOf(userChoice)]}
                </span>
              </div>
              <div className="rounded-2xl bg-violet-50 border border-violet-900/10 py-2.5 text-center">
                <p className="text-[10px] font-bold text-violet-500 uppercase">
                  Máquina
                </p>
                <span className="inline-block text-violet-800">
                  {smallOptions[options.indexOf(computerChoice)]}
                </span>
              </div>
            </div>

            <div
              className={`mt-4 text-center px-6 py-3 rounded-2xl border ${resultStyle[currentStyle]}`}
            >
              <p className="font-black text-2xl inline-flex items-center gap-2">
                <span className="inline-flex">{resultIcon[currentStyle]}</span>
                {result}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RPS;