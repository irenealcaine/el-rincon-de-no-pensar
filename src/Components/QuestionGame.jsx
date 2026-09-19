import React, { useState, useEffect } from "react";
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
  {
    question:
      "¿Qué estructura de datos funciona en modo LIFO (último en entrar, primero en salir)?",
    image: "https://picsum.photos/seed/quiz11/600/300",
    options: ["Cola", "Pila", "Lista enlazada", "Árbol"],
    answer: "Pila",
  },
  {
    question: "¿Qué etiqueta HTML se utiliza para crear un enlace?",
    image: "https://picsum.photos/seed/quiz12/600/300",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: "<a>",
  },
  {
    question: "¿Qué operador de JavaScript compara valor y tipo?",
    image: "https://picsum.photos/seed/quiz13/600/300",
    options: ["==", "=", "===", "!="],
    answer: "===",
  },
  {
    question:
      "¿Qué método de array en JavaScript elimina el último elemento?",
    image: "https://picsum.photos/seed/quiz14/600/300",
    options: ["push", "pop", "shift", "unshift"],
    answer: "pop",
  },
  {
    question: "¿Qué significan las siglas API?",
    image: "https://picsum.photos/seed/quiz15/600/300",
    options: [
      "Acceso Público a Internet",
      "Aplicación de Programa Interno",
      "Interfaz de Programación de Aplicaciones",
      "Algoritmo de Proceso Iterativo",
    ],
    answer: "Interfaz de Programación de Aplicaciones",
  },
  {
    question:
      "¿Qué protocolo se utiliza para navegar por la web de forma segura?",
    image: "https://picsum.photos/seed/quiz16/600/300",
    options: ["HTTP", "HTTPS", "FTP", "SMTP"],
    answer: "HTTPS",
  },
  {
    question:
      "¿Qué comando de Git envía los cambios locales al repositorio remoto?",
    image: "https://picsum.photos/seed/quiz17/600/300",
    options: ["git commit", "git pull", "git push", "git merge"],
    answer: "git push",
  },
  {
    question:
      "¿Qué lenguaje es especialmente popular para análisis de datos y aprendizaje automático?",
    image: "https://picsum.photos/seed/quiz18/600/300",
    options: ["JavaScript", "Ruby", "C#", "Python"],
    answer: "Python",
  },
  {
    question: "¿Qué propiedad CSS se usa para cambiar el tamaño del texto?",
    image: "https://picsum.photos/seed/quiz19/600/300",
    options: ["text-size", "size", "font-size", "text-style"],
    answer: "font-size",
  },
  {
    question: "¿Qué hace el método JSON.stringify()?",
    image: "https://picsum.photos/seed/quiz20/600/300",
    options: [
      "Convierte un string en un objeto",
      "Convierte un objeto en un string JSON",
      "Valida un JSON",
      "Comprime un JSON",
    ],
    answer: "Convierte un objeto en un string JSON",
  },
];

const STORAGE_KEY = "quizHistory";

const loadHistory = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const getMessage = (score) => {
  const pct = score / questions.length;
  if (pct === 1) return "¡Perfecto!";
  if (pct >= 0.7) return "¡Casi! Sigue intentándolo";
  if (pct >= 0.3) return "La próxima vez saldrá mejor";
  return "Es difícil hacerlo tan perfectamente erróneo...";
};

const QuestionGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [history, setHistory] = useState(loadHistory);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch {
      // localStorage no disponible
    }
  }, [history]);

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
    const finalScore =
      selectedOption === questions[currentQuestion].answer ? score + 1 : score;
    setScore(finalScore);
    setShowScore(true);
    setHistory((prev) =>
      [
        {
          id: Date.now(),
          date: new Date().toLocaleDateString("es-ES"),
          score: finalScore,
          total: questions.length,
        },
        ...prev,
      ].slice(0, 10)
    );
  };

  const option = questions[currentQuestion];

  return (
    <div className="flex flex-col gap-6 pb-16">
      <section className="bg-white rounded-3xl shadow-lg p-6 md:p-8 max-w-3xl mx-auto w-full">
        {showScore ? (
          <div className="text-center py-4">
            <p className="font-oswald text-6xl md:text-7xl font-black text-blue-900">
              {score}
              <span className="text-2xl text-blue-900/40">/{questions.length}</span>
            </p>
            <p className="mt-2 text-lg font-bold text-blue-900/60">
              {getMessage(score)}
            </p>
            <p className="mt-1 text-sm font-bold text-blue-900/40">
              {Math.round((score / questions.length) * 100)}% de aciertos
            </p>
            <Button
              className="mt-8"
              onClickValue={resetGame}
              value={"Jugar de nuevo"}
            />
          </div>
        ) : (
          <div className="text-center">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-blue-900/50">
                Pregunta {currentQuestion + 1} de {questions.length}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold">
                {score} aciertos
              </span>
            </div>

            <div className="w-full bg-blue-100 rounded-full h-2.5 mb-6 overflow-hidden">
              <div
                className="h-full rounded-full bg-blue-700 transition-all duration-300"
                style={{
                  width: `${(currentQuestion / questions.length) * 100}%`,
                }}
              />
            </div>

            <h2 className="text-xl md:text-2xl font-black text-blue-900 mb-6">
              {option.question}
            </h2>

            <img
              src={option.image}
              alt={option.question}
              className="w-full md:w-8/12 mx-auto rounded-2xl mb-6 shadow-md max-h-56 object-cover"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {option.options.map((opt, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(opt)}
                  className={`w-full rounded-2xl border px-4 py-3.5 font-bold transition-all duration-200 ${
                    selectedOption === opt
                      ? "bg-violet-100 border-violet-500 text-violet-800 shadow-md"
                      : "bg-white border-blue-900/10 text-blue-900 hover:border-blue-800/40 hover:bg-blue-50"
                  }`}
                >
                  <span className="mr-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-800 text-sm font-black">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {opt}
                </button>
              ))}
            </div>

            {currentQuestion < questions.length - 1 ? (
              <Button
                type={!selectedOption && "gray"}
                className="mt-8 w-full md:w-auto"
                onClickValue={handleNextQuestion}
                disabled={!selectedOption}
                value={"Siguiente pregunta"}
              />
            ) : (
              <Button
                type={!selectedOption && "gray"}
                className="mt-8 w-full md:w-auto"
                onClickValue={handleFinishGame}
                disabled={!selectedOption}
                value={"Finalizar juego"}
              />
            )}
          </div>
        )}
      </section>

      <section className="bg-white rounded-3xl shadow-lg p-6 md:p-8 max-w-3xl mx-auto w-full">
        <h2 className="font-black text-blue-900 mb-2">Partidas anteriores</h2>
        <p className="text-sm text-blue-900/50 mb-4">
          Las últimas 10 partidas, con su puntuación.
        </p>
        {history.length === 0 ? (
          <p className="text-blue-900/50 text-center py-6">
            Aún no hay partidas guardadas. ¡Juega una y aparecerá aquí!
          </p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-blue-900/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="p-3 text-left font-bold">Fecha</th>
                  <th className="p-3 text-left font-bold">Aciertos</th>
                  <th className="p-3 text-left font-bold">%</th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry) => (
                  <tr
                    key={entry.id}
                    className="border-b border-blue-900/5 last:border-0"
                  >
                    <td className="p-3 font-bold text-blue-900">{entry.date}</td>
                    <td className="p-3 font-mono text-blue-900">
                      {entry.score}/{entry.total}
                    </td>
                    <td className="p-3 font-mono font-bold text-blue-900">
                      {Math.round((entry.score / entry.total) * 100)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default QuestionGame;