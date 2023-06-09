import Header from "../Components/Header";
import Footer from "../Components/Footer";
import IdleGame from "../Components/IdleGame";

const Idle = () => {
  return (
    <div className="min-h-screen bg-blue-100">
      <Header title={"Clicker"} />
      <IdleGame />
      <Footer />
    </div>
  );
};

export default Idle;
