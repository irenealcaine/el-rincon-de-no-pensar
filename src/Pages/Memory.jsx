import { useState, useEffect } from "react";
import shuffle from "lodash.shuffle";

const cards = [
  {
    id: 1,
    name: "Card 1",
    image:
      "https://logodownload.org/wp-content/uploads/2014/04/coca-cola-logo-1-1.png",
  },
  {
    id: 2,
    name: "Card 2",
    image:
      "https://static.vecteezy.com/system/resources/previews/001/188/470/non_2x/fire-icon-png.png",
  },
  {
    id: 3,
    name: "Card 3",
    image:
      "https://img.freepik.com/iconos-gratis/marcador-posicion_318-922354.jpg",
  },
  {
    id: 4,
    name: "Card 4",
    image:
      "https://i.pinimg.com/originals/aa/00/57/aa0057e6b512af2195427c6a785085f5.png",
  },
  {
    id: 5,
    name: "Card 5",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/479px-WhatsApp_icon.png",
  },
];

function Game() {
  const [openedCards, setOpenedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [shuffledCards, setShuffledCards] = useState([]);

  useEffect(() => {
    setShuffledCards(shuffle(cards.concat(cards)));
  }, []);

  const handleCardClick = (card) => {
    if (openedCards.length === 0) {
      setOpenedCards([card]);
    } else if (openedCards.length === 1) {
      if (openedCards[0].id === card.id) {
        setMatchedCards([...matchedCards, openedCards[0], card]);
      }
      setOpenedCards([...openedCards, card]);
      setTimeout(() => {
        setOpenedCards([]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-wrap justify-center">
      {shuffledCards.map((card) => (
        <div
          key={card.id}
          className="w-32 h-32 m-4 rounded-lg shadow-md bg-gray-100 flex justify-center items-center cursor-pointer hover:bg-gray-200 transition-colors duration-300"
          onClick={() => handleCardClick(card)}
        >
          {matchedCards.includes(card) || openedCards.includes(card) ? (
            <img
              src={card.image}
              alt={card.name}
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default Game;
