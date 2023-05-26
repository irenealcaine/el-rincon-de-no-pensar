import React from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/Header";
import Subtitle from "../Components/Subtitle";
import Posts from "../data/Posts";

const BlogPostDetail = () => {
  const { id } = useParams();
  const post = Posts.find((post) => post.id === parseInt(id));

  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={post.title} />
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-10/12 lg:w-5/12 mx-auto rounded-lg shadow-lg"
      />
      <Subtitle subtitle={post.excerpt} className="" />
    </div>
  );
};

export default BlogPostDetail;
