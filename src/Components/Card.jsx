import { AiOutlineQuestion } from "react-icons/ai";

function Card({ item, id, handleClick }) {
  return (
    <div
      className={`bg-blue-700/20 border-2 border-blue-700 p-4 rounded-xl w-5/12 max-w-[180px] md:w-3/12 lg:w-2/12 aspect-square ${
        item.stat === "correct" ? "!bg-green-300" : ""
      } ${item.stat === "wrong" ? "!bg-red-300" : ""}`}
      onClick={() => {
        item.stat !== "correct" && handleClick(id);
      }}
    >
      <AiOutlineQuestion
        className={`text-blue-700 ${!item.stat ? "w-full h-full" : "h-0 w-0"} `}
      />
      <img
        src={item.img}
        alt="/"
        className={`${item.stat ? "w-full h-full" : "h-0 w-0"} `}
      />
    </div>
  );
}

export default Card;
