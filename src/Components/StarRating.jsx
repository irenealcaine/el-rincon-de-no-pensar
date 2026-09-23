import React, { useState } from "react";
import { FiStar } from "react-icons/fi";

const StarRating = ({ postUrl }) => {
  const storageKey = `starRating-${postUrl}`;

  const loadStored = () => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? parseInt(stored, 10) : null;
    } catch {
      return null;
    }
  };

  const [rating, setRating] = useState(() => loadStored());
  const [hover, setHover] = useState(null);

  const labels = [
    "",
    "No me ha gustado",
    "Regular",
    "Bien",
    "Muy bien",
    "¡Me encanta!",
  ];

  const handleClick = (value) => {
    const next = rating === value ? null : value;
    setRating(next);
    try {
      if (next === null) {
        localStorage.removeItem(storageKey);
      } else {
        localStorage.setItem(storageKey, String(next));
      }
    } catch {
      // localStorage no disponible (modo privado, etc.)
    }
  };

  return (
    <section className="mt-8 rounded-3xl bg-white/80 border border-blue-900/10 p-6 md:p-8 shadow-sm backdrop-blur-sm">
      <h2 className="font-['Cherry_Bomb_One'] text-2xl md:text-3xl text-blue-900">
        ¿Te ha gustado?
      </h2>
      <p className="mt-2 text-blue-900/80">
        Valora este artículo con un clic en las estrellas.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((value) => {
          const active = value <= (hover ?? rating ?? 0);
          return (
            <button
              key={value}
              onClick={() => handleClick(value)}
              onMouseEnter={() => setHover(value)}
              onMouseLeave={() => setHover(null)}
              aria-label={`${value} ${value === 1 ? "estrella" : "estrellas"}`}
              aria-pressed={rating === value}
              className="rounded-full p-0.5 transition-transform duration-150 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
            >
              <FiStar
                className={`h-8 w-8 md:h-9 md:w-9 transition-colors duration-150 ${
                  active
                    ? "fill-amber-400 text-amber-400"
                    : "text-blue-900/20 hover:text-blue-900/40"
                }`}
              />
            </button>
          );
        })}
        <span className="ml-2 font-bold text-blue-900">
          {rating ? labels[rating] : "Sin valorar"}
        </span>
      </div>
    </section>
  );
};

export default StarRating;