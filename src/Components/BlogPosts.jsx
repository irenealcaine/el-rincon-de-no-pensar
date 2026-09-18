import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const BlogPosts = ({
  title,
  subtitle,
  excerpt,
  imageUrl,
  postUrl,
  categories,
  categoryColors = {},
}) => {
  const maxLength = 110;
  let shortenedExcerpt = excerpt.slice(0, maxLength);
  if (excerpt.length > maxLength) {
    shortenedExcerpt += "...";
  }

  return (
    <article className="group h-full bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
      <Link to={postUrl} className="flex flex-col h-full">
        <div className="relative h-52 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-sm ${
                  categoryColors[category] || "bg-white/90 text-blue-900"
                }`}
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        <div className="p-5 md:p-6 flex flex-col flex-1">
          <h2 className="font-black text-xl text-blue-950 leading-snug group-hover:text-blue-700 transition-colors duration-300">
            {title}
          </h2>
          <h3 className="font-bold text-sm text-blue-900/50 mt-1 mb-2">
            {subtitle}
          </h3>
          <p className="text-blue-900/70 text-sm leading-relaxed">
            {shortenedExcerpt}
          </p>
          <span className="mt-auto pt-4 inline-flex items-center gap-1.5 font-bold text-blue-800 text-sm">
            Leer más
            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  );
};

export default BlogPosts;