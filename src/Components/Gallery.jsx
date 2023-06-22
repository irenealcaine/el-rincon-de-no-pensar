import React, { useState } from "react";
import Button from "./Button";

const Modal = ({ isOpen, onClose, imgSrc }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-10 ${isOpen ? "" : "hidden"
        }`}
    >
      <div className="absolute inset-0 bg-gray-900/90"></div>
      <div className="pl-20 pr-8 pb-8 pt-16 z-20 w-full h-screen">
        <img alt={""} src={imgSrc} className={"mx-auto my-auto rounded-xl max-h-full object-contain border-4 border-blue-200"} />
        <Button type={"red"} value={"Cerrar"} onClickValue={onClose} className={"absolute right-2 top-2"} />
      </div>
    </div>
  );
};

const Gallery = ({ photos }) => {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

  const categories = [
    "Todas",
    ...new Set(photos.map((photo) => photo.category)),
  ];

  const filteredPhotos =
    selectedCategory === "Todas"
      ? photos
      : photos.filter((photo) => photo.category === selectedCategory);

  const openModal = (src) => {
    setIsModalOpen(true);
    setImgSrc(src);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <div className="mb-4">
        <label htmlFor="category-select" className="mr-2 font-bold">
          Filtrar por categoría:
        </label>
        <select
          id="category-select"
          className="p-2 border rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="columns-2 md:columns-3 gap-4">
        {filteredPhotos.map((photo) => (
          <div key={photo.id} className="">
            <img
              src={photo.url}
              alt={photo.title}
              onClick={() => openModal(photo.url)}
              className="w-full rounded-lg shadow bg-cover border-2 border-transparent hover:border-blue-700 transition duration-200 mb-4 cursor-pointer"
            />
          </div>
        ))}
        <Modal isOpen={isModalOpen} onClose={closeModal} imgSrc={imgSrc} />
      </div>
    </div>
  );
};

export default Gallery;
