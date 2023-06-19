import { useState } from 'react'
import Button from './Button';
import { FaRegHandRock } from 'react-icons/fa'
import { FaRegHandPeace } from 'react-icons/fa'
import { FaRegHandPaper } from 'react-icons/fa'

const piedra = <FaRegHandRock className='w-8 h-8 md:w-16 md:h-16 inline-block' />
const tijeras = <FaRegHandPeace className='w-8 h-8 md:w-16 md:h-16 inline-block' />
const papel = <FaRegHandPaper className='w-8 h-8 md:w-16 md:h-16 inline-block' />
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
      setTies(ties + 1)
      return 'Empate';
    } else if (
      (user === piedra && computer === tijeras) ||
      (user === papel && computer === piedra) ||
      (user === tijeras && computer === papel)
    ) {
      setWins(wins + 1);
      return 'Ganaste';
    } else {
      setLosses(losses + 1);
      return 'Perdiste';
    }
  };

  const handleReset = () => {

    setUserChoice(null);
    setComputerChoice(null);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          {options.map((option) => (
            <Button value={option} onClickValue={() => handleUserChoice(option)} disabled={!!userChoice} className={`mx-2 ${userChoice === option && 'outline outline-offset-2 outline-blue-700'}`} type={!!userChoice && "gray"} />
          ))}
        </div>
        <div className='flex justify-center gap-4 mx-auto py-2 px-4 border border-blue-500 rounded'>
          <p className="">Ganadas: {wins}</p>
          <p className="">Perdidas: {losses}</p>
          <p className="">Empates: {ties}</p>
        </div>
        {userChoice && computerChoice && result && (
          <div>
            <p className='mt-4 mb-2'>Tu elección: {userChoice}</p>
            <p>Elección de la inteligencia artificial: {computerChoice}</p>
            <h2 className="text-2xl my-4">{result}</h2>

            <Button value={"Otra vez"} onClickValue={handleReset} />
          </div>
        )}
      </div>
    </div>
  );
};


export default RPS
