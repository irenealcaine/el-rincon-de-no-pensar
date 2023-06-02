import { useState } from "react";
import Header from "../Components/Header";
import Card from "../Components/Card";

const Memory = () => {
  const [items, setItems] = useState(
    [
      {
        id: 1,
        img: "https://img.icons8.com/?size=512&id=62yTna5C9Gw6&format=png",
        stat: "",
      },
      {
        id: 1,
        img: "https://img.icons8.com/?size=512&id=62yTna5C9Gw6&format=png",
        stat: "",
      },
      {
        id: 2,
        img: "https://img.icons8.com/?size=512&id=eFPBXQop6V2m&format=png",
        stat: "",
      },
      {
        id: 2,
        img: "https://img.icons8.com/?size=512&id=eFPBXQop6V2m&format=png",
        stat: "",
      },
      {
        id: 3,
        img: "https://img.icons8.com/?size=512&id=D2NqKl85S8Ye&format=png",
        stat: "",
      },
      {
        id: 3,
        img: "https://img.icons8.com/?size=512&id=D2NqKl85S8Ye&format=png",
        stat: "",
      },
      {
        id: 4,
        img: "https://img.icons8.com/?size=512&id=LoL4bFzqmAa0&format=png",
        stat: "",
      },
      {
        id: 4,
        img: "https://img.icons8.com/?size=512&id=LoL4bFzqmAa0&format=png",
        stat: "",
      },
      {
        id: 5,
        img: "https://img.icons8.com/?size=512&id=MR3dZdlA53te&format=png",
        stat: "",
      },
      {
        id: 5,
        img: "https://img.icons8.com/?size=512&id=MR3dZdlA53te&format=png",
        stat: "",
      },
      {
        id: 6,
        img: "https://img.icons8.com/?size=512&id=nj0Uj45LGUYh&format=png",
        stat: "",
      },
      {
        id: 6,
        img: "https://img.icons8.com/?size=512&id=nj0Uj45LGUYh&format=png",
        stat: "",
      },
    ].sort(() => Math.random() - 0.5)
  );

  const [prev, setPrev] = useState(-1);
  const [gameOver, setGameOver] = useState(false);

  function check(current) {
    if (items[current].id === items[prev].id) {
      items[current].stat = "correct";
      items[prev].stat = "correct";
      setItems([...items]);
      setPrev(-1);
    } else {
      items[current].stat = "wrong";
      items[prev].stat = "wrong";
      setItems([...items]);
      setTimeout(() => {
        items[current].stat = "";
        items[prev].stat = "";
        setItems([...items]);
        setPrev(-1);
      }, 300);
    }
    const allPairsFound = items.every((item) => item.stat === "correct");
    if (allPairsFound) {
      setGameOver(true);
    }
  }

  function handleClick(id) {
    if (prev === -1) {
      items[id].stat = "active";
      setItems([...items]);
      setPrev(id);
    } else {
      check(id);
    }
  }

  function handleNewGame() {
    items.sort(() => Math.random() - 0.5);
    const resetItems = items.map((item) => {
      return { ...item, stat: "" };
    });
    setItems(resetItems);
    setGameOver(false);
    setPrev(-1);
  }

  return (
    <div className="bg-blue-100 min-h-screen pb-8">
      <Header title={"Memoria"} />
      <div className="flex flex-wrap gap-4 justify-center p-8">
        {items.map((item, index) => (
          <Card key={index} item={item} id={index} handleClick={handleClick} />
        ))}
      </div>
      {gameOver && ( // Mostrar el botón solo cuando el juego haya terminado
        <button
          className="bg-blue-400 hover:bg-blue-700 text-white font-bold block mx-auto my-4 px-8 py-2 rounded-md transition duration-500"
          onClick={handleNewGame}
        >
          Nuevo juego
        </button>
      )}
    </div>
  );
};

export default Memory;
