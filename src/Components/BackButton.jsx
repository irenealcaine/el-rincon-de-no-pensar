import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const BackButton = ({ to, children, className }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className={`inline-flex items-center gap-2 font-bold text-violet-600 hover:text-violet-800 transition active:scale-95 ${className}`}
    >
      <FiArrowLeft className="text-lg" />
      {children}
    </button>
  );
};

export default BackButton;