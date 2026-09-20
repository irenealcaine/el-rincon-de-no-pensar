import Footer from "../Components/Footer";
import Carousel from "../Components/Carousel";
import PageIntro from "../Components/PageIntro";

const CarouselPage = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <PageIntro
          tagline={"~ desliza y descubre ~"}
          title={"Carrusel de fotos"}
          description={
            "Un carrusel con fotos aleatorias, autoplay y controles para navegar y barajar."
          }
          backTo={"/components"}
          backLabel={"Volver a componentes"}
        />
        <Carousel />
      </main>
      <Footer />
    </div>
  );
};

export default CarouselPage;