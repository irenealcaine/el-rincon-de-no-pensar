import React, { useState } from "react";

const Modal = ({ isOpen, onClose, imgSrc }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-10 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="absolute inset-0 bg-gray-900/40"></div>
      <div className="p-8 rounded z-20 mx-auto">
        <img alt={""} src={imgSrc} className={"mx-auto rounded-xl"} />
        <button
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
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
    <div className="container mx-auto p-4">
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
      <div className="columns-2 gap-4">
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
