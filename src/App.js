import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Timer from "./Components/Timer";
import Watch from "./Components/Watch";
import TicTacToeGame from "./Pages/TicTacToeGame";
import Memory from "./Pages/Memory";
import Idle from "./Pages/Idle";
import Questions from "./Pages/Questions";
import WeightTracker from "./Pages/WeightTracker";
import RPSGame from "./Pages/RPSGame";
import Exercise from "./Pages/Exercise";
import CalculatorPage from "./Pages/CalculatorPage";
import CarouselPage from "./Pages/CarouselPage";
import TodoListPage from "./Pages/TodoListPage";
import GalleryPage from "./Pages/GalleryPage";

function App() {
  return (
    <>
      <Router>
        <div className="flex">
          <Sidebar />
          <div
            id="container"
            className="absolute md:static pl-12 md:pl-0 z-0 w-full h-full bg-blue-50"
          >
            <Routes>
              <Route exact path="/" element={<Home />} />

              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/blog" element={<Blog />} />
              <Route path="/post/:id" element={<BlogPostDetail />} />
              <Route path="/projects/quotes" element={<RandomQuotes />} />
              <Route path="/projects/weather" element={<WeatherApp />} />
              <Route path="/projects/weighttracker" element={<WeightTracker />} />
              <Route path="/projects/exercise" element={<Exercise />} />
              <Route path="/projects/todo" element={<TodoListPage />} />
              <Route path="/projects/gallery" element={<GalleryPage />} />

              <Route path="/components" element={<Components />} />
              <Route path="/components/watch" element={<Watch />} />
              <Route path="/components/timer" element={<Timer />} />
              <Route
                path="/components/calculator"
                element={<CalculatorPage />}
              />
              <Route path="/components/carousel" element={<CarouselPage />} />

              <Route path="/games" element={<Games />} />
              <Route path="/games/tic-tac-toe" element={<TicTacToeGame />} />
              <Route path="/games/memory" element={<Memory />} />
              <Route path="/games/idle" element={<Idle />} />
              <Route path="/games/quiz" element={<Questions />} />
              <Route path="/games/rock-paper-scissors" element={<RPSGame />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
