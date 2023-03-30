import React from "react";
import BlogPost from "../Components/BlogPost";
import Header from "../Components/Header";

const Blog = () => {
  return (
    <div className="bg-blue-100">
      <Header title={"Blog"} />
      <BlogPost />
    </div>
  );
};

export default Blog;
