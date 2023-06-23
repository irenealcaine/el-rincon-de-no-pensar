import ExerciseTable from "../Components/ExerciseTable";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";

const Exercise = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"Tabla de ejercicios"} />
      <Button
        type={"violet"}
        className={"ml-8"}
        onClickValue={() => {
          navigate("/projects");
        }}
        value={"Proyectos"}
      />
      <ExerciseTable />
      <Footer />
    </div>
  );
};

export default Exercise;
