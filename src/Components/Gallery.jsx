import React, { useState, useEffect } from "react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Modal = ({ onClose, photos, index, onNavigate }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(index + 1);
      if (e.key === "ArrowLeft") onNavigate(index - 1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, onClose, onNavigate]);

  const photo = photos[index];

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center pl-16 md:pl-20 p-4 md:p-10"
      onClick={onClose}
    >
      <div className="modal-backdrop absolute inset-0 bg-black/70 backdrop-blur-md" />

      <button
        onClick={onClose}
        title="Cerrar"
        className="absolute right-4 top-4 z-30 text-white bg-white/10 hover:bg-white/25 rounded-full p-2 transition active:scale-90"
      >
        <FiX size={22} />
      </button>

      {index > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(index - 1);
          }}
          title="Anterior"
          className="absolute left-14 md:left-6 z-30 text-white bg-white/10 hover:bg-white/25 rounded-full p-2 transition active:scale-90"
        >
          <FiChevronLeft size={28} />
        </button>
      )}

      {index < photos.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(index + 1);
          }}
          title="Siguiente"
          className="absolute right-2 md:right-6 z-30 text-white bg-white/10 hover:bg-white/25 rounded-full p-2 transition active:scale-90"
        >
          <FiChevronRight size={28} />
        </button>
      )}

      <figure
        className="modal-image relative max-w-full max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.url}
          alt={photo.category}
          className="max-h-[80vh] max-w-full object-contain rounded-2xl border-4 border-blue-200 shadow-2xl"
        />
        <figcaption className="mt-3 text-center font-bold text-blue-100">
          {photo.category} · {index + 1}/{photos.length}
        </figcaption>
      </figure>
    </div>
  );
};

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
                : "bg-white/70 text-blue-900/70 border-blue-900/10 hover:bg-white hover:border-blue-800/40"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredPhotos.length === 0 ? (
        <p className="text-blue-900/50 text-center py-16">
          No hay fotos en esta categoría.
        </p>
      ) : (
        <div className="columns-2 md:columns-3 gap-4">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => openModal(index)}
            >
              <img
                src={photo.url}
                alt={photo.category}
                className="w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/90 text-blue-900 text-xs font-bold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {photo.category}
              </span>
            </div>
          ))}
        </div>
      )}

      {modalIndex !== null && (
        <Modal
          photos={filteredPhotos}
          index={modalIndex}
          onClose={closeModal}
          onNavigate={navigateModal}
        />
      )}
    </div>
  );
};

export default Gallery;