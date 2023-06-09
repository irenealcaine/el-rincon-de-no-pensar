import QuestionGame from "../Components/QuestionGame.jsx";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Questions = () => {
  return (
    <div className="min-h-screen bg-blue-100">
      <Header title={"Preguntas"} />
      <QuestionGame />
      <Footer />
    </div>
  );
};

export default Questions;
