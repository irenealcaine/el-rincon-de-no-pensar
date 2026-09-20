import React from "react";

const HiperLink = ({ href, className, text }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group inline-flex items-center gap-0.5 font-bold text-clay-dark transition-colors duration-200 hover:text-ink ${className}`}
    >
      {text}
      <svg
        className="h-4 w-9"
        viewBox="0 0 36 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M2 12C14 7 24 13 34 9"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </a>
  );
};

export default HiperLink;