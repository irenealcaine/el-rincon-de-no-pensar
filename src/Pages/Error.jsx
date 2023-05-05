import React from "react";
import Header from "../Components/Header";
import { FaTools } from "react-icons/fa";

const Error = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"Error"} />
      <FaTools className="w-5/12 h-60 mx-auto" />
      <p className="text-center p-8">Working on...</p>
    </div>
  );
};

export default Error;
