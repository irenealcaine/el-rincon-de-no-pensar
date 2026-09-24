import React, { useState } from "react";
import Modal from "./Modal";
import Tooltip from "./Tooltip";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Gallery = ({ photos }) => {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [modalIndex, setModalIndex] = useState(null);

  const categories = [
    "Todas",
    ...new Set(photos.map((photo) => photo.category)),
  ];

  const filteredPhotos =
    selectedCategory === "Todas"
      ? photos
      : photos.filter((photo) => photo.category === selectedCategory);

  const openModal = (index) => setModalIndex(index);
  const closeModal = () => setModalIndex(null);

  const navigateModal = (index) => {
    if (index < 0 || index >= filteredPhotos.length) return;
    setModalIndex(index);
  };

  return (
    <div className="pb-16">
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setModalIndex(null);
            }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 border ${
              selectedCategory === category
                ? "bg-blue-800 text-white border-blue-800 shadow-md scale-105"
                : "bg-white/70 text-blue-900/80 border-blue-900/10 hover:bg-white hover:border-blue-800/40"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredPhotos.length === 0 ? (
        <p className="text-blue-900/80 text-center py-16">
          No hay fotos en esta categoría.
        </p>
      ) : (
        <div className="columns-2 md:columns-3 gap-4">
          {filteredPhotos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              aria-label={`Abrir foto de ${photo.category}`}
              className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl shadow-md text-left transition-all duration-300 cursor-pointer hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
              onClick={() => openModal(index)}
            >
              <img
                src={photo.url}
                alt={photo.category}
                loading="lazy"
                decoding="async"
                width="600"
                height="450"
                className="w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/90 text-blue-900 text-xs font-bold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {photo.category}
              </span>
            </button>
          ))}
        </div>
      )}

      {modalIndex !== null && filteredPhotos[modalIndex] && (
        <Modal
          open
          onClose={closeModal}
          label={`Foto de ${filteredPhotos[modalIndex].category}`}
          containerClassName="pl-16 md:pl-20"
          contentClassName="w-full h-full flex items-center justify-center"
        >
          {modalIndex > 0 && (
            <Tooltip
              content="Foto anterior"
              position="right"
              className="absolute left-4 md:left-6 z-30 top-1/2 -translate-y-1/2"
            >
              <button
                onClick={() => navigateModal(modalIndex - 1)}
                aria-label="Foto anterior"
                className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/25 active:scale-90"
              >
                <FiChevronLeft size={28} />
              </button>
            </Tooltip>
          )}

          {modalIndex < filteredPhotos.length - 1 && (
            <Tooltip
              content="Foto siguiente"
              position="left"
              className="absolute right-2 md:right-6 z-30 top-1/2 -translate-y-1/2"
            >
              <button
                onClick={() => navigateModal(modalIndex + 1)}
                aria-label="Foto siguiente"
                className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/25 active:scale-90"
              >
                <FiChevronRight size={28} />
              </button>
            </Tooltip>
          )}

          <figure className="relative flex max-h-full max-w-full flex-col items-center justify-center">
            <img
              src={filteredPhotos[modalIndex].url}
              alt={filteredPhotos[modalIndex].category}
              width="1200"
              height="800"
              className="h-auto w-auto max-h-[80vh] max-w-[90vw] rounded-2xl border-4 border-blue-200 object-contain shadow-2xl"
            />
            <figcaption className="mt-3 text-center font-bold text-blue-100">
              {filteredPhotos[modalIndex].category} · {modalIndex + 1}/
              {filteredPhotos.length}
            </figcaption>
          </figure>
        </Modal>
      )}
    </div>
  );
};

export default Gallery;