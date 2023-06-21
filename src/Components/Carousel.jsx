import React, { useState } from "react";
import { RiArrowLeftSFill } from "react-icons/ri";
import { RiArrowRightSFill } from "react-icons/ri";

const Carousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-10/12 mx-auto">
      <img
        src={images[currentImageIndex]}
        alt="Carousel"
        className="w-full aspect-video bg-cover rounded-xl shadow"
      />
      <button
        className="absolute top-1/2 left-4 transform duration-200 -translate-y-1/2 bg-blue-500/80 hover:bg-blue-700/80 text-white p-2 rounded-full"
        onClick={previousImage}
      >
        <RiArrowLeftSFill />
      </button>
      <button
        className="absolute top-1/2 right-4 transform duration-200 -translate-y-1/2 bg-blue-500/80 hover:bg-blue-700/80 text-white p-2 rounded-full"
        onClick={nextImage}
      >
        <RiArrowRightSFill />
      </button>
    </div>
  );
};

export default Carousel;
