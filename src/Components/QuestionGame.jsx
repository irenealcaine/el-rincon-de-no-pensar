import React, { useState } from "react";
import Button from "../Components/Button";

const questions = [
  {
    question:
      "¿Qué lenguaje de programación se utiliza principalmente para el desarrollo de aplicaciones móviles?",
    image:
      "https://d500.epimg.net/cincodias/imagenes/2020/11/16/lifestyle/1605555641_363320_1605556525_noticia_normal.jpg",
    options: ["Java", "C++", "Python", "Ruby"],
    answer: "Java",
  },
  {
    question:
      "¿Cuál de los siguientes es un lenguaje de marcado utilizado para estructurar contenido web?",
    image:
      "https://blogthinkbig.com/wp-content/uploads/sites/4/2014/08/internet-y-la-web-1.jpg?resize=500%2C280",
    options: ["HTML", "CSS", "JavaScript", "PHP"],
    answer: "HTML",
  },
  {
    question:
      "¿Cuál de las siguientes opciones es un paradigma de programación orientado a objetos?",
    image:
      "https://media.tutellus.com/libraries/22/16/lib/1466774399567_8.jpg?size=854x493s&ext=jpg",
    options: ["Prolog", "C", "Lisp", "Java"],
    answer: "Java",
  },
  {
    question:
      "¿Cuál de los siguientes es un sistema de gestión de bases de datos relacionales?",
    image:
      "https://atlantictech.io/wp-content/uploads/2022/08/2c4ea-basededatos2-1300x731.png",
    options: ["MongoDB", "PostgreSQL", "Redis", "Elasticsearch"],
    answer: "PostgreSQL",
  },
  {
    question:
      "¿Qué protocolo se utiliza para transferir archivos desde un servidor a un cliente a través de Internet?",
    image:
      "https://s2.ppllstatics.com/rc/www/multimedia/2023/04/11/cuantas-horas-pasamos-internet.jpg",
    options: ["FTP", "HTTP", "SMTP", "SSH"],
    answer: "FTP",
  },
  {
    question:
      "¿Cuál de las siguientes opciones es un tipo de prueba de software que verifica si el código funciona correctamente en diferentes situaciones?",
    image:
      "https://qwertyarticles.com/wp-content/uploads/2014/11/Computer-Test.jpg",
    options: [
      "Prueba unitaria",
      "Prueba de integración",
      "Prueba de rendimiento",
      "Prueba de aceptación",
    ],
    answer: "Prueba de integración",
  },
  {
    question:
      "¿Cuál de los siguientes términos se refiere al proceso de encontrar y corregir errores en el código?",
    image: "https://www.ibeta.com/wp-content/uploads/2019/06/software-bugs.jpg",
    options: ["Depuración", "Compilación", "Optimización", "Ejecución"],
    answer: "Depuración",
  },
  {
    question: "¿Qué es un 'framework' en el contexto de la programación?",
    image:
      "https://www.suratica.es/wp-content/uploads/2021/11/frameworks-team.jpg",
    options: [
      "Un conjunto de reglas de codificación",
      "Una biblioteca de funciones predefinidas",
      "Un lenguaje de programación específico",
      "Un entorno de desarrollo integrado (IDE)",
    ],
    answer: "Una biblioteca de funciones predefinidas",
  },
  {
    question:
      "¿Cuál de los siguientes es un método de ordenamiento comúnmente utilizado en programación?",
    image:
      "https://d500.epimg.net/cincodias/imagenes/2016/10/10/lifestyle/1476093288_890907_1476093375_noticia_normal.jpg",
    options: [
      "Búsqueda binaria",
      "Ordenamiento de burbuja",
      "Árbol binario",
      "Recursión",
    ],
    answer: "Ordenamiento de burbuja",
  },
  {
    question:
      "¿Cuál de las siguientes opciones es un servicio de computación en la nube proporcionado por Amazon?",
    image: "https://cdn.diferenciador.com/imagenes/tipos-de-nubes-og.jpg",
    options: [
      "Azure",
      "Google Cloud Platform",
      "IBM Cloud",
      "Amazon Web Services (AWS)",
    ],
    answer: "Amazon Web Services (AWS)",
  },
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

  const resetGame = () => {
    setCurrentQuestion(0);
    setSelectedOption("");
    setScore(0);
    setShowScore(false);
  };

  const handleFinishGame = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setShowScore(true);
  };

  let puntuation = "";

  switch (score) {
    case 10:
      puntuation = "¡Perfecto!";
      break;
    case 9:
    case 8:
    case 7:
      puntuation = "¡Casi! Sigue intentándolo";
      break;
    case 6:
    case 5:
    case 4:
    case 3:
    case 2:
    case 1:
      puntuation = "La próxima vez saldrá mejor";
      break;
    case 0:
      puntuation = "Es difícil hacerlo tan perfectamente erróneo...";
      break;
    default:
      puntuation = "default";
      break;
  }

  return (
    <div className="w-full p-4 md:p-8">
      {showScore ? (
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Tu puntuación es {score} de {questions.length}
          </h2>
          <p className="mt-4">{puntuation}</p>
          <Button
            className={`mt-8`}
            onClickValue={resetGame}
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
              "w-full md:w-7/12 lg:w-5/12 mx-auto rounded-lg mb-4 shadow-lg"
            }
          />
          <div className="flex flex-wrap justify-center gap-2">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                type={"green"}
                className={`${
                  selectedOption === option && `!bg-violet-900`
                } w-full md:w-auto`}
                onClickValue={() => handleOptionSelect(option)}
                value={option}
              />
            ))}
          </div>
          {currentQuestion < questions.length - 1 ? (
            <Button
              type={!selectedOption && "gray"}
              className={`mt-8 w-full md:w-auto`}
              onClickValue={handleNextQuestion}
              disabled={!selectedOption}
              value={"Siguiente pregunta"}
            />
          ) : (
            <Button
              type={!selectedOption && "gray"}
              className={`mt-8 w-full md:w-auto`}
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
