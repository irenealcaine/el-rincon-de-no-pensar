import WeightTable from "../Components/WeightTable";
import Footer from "../Components/Footer";
import PageIntro from "../Components/PageIntro";

const WeightTracker = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-4">
        <PageIntro
          tagline={"~ pesa y anota ~"}
          title={"Registro de peso"}
          description={
            "Apunta tu peso día a día y mira cómo evoluciona en la gráfica."
          }
          backTo={"/projects"}
          backLabel={"Volver a proyectos"}
        />
        <WeightTable />
      </main>
      <Footer />
    </div>
  );
};

export default WeightTracker;