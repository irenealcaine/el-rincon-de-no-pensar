import React from "react";

const BlogPosts = ({ title, excerpt, imageUrl, postUrl, categories }) => {
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
          {/* {categories.map((category) => {
            <p className="text-gray-400 text-sm">{category}</p>;
          })} */}
          <p className="text-gray-400 text-sm">{categories}</p>
          <h2
            href={postUrl}
            className="font-bold text-xl mb-2 hover:text-gray-600"
          >
            {title}
          </h2>
          <p className="text-gray-700 text-base">{shortenedExcerpt}</p>
        </div>
      </a>
    </div>
  );
};

export default BlogPosts;
