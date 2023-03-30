import React from "react";

const BlogPosts = ({ title, excerpt, imageUrl, postUrl }) => {
  return (
    <div className="max-w-lg mx-auto shadow-lg rounded-lg overflow-hidden">
      <a href={postUrl}>
        <img src={imageUrl} alt={title} className="w-full h-64 object-cover" />
      </a>
      <div className="px-6 py-4">
        <a
          href={postUrl}
          className="font-bold text-xl mb-2 hover:text-gray-600"
        >
          {title}
        </a>
        <p className="text-gray-700 text-base">{excerpt}</p>
      </div>
    </div>
  );
};

export default BlogPosts;
