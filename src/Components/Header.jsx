import React from "react";
import { GiSofa } from "react-icons/gi";

const Header = ({ title }) => {
  return (
    <header className="relative overflow-hidden border-b border-ink/5 bg-blue-100">

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-8 text-center md:px-8 md:py-10">
        <h1 className="mt-1.5 font-oswald text-3xl font-bold uppercase tracking-tight text-ink md:text-5xl">
          {title}
        </h1>
        <svg
          className="mt-2 h-2.5 w-32 text-clay md:h-3 md:w-40"
          viewBox="0 0 176 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M3 8C28 3 58 11 88 6S138 3 173 7"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
        <GiSofa className="mt-4 h-6 w-6 text-clay/70" />
      </div>
    </header>
  );
};

export default Header;