import React from "react";

const Subtitle = ({ subtitle }) => {
  return (
    <p className="text-md w-10/12 mx-auto md:text-2xl px-2 py-4 mb-4 text-justify">
      {subtitle}
    </p>
  );
};

export default Subtitle;
