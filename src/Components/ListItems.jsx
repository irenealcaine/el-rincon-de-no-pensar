import React from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

const accents = [
  { bg: "bg-clay/10", icon: "text-clay", dot: "bg-clay" },
  { bg: "bg-blue-600/10", icon: "text-blue-700", dot: "bg-blue-600" },
  { bg: "bg-sky-500/10", icon: "text-sky-700", dot: "bg-sky-500" },
  { bg: "bg-amber-400/20", icon: "text-amber-700", dot: "bg-amber-500" },
  { bg: "bg-indigo-500/10", icon: "text-indigo-700", dot: "bg-indigo-500" },
  { bg: "bg-clay/15", icon: "text-clay-dark", dot: "bg-clay-dark" },
];

const ListItems = ({ mapItems }) => {
  return (
    <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-0 lg:grid-cols-3">
      {mapItems.map((item, index) => {
        const accent = accents[index % accents.length];
        return (
          <Link
            key={item.to}
            to={item.to}
            className="group relative animate-fade-up"
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <div className="relative flex aspect-[4/3] flex-col items-center justify-center gap-4 rounded-2xl border-2 border-ink/10 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-ink/20 hover:shadow-lift">
              <span
                className={`absolute right-4 top-4 h-2.5 w-2.5 rounded-full ${accent.dot} opacity-60 transition-transform duration-300 group-hover:scale-150`}
              />
              <span className="absolute left-4 top-3 font-oswald text-xs font-bold uppercase tracking-widest text-ink/80">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span
                className={`flex h-20 w-20 items-center justify-center rounded-2xl ${accent.bg} ${accent.icon} transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110`}
              >
                {item.bigIcon}
              </span>

              <span className="font-oswald text-2xl font-bold uppercase tracking-wide text-ink">
                {item.title}
              </span>

              <span className="mt-1 inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-widest text-ink/70 transition-all duration-300 group-hover:gap-3 group-hover:text-clay-dark">
                Entrar
                <FiArrowUpRight className="text-sm" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ListItems;