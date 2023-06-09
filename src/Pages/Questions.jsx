import QuestionGame from "../Components/QuestionGame.jsx";
import Header from "../Components/Header";

const Questions = () => {
  return (
    <div className="min-h-screen bg-blue-100">
      <Header title={"Preguntas"} />
      <QuestionGame />
    </div>
  );
};

export default Questions;
