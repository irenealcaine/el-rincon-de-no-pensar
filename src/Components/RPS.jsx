import { useState } from "react";
import Button from "./Button";
import { FaRegHandRock } from "react-icons/fa";
import { FaRegHandPeace } from "react-icons/fa";
import { FaRegHandPaper } from "react-icons/fa";

const piedra = (
  <FaRegHandRock className="w-8 h-8 md:w-16 md:h-16 inline-block" />
);
const tijeras = (
  <FaRegHandPeace className="w-8 h-8 md:w-16 md:h-16 inline-block" />
);
const papel = (
  <FaRegHandPaper className="w-8 h-8 md:w-16 md:h-16 inline-block" />
);
const options = [piedra, papel, tijeras];

const RPS = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [ties, setTies] = useState(0);

  const handleUserChoice = (option) => {
    const randomIndex = Math.floor(Math.random() * options.length);
    const computerOption = options[randomIndex];
    setUserChoice(option);
    setComputerChoice(computerOption);
    setResult(getResult(option, computerOption));
  };

  const getResult = (user, computer) => {
    if (user === computer) {
      setTies(ties + 1);
      return "Es un empate";
    } else if (
      (user === piedra && computer === tijeras) ||
      (user === papel && computer === piedra) ||
      (user === tijeras && computer === papel)
    ) {
      setWins(wins + 1);
      return "Has ganado 🎉";
    } else {
      setLosses(losses + 1);
      return "Has perdido 😫";
    }
  };

  const handleReset = () => {
    setUserChoice(null);
    setComputerChoice(null);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="text-center w-10/12">
        <div className="flex justify-center mb-4">
          {options.map((option) => (
            <Button
              value={option}
              onClickValue={() => handleUserChoice(option)}
              disabled={!!userChoice}
              className={`mx-2 !px-4 !py-4 ${
                userChoice === option &&
                "outline outline-offset-2 outline-blue-700"
              }`}
              type={!!userChoice && "gray"}
            />
          ))}
        </div>
        <div className="flex justify-center gap-4 mx-auto w-full md:w-7/12 py-2 px-4 border border-blue-500 rounded">
          <p className="">
            Ganadas:{" "}
            <span
              className={`text-xl ${
                wins > losses && wins > ties ? "font-bold text-green-700" : ""
              }`}
            >
              {wins}
            </span>
          </p>
          <p className="">
            Perdidas:{" "}
            <span
              className={`text-xl ${
                losses > wins && losses > ties ? "font-bold text-red-700" : ""
              }`}
            >
              {losses}
            </span>
          </p>
          <p className="">
            Empates:{" "}
            <span
              className={`text-xl ${
                ties > wins && ties > losses ? "font-bold text-blue-700" : ""
              }`}
            >
              {ties}
            </span>
          </p>
        </div>
        {userChoice && computerChoice && result && (
          <div>
            <p className="mt-4 mb-2 text-blue-700">Tu elección:</p>
            <span className=" text-blue-700">{userChoice}</span>
            <p className="text-green-700 mt-4">
              Elección de la inteligencia artificial
            </p>
            <span className="text-green-700">{computerChoice}</span>
            <h2 className="text-2xl md:text-4xl my-4 font-bold">{result}</h2>

            <Button value={"Otra vez"} onClickValue={handleReset} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RPS;
