import React from "react";

const Subtitle = ({ subtitle }) => {
  return (
    <section className="relative mx-auto mb-12 mt-10 max-w-3xl px-6 md:mb-16 md:mt-14 md:px-8">
      <span
        className="pointer-events-none absolute -left-1 -top-8 select-none font-tictactoe text-7xl text-clay/25 md:-left-6 md:text-8xl"
        aria-hidden="true"
      >
        “
      </span>
      <p className="relative text-center text-lg font-semibold leading-relaxed text-ink-light md:text-xl md:leading-relaxed">
        {subtitle}
      </p>
      <svg
        className="mx-auto mt-6 h-2.5 w-32 text-clay/60"
        viewBox="0 0 128 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M3 6C22 2 42 8 64 4S104 2 125 6"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </section>
  );
};

export default Subtitle;