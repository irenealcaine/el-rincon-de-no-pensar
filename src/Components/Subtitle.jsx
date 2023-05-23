import React from "react";

const Subtitle = ({ subtitle }) => {
  return (
    <header className="text-xl w-10/12 mx-auto md:text-2xl text-center px-2 py-4 mb-4">
      {subtitle}
    </header>
  );
};

export default Subtitle;
