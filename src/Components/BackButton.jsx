import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const BackButton = ({ to, children, className }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className={`group inline-flex items-center gap-2 rounded-full border-2 border-ink/10 bg-white/60 px-5 py-2.5 font-bold text-sm text-ink transition-all duration-300 hover:border-clay hover:bg-clay hover:text-white active:scale-95 ${className}`}
    >
      <FiArrowLeft className="text-lg transition-transform duration-300 group-hover:-translate-x-1" />
      {children}
    </button>
  );
};

export default BackButton;