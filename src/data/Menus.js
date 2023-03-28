const Menus = [
  {
    title: "Portfolio",
    src: "https://cdn-icons-png.flaticon.com/512/14/14573.png",
    to: "/portfolio",
  },
  {
    title: "Juegos",
    src: "https://www.freepnglogos.com/uploads/games-png/games-controller-game-icon-17.png",
    to: "/games",
    submenu: [
      {
        title: "Tic-tac-toe",
        to: "tic-tac-toe",
        src: "https://cdn-icons-png.flaticon.com/512/75/75519.png",
      },
      {
        title: "Dinosaurio",
        to: "dinosaur",
        src: "https://i.pinimg.com/originals/da/4a/68/da4a6837b228b8ef07df341ddf9b2e36.png",
      },
    ],
  },
  {
    title: "Frases célebres",
    src: "https://cdn-icons-png.flaticon.com/512/7350/7350737.png",
    to: "/quotes",
  },
  {
    title: "El tiempo",
    src: "https://cdn-icons-png.flaticon.com/512/54/54241.png",
    to: "/weather",
  },
  {
    title: "To-Do",
    src: "https://www.freeiconspng.com/uploads/check-mark-icon-17.png",
    to: "/todo",
  },
];

export default Menus;
