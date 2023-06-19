import ExerciseTable from "../Components/ExerciseTable";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Exercise = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"Tabla de ejercicios"} />
      <ExerciseTable />
      <Footer />
    </div>
  );
};

export default Exercise;
