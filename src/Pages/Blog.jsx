import React from "react";
import Header from "../Components/Header";
import BlogPosts from "../Components/BlogPosts";
import Posts from "../data/Posts.js";

const Blog = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"Blog"} />
      <div className="flex flex-wrap flex-col md:flex-row items-center md:justify-center p-4 gap-4 md:gap-6 lg:gap-8 ">
        {Posts.map((post, index) => (
          <BlogPosts
            key={index}
            title={post.title}
            excerpt={post.excerpt}
            imageUrl={post.imageUrl}
            postUrl={post.postUrl}
            categories={post.categories}
          />
        ))}
      </div>
    </div>
  );
};

export default Blog;
