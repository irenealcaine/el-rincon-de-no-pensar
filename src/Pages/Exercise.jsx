import ExerciseTable from "../Components/ExerciseTable";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import PageIntro from "../Components/PageIntro";

const Exercise = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"Tabla de ejercicios"} />
      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <PageIntro
          tagline={"~ a moverse ~"}
          title={"Tabla de ejercicios"}
          description={
            "Tabla de ejercicios con series, repeticiones y descansos para no perder la forma."
          }
          backTo={"/projects"}
          backLabel={"Volver a proyectos"}
        />
        <ExerciseTable />
      </main>
      <Footer />
    </div>
  );
};

export default Exercise;