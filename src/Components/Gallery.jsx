import React, { useState } from "react";

const Gallery = ({ photos }) => {
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const categories = [
    "Todas",
    ...new Set(photos.map((photo) => photo.category)),
  ];

  const filteredPhotos =
    selectedCategory === "Todas"
      ? photos
      : photos.filter((photo) => photo.category === selectedCategory);

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
      <div className="columns-2 gap-1">
        {filteredPhotos.map((photo) => (
          <div key={photo.id} className="border p-2">
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full rounded-lg shadow bg-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
