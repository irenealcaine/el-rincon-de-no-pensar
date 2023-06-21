import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Carousel from "../Components/Carousel";

const CarouselPage = () => {
  const images = [
    "https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2022/03/09/16468231897426.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/75/39/c5/caption.jpg?w=1200&h=-1&s=1",
    "https://viajes.nationalgeographic.com.es/medio/2023/05/24/bora-bora-tahiti-republica-francesa_1e7a797c_527914638_230524112049_1200x630.jpg",
  ];

  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"Carrusel de fotos"} />
      <Carousel images={images} />
      <Footer />
    </div>
  );
};

export default CarouselPage;
