import React from "react";
import BlogPosts from "./BlogPosts";
import Posts from "../data/Posts";

const BlogPost = () => {
  return (
    <div className="flex">
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
