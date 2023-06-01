import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Components/Header";
import Subtitle from "../Components/Subtitle";
import Posts from "../data/Posts";

const BlogPostDetail = () => {
  const { id } = useParams();
  const post = Posts.find((post) => post.id === parseInt(id));
  const navigate = useNavigate();

  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={post.title} />
      <button
        className="bg-blue-400 hover:bg-blue-700 text-white font-bold block my-4 ml-8 px-8 py-2 rounded-md transition duration-500"
        onClick={() => {
          navigate("/projects/blog");
        }}
      >
        Atrás
      </button>
      <p className="text-gray-400 text-sm p-4">{post.categories}</p>
      <Subtitle subtitle={post.subtitle} className="" />
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-10/12 md:w-8/12 max-h-96 object-cover mx-auto rounded-lg shadow-lg"
      />
      <p className="py-8 w-10/12 md:w-8/12 mx-auto indent-6 text-justify">
        <span className="text-gray-400 text-sm p-4">{post.categories}</span>
        {post.excerpt}
      </p>
    </div>
  );
};

export default BlogPostDetail;
