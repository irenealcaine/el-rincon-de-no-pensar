import WeightTable from "../Components/WeightTable";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";

const WeightTracker = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"Registro de peso"} />
      <Button
        type={"violet"}
        className={"ml-8"}
        onClickValue={() => {
          navigate("/projects");
        }}
        value={"Proyectos"}
      />
      <WeightTable />
      <Footer />
    </div>
  );
};

export default WeightTracker;
