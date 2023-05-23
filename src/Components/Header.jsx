import React from "react";

const Header = ({ title }) => {
  return (
    <header className="text-3xl md:text-5xl font-bold bg-blue-500 text-center px-2 py-4 mb-4">
      {title}
    </header>
  );
};

export default Header;
