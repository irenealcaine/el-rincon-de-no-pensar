import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import categoryColors from "../data/categoryColors";

const FeaturedPost = ({ post }) => {
  const maxLength = 200;
  let shortenedExcerpt = post.excerpt.slice(0, maxLength);
  if (post.excerpt.length > maxLength) {
    shortenedExcerpt += "...";
  }

  return (
    <article className="group bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
      <Link to={post.postUrl} className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative h-64 lg:h-full overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-blue-800 text-white shadow">
            Destacado
          </span>
        </div>
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.map((category, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  categoryColors[category] || "bg-white text-blue-900"
                }`}
              >
                {category}
              </span>
            ))}
          </div>
          <h2 className="font-black text-2xl md:text-3xl text-blue-900 leading-tight group-hover:text-blue-700 transition-colors duration-300">
            {post.title}
          </h2>
          <h3 className="font-bold text-blue-900/80 mt-1">{post.subtitle}</h3>
          <p className="text-blue-900/80 mt-3 leading-relaxed">
            {shortenedExcerpt}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 font-bold text-blue-800 text-sm">
            Leer más
            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  );
};

export default FeaturedPost;