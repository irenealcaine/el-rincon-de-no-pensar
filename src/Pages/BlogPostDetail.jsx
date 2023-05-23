import React from "react";
import { useParams } from "react-router-dom";
import Posts from "../data/Posts";

const BlogPostDetail = () => {
  const { id } = useParams();
  const post = Posts.find((post) => post.id === parseInt(id));
  console.log(id, Posts, post);
  return (
    <div className="bg-blue-100">
      <h2>{post.title}</h2>
    </div>
  );
};

export default BlogPostDetail;
