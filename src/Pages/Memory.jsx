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

  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"Memoria"} />
      <div className="flex flex-wrap gap-4 justify-center p-8">
        {items.map((item, index) => (
          <Card key={index} item={item} id={index} handleClick={handleClick} />
        ))}
      </div>
    </div>
  );
};

export default Memory;
