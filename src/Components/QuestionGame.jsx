import React, { useState } from "react";

const questions = [
  {
    question: "¿Cuál es la capital de Francia?",
    options: ["Londres", "París", "Madrid", "Roma"],
    answer: "París",
  },
  {
    question: "¿Cuál es el río más largo del mundo?",
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
    <div className="container mx-auto">
      {showScore ? (
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            ¡Tu puntuación es {score} de {questions.length}!
          </h2>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
            onClick={() => window.location.reload()}
          >
            Jugar de nuevo
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            {questions[currentQuestion].question}
          </h2>
          <div className="flex justify-center">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded ${
                  selectedOption === option ? "bg-blue-700" : ""
                }`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
          {currentQuestion < questions.length - 1 ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
              onClick={handleNextQuestion}
              disabled={!selectedOption}
            >
              Siguiente pregunta
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
              onClick={handleFinishGame}
              disabled={!selectedOption}
            >
              Finalizar juego
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionGame;
