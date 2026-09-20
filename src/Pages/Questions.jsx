import QuestionGame from "../Components/QuestionGame.jsx";
import Footer from "../Components/Footer";
import PageIntro from "../Components/PageIntro";

const Questions = () => {
  return (
    <div className="min-h-screen bg-blue-100">
      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <PageIntro
          tagline={"~ ponte a prueba ~"}
          title={"Preguntas"}
          description={
            "Un juego de preguntas y respuestas para entrenar la cabeza."
          }
          backTo={"/games"}
          backLabel={"Volver a juegos"}
        />
        <QuestionGame />
      </main>
      <Footer />
    </div>
  );
};

export default Questions;