import React from "react";

const POSITIONS = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
};

const ARROWS = {
  top: "top-full left-1/2 -translate-x-1/2 border-t-ink",
  bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-ink",
  left: "left-full top-1/2 -translate-y-1/2 border-l-ink",
  right: "right-full top-1/2 -translate-y-1/2 border-r-ink",
};

const Tooltip = ({ content, position = "top", children, className = "" }) => {
  if (!content) return children;

  const pos = POSITIONS[position] ?? POSITIONS.top;
  const arrow = ARROWS[position] ?? ARROWS.top;
  const usesAbsolute = className.includes("absolute");

  return (
    <span
      className={`group inline-flex ${usesAbsolute ? "" : "relative"} ${className}`}
    >
      {children}
      <span
        role="tooltip"
        className={`pointer-events-none absolute z-40 whitespace-nowrap rounded-lg bg-ink px-3 py-1.5 text-xs font-bold text-paper-100 opacity-0 shadow-md transition-all duration-150 group-hover:opacity-100 group-focus-within:opacity-100 ${pos}`}
      >
        {content}
        <span
          className={`absolute h-0 w-0 border-4 border-transparent ${arrow}`}
        />
      </span>
    </span>
  );
};

export default Tooltip;