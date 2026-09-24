import React, { useState, useEffect, useCallback } from "react";
import Tooltip from "./Tooltip";
import {
  RiArrowLeftSFill,
  RiArrowRightSFill,
  RiShuffleLine,
  RiPauseLine,
  RiPlayLine,
} from "react-icons/ri";

const generateImages = (count = 6) =>
  Array.from(
    { length: count },
    () =>
      `https://picsum.photos/seed/${Math.random().toString(36).slice(2)}/1200/675`
  );

const Carousel = () => {
  const [images, setImages] = useState(() => generateImages());
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const shuffle = () => {
    setImages(generateImages());
    setCurrentImageIndex(0);
  };

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(nextImage, 3500);
    return () => clearInterval(interval);
  }, [autoplay, nextImage]);

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-3xl shadow-xl">
        <div className="aspect-video bg-blue-200">
          <img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt={`Foto ${currentImageIndex + 1}`}
            className="carousel-fade w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

        <span className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-white/90 text-blue-900 text-xs font-bold">
          {currentImageIndex + 1} / {images.length}
        </span>

        <Tooltip
          content="Anterior"
          position="right"
          className="absolute top-1/2 -translate-y-1/2 left-4 z-10"
        >
          <button
            onClick={previousImage}
            aria-label="Anterior"
            className="bg-blue-900/60 hover:bg-blue-900/80 backdrop-blur-sm text-white p-3 rounded-full transition duration-200 active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
          >
            <RiArrowLeftSFill size={26} />
          </button>
        </Tooltip>
        <Tooltip
          content="Siguiente"
          position="left"
          className="absolute top-1/2 -translate-y-1/2 right-4 z-10"
        >
          <button
            onClick={nextImage}
            aria-label="Siguiente"
            className="bg-blue-900/60 hover:bg-blue-900/80 backdrop-blur-sm text-white p-3 rounded-full transition duration-200 active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
          >
            <RiArrowRightSFill size={26} />
          </button>
        </Tooltip>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {images.map((_, index) => (
          <Tooltip key={index} content={`Ir a la foto ${index + 1}`} position="top">
            <button
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`Ir a la foto ${index + 1}`}
              aria-current={index === currentImageIndex ? "true" : undefined}
              className={`h-3 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 ${
                index === currentImageIndex
                  ? "w-8 bg-blue-800"
                  : "w-3 bg-blue-900/30 hover:bg-blue-900/50"
              }`}
            />
          </Tooltip>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-3">
        <button
          onClick={shuffle}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-bold transition duration-200 active:scale-95"
        >
          <RiShuffleLine /> Barajar
        </button>
        <button
          onClick={() => setAutoplay(!autoplay)}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold transition duration-200 active:scale-95 ${
            autoplay
              ? "bg-blue-800 hover:bg-blue-900 text-white"
              : "bg-white text-blue-900 border border-blue-900/10 hover:bg-blue-50"
          }`}
        >
          {autoplay ? (
            <>
              <RiPauseLine /> Pausar
            </>
          ) : (
            <>
              <RiPlayLine /> Reproducir
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Carousel;