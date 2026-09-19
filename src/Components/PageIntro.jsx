import React from "react";
import BackButton from "./BackButton";

const PageIntro = ({ tagline, title, description, backTo, backLabel }) => {
  return (
    <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-8 mb-10">
      <div>
        <p className="font-tictactoe text-blue-800/70 text-base tracking-wide">
          {tagline}
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-blue-900 mt-1 leading-tight">
          {title}
        </h2>
        <p className="text-blue-900/60 mt-2 max-w-xl">{description}</p>
      </div>
      <BackButton to={backTo}>{backLabel}</BackButton>
    </section>
  );
};

export default PageIntro;