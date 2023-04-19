import { CgNotes } from "react-icons/cg";
import { FaDragon, FaArrowLeft, FaGamepad } from "react-icons/fa";
import { BsChatQuote, BsFillCaretUpFill } from "react-icons/bs";
import { TfiClose } from "react-icons/tfi";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { TbPuzzle } from "react-icons/tb";
import { MdOutlineWatchLater } from "react-icons/md";

const menuItems = [
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
        icon: <MdOutlineWatchLater className="h-6" />,
      },
    ],
  },
];

export default menuItems;
