import React from "react";

const BlogPosts = ({
  title,
  subtitle,
  excerpt,
  imageUrl,
  postUrl,
  categories,
}) => {
  const maxLength = 100;
  let shortenedExcerpt = excerpt.slice(0, maxLength);
  if (excerpt.length > maxLength) {
    shortenedExcerpt += "...";
  }

  return (
    <div className="shadow-lg rounded-lg overflow-hidden w-full md:w-5/12 lg:w-3/12">
      <a href={postUrl}>
        <img src={imageUrl} alt={title} className=" h-64 w-full object-cover" />
        <div className="px-6 py-4 bg-white">
          {categories.map((category) => (
            <span className="mx-2 text-gray-400 text-sm">{category}</span>
          ))}
          {/* <p className="text-gray-400 text-sm">{categories}</p> */}
          <h2 className="font-bold text-xl mb-2 hover:text-gray-600">
            {title}
          </h2>
          <h3 className="font-bold mb-2 text-gray-600">{subtitle}</h3>
          <p className="text-gray-900 text-base">{shortenedExcerpt}</p>
        </div>
      </a>
    </div>
  );
};

export default BlogPosts;
