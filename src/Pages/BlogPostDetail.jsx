import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Components/Button";
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

      <Button
        className={"ml-8"}
        onClickValue={() => {
          navigate("/projects/blog");
        }}
        value={"Atrás"}
      />
      <Subtitle subtitle={post.subtitle} className="" />
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-10/12 md:w-8/12 max-h-96 object-cover mx-auto rounded-lg shadow-lg"
      />
      <div className="flex w-10/12 md:w-8/12 mx-auto gap-4 mt-4 px-4">
        {post.categories.map((category) => (
          <span className=" text-gray-400 text-sm px-2 border rounded border-gray-400">
            {category}
          </span>
        ))}
      </div>
      <p className="py-4 w-10/12 md:w-8/12 mx-auto indent-6 text-justify">
        {post.excerpt}
      </p>

      <div className="py-4 px-8 flex flex-col md:flex-row md:justify-around">
        {post.id - 1 > 0 && (
          <Button
            className={"mb-2 md:mb-0"}
            onClickValue={() => {
              navigate(`/post/${parseInt(post.id) - 1}`);
            }}
            value={"Anterior"}
          />
        )}

        {post.id + 1 <= Posts.length && (
          <Button
            className={""}
            onClickValue={() => {
              navigate(`/post/${parseInt(post.id) + 1}`);
            }}
            value={"Siguiente"}
          />
        )}
      </div>
    </div>
  );
};

export default BlogPostDetail;
