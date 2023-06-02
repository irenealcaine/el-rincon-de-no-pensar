import Header from "../Components/Header";
import IdleGame from "../Components/IdleGame";

const Idle = () => {
  return (
    <div className="min-h-screen bg-blue-100">
      <Header title={"Idle"} />
      <IdleGame />
    </div>
  );
};

export default Idle;
