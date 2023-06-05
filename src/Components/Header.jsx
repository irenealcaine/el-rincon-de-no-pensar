import React from "react";

const Header = ({ title }) => {
  return (
    <header className="text-3xl md:text-5xl font-bold bg-hero bg-cover mb-4 h-36 md:h-64">
      <div className="flex justify-center items-center w-full h-full bg-gradient-to-t from-blue-100 p-8">
        <h1 className="py-4 px-12 text-center rounded-xl backdrop-blur-md bg-blue-700/40 text-white">
          {title}
        </h1>
      </div>
    </header>
  );
};

export default Header;
