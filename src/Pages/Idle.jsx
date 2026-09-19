import Header from "../Components/Header";
import Footer from "../Components/Footer";
import IdleGame from "../Components/IdleGame";
import PageIntro from "../Components/PageIntro";

const Idle = () => {
  return (
    <div className="min-h-screen bg-blue-100">
      <Header title={"Clicker"} />
      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <PageIntro
          tagline={"~ clic, clic, clic ~"}
          title={"Clicker"}
          description={
            "Un juego incremental donde cada clic suma. A ver cuánto aguantas."
          }
          backTo={"/games"}
          backLabel={"Volver a juegos"}
        />
        <IdleGame />
      </main>
      <Footer />
    </div>
  );
};

export default Idle;