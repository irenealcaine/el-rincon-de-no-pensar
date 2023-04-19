import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { BsChatQuote, BsFillCloudSunFill } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import { FaGamepad } from "react-icons/fa";
import { FiWatch } from "react-icons/fi";
import { RxLapTimer } from "react-icons/rx";
import { TfiClose } from "react-icons/tfi";
import { TbPuzzle } from "react-icons/tb";

const menuItems = [
  {
    title: "Proyectos",
    icon: <AiOutlineFundProjectionScreen className="w-8 h-8" />,
    to: "/projects",
    links: [
      {
        title: "Blog",
        to: "/projects/blog",
        icon: <CgNotes className="h-6" />,
      },
      {
        title: "Frases célebres",
        to: "/projects/quotes",
        icon: <BsChatQuote className="h-6" />,
      },
      {
        title: "El tiempo",
        to: "/projects/weather",
        icon: <BsFillCloudSunFill className="h-6" />,
      },
    ],
  },
  {
    title: "Componentes",
    icon: <TbPuzzle className="w-8 h-8" />,
    to: "/components",
    links: [
      {
        title: "Reloj",
        to: "/components/watch",
        icon: <FiWatch className="h-6" />,
      },
      {
        title: "Tempoizador",
        to: "/components/watch",
        icon: <RxLapTimer className="h-6" />,
      },
    ],
  },
  {
    title: "Juegos",
    icon: <FaGamepad className="w-8 h-8" />,
    to: "/games",
    links: [
      {
        title: "Tic-tac-toe",
        to: "/games/tic-tac-toe",
        icon: <TfiClose className="h-6" />,
      },
    ],
  },
];

export default menuItems;
