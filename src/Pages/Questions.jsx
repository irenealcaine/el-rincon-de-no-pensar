import QuestionGame from "../Components/QuestionGame.jsx";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";

const Questions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-100">
      <Header title={"Preguntas"} />
      <Button
        type={"violet"}
        className={"ml-8"}
        onClickValue={() => {
          navigate("/games");
        }}
        value={"Juegos"}
      />
      <QuestionGame />
      <Footer />
    </div>
  );
};

export default Questions;
