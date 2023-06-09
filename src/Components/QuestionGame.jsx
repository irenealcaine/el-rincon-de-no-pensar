import React, { useState } from "react";
import Button from "../Components/Button";

const questions = [
  {
    question: "¿Cuál es la flor nacional de Japón?",
    image:
      "https://verdecora.es/blog/wp-content/uploads/2019/03/cerezo-flor-plantacion.jpg",
    options: ["Melocotonero", "Cerezo", "Pino", "Abeto"],
    answer: "Cerezo",
  },
  {
    question: "¿Cuál es la capital de Francia?",
    image:
      "https://europa.eu/europass/sites/default/files/2020-04/France_0.jpg",
    options: ["Londres", "París", "Madrid", "Roma"],
    answer: "París",
  },
  {
    question: "¿Cuál es el río más largo del mundo?",
    image:
      "https://www.collinsdictionary.com/images/full/river_377603497_1000.jpg",
    options: ["Nilo", "Amazonas", "Yangtsé", "Misisipi"],
    answer: "Amazonas",
  },
  // Agrega más preguntas aquí
];

const QuestionGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setSelectedOption("");
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleFinishGame = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setShowScore(true);
  };

  return (
    <div className="w-full p-4 md:p-8">
      {showScore ? (
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            ¡Tu puntuación es {score} de {questions.length}!
          </h2>
          <Button
            className={`mt-8`}
            onClickValue={() => window.location.reload()}
            value={"Jugar de nuevo"}
          />
        </div>
      ) : (
        <div className="text-center">
          <p>
            Pregunta {currentQuestion + 1} de {questions.length}
          </p>
          <h2 className="text-2xl font-bold mb-8">
            {questions[currentQuestion].question}
          </h2>
          <img
            src={questions[currentQuestion].image}
            alt={questions[currentQuestion].question}
            className={
              "w-full md:w-7/12 lg:5/12 mx-auto rounded-lg mb-4 shadow-lg"
            }
          />
          <div className="flex flex-wrap justify-center gap-2">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                type={"violet"}
                className={`${selectedOption === option && `!bg-violet-900`} `}
                onClickValue={() => handleOptionSelect(option)}
                value={option}
              />
            ))}
          </div>
          {currentQuestion < questions.length - 1 ? (
            <Button
              type={!selectedOption && "gray"}
              className={`mt-8`}
              onClickValue={handleNextQuestion}
              disabled={!selectedOption}
              value={"Siguiente pregunta"}
            />
          ) : (
            <Button
              type={!selectedOption && "gray"}
              className={`mt-8`}
              onClickValue={handleFinishGame}
              disabled={!selectedOption}
              value={"Finalizar juego"}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionGame;
