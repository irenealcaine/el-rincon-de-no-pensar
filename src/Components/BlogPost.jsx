import React from "react";
import BlogPosts from "./BlogPosts";
import Posts from "../data/Posts";

const BlogPost = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Posts.map((post, index) => (
        <BlogPosts
          key={index}
          title={post.title}
          excerpt={post.excerpt}
          imageUrl={post.imageUrl}
          postUrl={post.postUrl}
        />
      ))}
    </div>
  );
};

export default BlogPost;
