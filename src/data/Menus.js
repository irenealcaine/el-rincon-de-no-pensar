import { BsChatQuote } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";

const Menus = [
  // {
  //   title: "Juegos",
  //   src: "https://uxwing.com/wp-content/themes/uxwing/download/sport-and-awards/game-controller-icon.png",
  //   to: "/games",
  //   submenu: [
  //     {
  //       title: "Tic-tac-toe",
  //       to: "tic-tac-toe",
  //       src: "https://cdn-icons-png.flaticon.com/512/75/75519.png",
  //     },
  //     {
  //       title: "Dinosaurio",
  //       to: "dinosaur",
  //       src: "https://i.pinimg.com/originals/da/4a/68/da4a6837b228b8ef07df341ddf9b2e36.png",
  //     },
  //   ],
  // },
  {
    title: "Frases",
    to: "/quotes",
    src: "https://cdn-icons-png.flaticon.com/512/7350/7350737.png",
    icon: <BsChatQuote className="w-8 h-8" />,
  },
  // {
  //   title: "El tiempo",
  //   to: "weather",
  //   src: "https://cdn-icons-png.flaticon.com/512/54/54241.png",
  // },
  // {
  //   title: "To-Do",
  //   src: "https://www.freeiconspng.com/uploads/check-mark-icon-17.png",
  //   to: "/todo",
  // },

  {
    title: "Blog",
    src: "https://cdn-icons-png.flaticon.com/512/4922/4922073.png",
    to: "/blog",
    icon: <CgNotes className="w-8 h-8" />,
  },
];

export default Menus;
