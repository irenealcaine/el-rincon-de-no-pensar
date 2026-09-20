import React from "react";
import { useLocation } from "react-router-dom";
import BackButton from "./BackButton";
import Seo from "./Seo";

const PageIntro = ({ tagline, title, description, backTo, backLabel }) => {
  const location = useLocation();

  return (
    <section className="mt-10 mb-12 md:mt-14 md:mb-16">
      <Seo title={title} description={description} path={location.pathname} />
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="font-tictactoe text-lg text-clay-dark">{tagline}</p>
          <h1 className="mt-2 font-oswald text-4xl font-bold uppercase tracking-tight text-ink md:text-5xl">
            {title}
          </h1>
          <svg
            className="mt-3 h-3 w-36 text-clay"
            viewBox="0 0 144 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M3 8C24 3 48 11 72 6S112 3 141 7"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
          <p className="mt-5 text-base leading-relaxed text-ink-soft md:text-lg">
            {description}
          </p>
        </div>
        <BackButton
          to={backTo}
          className="shrink-0 self-start md:self-auto"
        >
          {backLabel}
        </BackButton>
      </div>
    </section>
  );
};

export default PageIntro;