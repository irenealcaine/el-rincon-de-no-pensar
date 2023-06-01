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

      <Subtitle subtitle={post.subtitle} className="" />
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-10/12 md:w-8/12 max-h-96 object-cover mx-auto rounded-lg shadow-lg"
      />
      <div className="flex w-10/12 md:w-8/12 mx-auto gap-4 mt-2">
        {post.categories.map((category) => (
          <span className=" text-gray-400 text-sm">{category}</span>
        ))}
      </div>
      <p className="py-4 w-10/12 md:w-8/12 mx-auto indent-6 text-justify">
        {post.excerpt}
      </p>

      <div className="py-4 px-8 flex flex-col md:flex-row md:justify-around">
        {post.id - 1 > 0 && (
          <button
            className="bg-blue-400 hover:bg-blue-700 text-white font-bold block my-4 ml-8 px-8 py-2 rounded-md transition duration-500"
            onClick={() => {
              navigate(`/post/${post.id - 1}`);
            }}
          >
            Anterior
          </button>
        )}

        {post.id + 1 <= Posts.length && (
          <button
            className="bg-blue-400 hover:bg-blue-700 text-white font-bold block my-4 ml-8 px-8 py-2 rounded-md transition duration-500"
            onClick={() => {
              navigate(`/post/${post.id + 1}`);
            }}
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
};

export default BlogPostDetail;
