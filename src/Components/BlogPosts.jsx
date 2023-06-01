import React from "react";

const BlogPosts = ({ title, excerpt, imageUrl, postUrl }) => {
  const maxLength = 500; // Límite máximo de caracteres para el excerpt

  let shortenedExcerpt = excerpt.slice(0, maxLength); // Limitar la longitud del excerpt

  // Agregar los tres puntos suspensivos si se excede el límite
  if (excerpt.length > maxLength) {
    shortenedExcerpt += "...";
  }

  return (
    <div className="shadow-lg rounded-lg overflow-hidden w-full md:w-5/12 lg:w-3/12">
      <a href={postUrl}>
        <img src={imageUrl} alt={title} className=" h-64 w-full object-cover" />
        <div className="px-6 py-4 bg-white">
          <a
            href={postUrl}
            className="font-bold text-xl mb-2 hover:text-gray-600"
          >
            {title}
          </a>
          <p className="text-gray-700 text-base">{shortenedExcerpt}</p>
        </div>
      </a>
    </div>
  );
};

export default BlogPosts;
