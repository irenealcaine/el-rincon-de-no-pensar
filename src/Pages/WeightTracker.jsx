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
      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8 pb-6">
          <div>
            <p className="font-tictactoe text-blue-800/70 text-base tracking-wide">
              ~ pesa y anota ~
            </p>
            <p className="text-blue-900/60 mt-1 max-w-md">
              Apunta tu peso día a día y mira cómo evoluciona en la gráfica.
            </p>
          </div>
          <Button
            type={"violet"}
            onClickValue={() => {
              navigate("/projects");
            }}
            value={"Proyectos"}
          />
        </div>
        <WeightTable />
      </main>
      <Footer />
    </div>
  );
};

export default WeightTracker;