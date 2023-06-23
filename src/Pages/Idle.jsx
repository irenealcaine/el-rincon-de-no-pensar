import Header from "../Components/Header";
import Footer from "../Components/Footer";
import IdleGame from "../Components/IdleGame";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";

const Idle = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-100">
      <Header title={"Clicker"} />
      <Button
        type={"violet"}
        className={"ml-8"}
        onClickValue={() => {
          navigate("/games");
        }}
        value={"Juegos"}
      />
      <IdleGame />
      <Footer />
    </div>
  );
};

export default Idle;
