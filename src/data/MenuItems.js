import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import {
  BsChatQuote,
  // BsFillCloudSunFill
} from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import { FaGamepad } from "react-icons/fa";
import { FiWatch } from "react-icons/fi";
import { RxLapTimer } from "react-icons/rx";
import { TfiClose } from "react-icons/tfi";
import { TbPuzzle } from "react-icons/tb";
import { GiCardAceHearts } from "react-icons/gi";
import { RxCursorArrow } from "react-icons/rx";
import { AiOutlineQuestion } from "react-icons/ai";
import { ImStatsDots } from "react-icons/im"
import { FaRegHandPeace } from 'react-icons/fa'
import { CgGym } from "react-icons/cg"
import { AiOutlineCalculator } from "react-icons/ai"

const menuItems = [
  {
    title: "Proyectos",
    icon: <AiOutlineFundProjectionScreen className="w-6 h-6" />,
    bigIcon: <AiOutlineFundProjectionScreen className="h-16 w-16" />,
    to: "/projects",
    links: [
      {
        title: "Blog",
        to: "/projects/blog",
        icon: <CgNotes className="h-6" />,
        bigIcon: <CgNotes className="h-16 w-16" />,
      },
      {
        title: "Frases célebres",
        to: "/projects/quotes",
        icon: <BsChatQuote className="h-6" />,
        bigIcon: <BsChatQuote className="h-16 w-16" />,
      },
      {
        title: "Registro de peso",
        to: "/projects/weighttracker",
        icon: <ImStatsDots className="h-6" />,
        bigIcon: <ImStatsDots className="h-16 w-16" />,
      },
      {
        title: "Tabla de ejercicios",
        to: "/projects/exercise",
        icon: <CgGym className="h-6" />,
        bigIcon: <CgGym className="h-16 w-16" />,
      },
      // {
      //   title: "El tiempo",
      //   to: "/projects/weather",
      //   icon: <BsFillCloudSunFill className="h-6" />,
      //   bigIcon: <BsFillCloudSunFill className="h-16 w-16" />,
      // },
    ],
  },
  {
    title: "Componentes",
    icon: <TbPuzzle className="w-6 h-6" />,
    bigIcon: <TbPuzzle className="h-16 w-16" />,
    to: "/components",
    links: [
      {
        title: "Reloj",
        to: "/components/watch",
        icon: <FiWatch className="h-6" />,
        bigIcon: <FiWatch className="h-16 w-16" />,
      },
      {
        title: "Temporizador",
        to: "/components/timer",
        icon: <RxLapTimer className="h-6" />,
        bigIcon: <RxLapTimer className="h-16 w-16" />,
      },
      {
        title: "Calculadora",
        to: "/components/calculator",
        icon: <AiOutlineCalculator className="h-6" />,
        bigIcon: <AiOutlineCalculator className="h-16 w-16" />,
      },
    ],
  },
  {
    title: "Juegos",
    icon: <FaGamepad className="w-6 h-6" />,
    bigIcon: <FaGamepad className="h-16 w-16" />,
    to: "/games",
    links: [
      {
        title: "Clicker",
        to: "/games/idle",
        icon: <RxCursorArrow className="h-6" />,
        bigIcon: <RxCursorArrow className="h-16 w-16" />,
      },
      {
        title: "3 en raya",
        to: "/games/tic-tac-toe",
        icon: <TfiClose className="h-6" />,
        bigIcon: <TfiClose className="h-16 w-16" />,
      },
      {
        title: "Parejas",
        to: "/games/memory",
        icon: <GiCardAceHearts className="h-6" />,
        bigIcon: <GiCardAceHearts className="h-16 w-16" />,
      },
      {
        title: "Preguntas",
        to: "/games/quiz",
        icon: <AiOutlineQuestion className="h-6" />,
        bigIcon: <AiOutlineQuestion className="h-16 w-16" />,
      },
      {
        title: "Piedra, papel, tijeras",
        to: "/games/rock-paper-scissors",
        icon: <FaRegHandPeace className="h-6" />,
        bigIcon: <FaRegHandPeace className="h-16 w-16" />,
      },
    ],
  },
];

export default menuItems;
