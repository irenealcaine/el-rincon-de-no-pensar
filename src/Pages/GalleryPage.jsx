import React from 'react'
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Gallery from '../Components/Gallery';

const GalleryPage = () => {

  const photos = [
    {
      id: 1,
      url: 'https://www.gundo.app/blog/wp-content/uploads/2022/02/Estilos-de-vida-saludable-la-importancia-para-nuestra-salud-1-e1645630955761.jpeg',
      category: 'Comida'
    },
    {
      id: 2,
      url: 'https://c0.wallpaperflare.com/preview/552/184/880/travel-road-country-western.jpg',
      category: 'Viajes'
    },
    {
      id: 3,
      url: 'https://www.dartmoorzoo.org.uk/wp-content/uploads/2021/01/Tiger-1.jpg',
      category: 'Animales'
    }, {
      id: 4,
      url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80',
      category: 'Comida'
    },
    {
      id: 5,
      url: 'https://www.fundacionaquae.org/wp-content/uploads/2018/10/proteger-a-los-animales-1024x654.jpg.webp',
      category: 'Animales'
    },
    {
      id: 6,
      url: 'https://s3.abcstatics.com/media/gurmesevilla/2012/01/comida-rapida-casera.jpg',
      category: 'Comida'
    },
    {
      id: 7,
      url: 'https://blogs.biomedcentral.com/on-medicine/wp-content/uploads/sites/6/2019/09/iStock-1131794876.t5d482e40.m800.xtDADj9SvTVFjzuNeGuNUUGY4tm5d6UGU5tkKM0s3iPk.jpg',
      category: 'Comida'
    },
  ];

  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"Galería de fotos"} />
      <Gallery photos={photos} />
      <Footer />
    </div>
  )
}

export default GalleryPage
