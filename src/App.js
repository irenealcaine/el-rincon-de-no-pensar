import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./Pages/Home";
import Sidebar from "./Components/Sidebar";
import Blog from "./Pages/Blog";
import Games from "./Pages/Games";
import Components from "./Pages/Components";
// import Error from "./Pages/Error";
import Projects from "./Pages/Projects";
import RandomQuotes from "./Pages/RandomQuotes";
import BlogPostDetail from "./Pages/BlogPostDetail";
import WeatherApp from "./Pages/WeatherApp";
import WatchPage from "./Pages/WatchPage";
import TimerPage from "./Pages/TimerPage";
import TicTacToeGame from "./Pages/TicTacToeGame";
import MemoryPage from "./Pages/MemoryPage";
import Idle from "./Pages/Idle";
import Questions from "./Pages/Questions";
import WeightTracker from "./Pages/WeightTracker";
import RPSGame from "./Pages/RPSGame";
import HangmanGame from "./Pages/HangmanGame";
import Exercise from "./Pages/Exercise";
import CalculatorPage from "./Pages/CalculatorPage";
import CarouselPage from "./Pages/CarouselPage";
import TodoListPage from "./Pages/TodoListPage";
import GalleryPage from "./Pages/GalleryPage";
import FAQPage from "./Pages/FAQ";
import ColorPalettePage from "./Pages/ColorPalettePage";
import PasswordGeneratorPage from "./Pages/PasswordGeneratorPage";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <div className="flex">
          <a
            href="#container"
            className="skip-link bg-ink text-white font-bold"
          >
            Saltar al contenido
          </a>
          <Sidebar />
          <div
            id="container"
            className="absolute md:static pl-12 md:pl-0 z-0 w-full h-full bg-blue-100"
          >
            <Routes>
              <Route exact path="/" element={<Home />} />

              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/blog" element={<Blog />} />
              <Route path="/post/:slug" element={<BlogPostDetail />} />
              <Route path="/projects/quotes" element={<RandomQuotes />} />
              <Route path="/projects/weather" element={<WeatherApp />} />
              <Route path="/projects/weighttracker" element={<WeightTracker />} />
              <Route path="/projects/exercise" element={<Exercise />} />
              <Route path="/projects/todo" element={<TodoListPage />} />
              <Route path="/projects/gallery" element={<GalleryPage />} />
              <Route path="/projects/palette" element={<ColorPalettePage />} />
              <Route path="/projects/password" element={<PasswordGeneratorPage />} />

              <Route path="/components" element={<Components />} />
              <Route path="/components/watch" element={<WatchPage />} />
              <Route path="/components/timer" element={<TimerPage />} />
              <Route
                path="/components/calculator"
                element={<CalculatorPage />}
              />
              <Route path="/components/carousel" element={<CarouselPage />} />
              <Route path="/components/faq" element={<FAQPage />} />

              <Route path="/games" element={<Games />} />
              <Route path="/games/tic-tac-toe" element={<TicTacToeGame />} />
              <Route path="/games/memory" element={<MemoryPage />} />
              <Route path="/games/idle" element={<Idle />} />
              <Route path="/games/quiz" element={<Questions />} />
              <Route path="/games/rock-paper-scissors" element={<RPSGame />} />
              <Route path="/games/hangman" element={<HangmanGame />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
