import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Paginator = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Paginación de artículos"
      className="mt-12 flex flex-wrap items-center justify-center gap-2"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
        className="inline-flex items-center gap-1 rounded-full border border-blue-900/10 bg-white/80 px-4 py-2 text-sm font-bold text-blue-900/80 transition-all duration-200 hover:bg-white hover:text-blue-800 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <FiChevronLeft />
        Anterior
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
          aria-label={`Página ${page}`}
          className={`h-10 w-10 rounded-full text-sm font-bold transition-all duration-200 ${
            page === currentPage
              ? "bg-blue-800 text-white shadow-md scale-105"
              : "bg-white/80 text-blue-900/80 border border-blue-900/10 hover:bg-white hover:text-blue-800"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Página siguiente"
        className="inline-flex items-center gap-1 rounded-full border border-blue-900/10 bg-white/80 px-4 py-2 text-sm font-bold text-blue-900/80 transition-all duration-200 hover:bg-white hover:text-blue-800 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Siguiente
        <FiChevronRight />
      </button>
    </nav>
  );
};

export default Paginator;