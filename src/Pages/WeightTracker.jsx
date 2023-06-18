import WeightTable from "../Components/WeightTable";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const WeightTracker = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"Registro de peso"} />
      <WeightTable />
      <Footer />
    </div>
  );
};

export default WeightTracker;
