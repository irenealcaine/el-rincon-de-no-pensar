import { AiOutlineQuestion } from "react-icons/ai";

function Card({ item, id, handleClick }) {
  const flipped = !!item.stat;

  return (
    <button
      onClick={() => handleClick(id)}
      disabled={item.stat === "correct"}
      className="perspective-600 block w-full aspect-square focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 focus-visible:rounded-2xl"
      aria-label={flipped ? `Carta ${item.id}` : "Carta boca abajo"}
    >
      <div
        className={`preserve-3d relative w-full h-full transition-transform duration-300 ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        <div className="backface-hidden absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-900 shadow-md flex items-center justify-center">
          <AiOutlineQuestion className="w-1/3 h-1/3 text-blue-100" />
        </div>

        <div
          className={`backface-hidden rotate-y-180 absolute inset-0 rounded-2xl border-2 bg-white p-1.5 shadow-md overflow-hidden ${
            item.stat === "correct"
              ? "border-emerald-400 ring-2 ring-emerald-300"
              : item.stat === "wrong"
              ? "border-red-400 ring-2 ring-red-300"
              : "border-blue-200"
          }`}
        >
          <img
            src={item.img}
            alt="Carta"
            className="w-full h-full object-contain rounded-xl"
          />
        </div>
      </div>
    </button>
  );
}

export default Card;