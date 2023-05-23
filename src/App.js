import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Sidebar from "./Components/Sidebar";
import Blog from "./Pages/Blog";
import Games from "./Pages/Games";
import Components from "./Pages/Components";
import Error from "./Pages/Error";
import Projects from "./Pages/Projects";
import RandomQuotes from "./Pages/RandomQuotes";
import BlogPostDetail from "./Pages/BlogPostDetail";
import WeatherApp from "./Pages/WeatherApp";
import Timer from "./Components/Timer";
import Watch from "./Components/Watch";
import TicTacToe from "./Pages/TicTacToe";
import Memory from "./Pages/Memory";

function App() {
  return (
    <>
      <Router>
        <div className="flex">
          <Sidebar />
          <div
            id="container"
            className="absolute md:static pl-16 md:pl-0 z-0 w-full h-full bg-blue-50"
          >
            <Routes>
              <Route exact path="/" element={<Home />} />

              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/blog" element={<Blog />} />
              <Route path="/post/:id" element={<BlogPostDetail />} />
              <Route path="/projects/quotes" element={<RandomQuotes />} />
              <Route path="/projects/weather" element={<WeatherApp />} />

              <Route path="/components" element={<Components />} />
              <Route path="/components/watch" element={<Watch />} />
              <Route path="/components/timer" element={<Timer />} />

              <Route path="/games" element={<Games />} />
              <Route path="/games/tic-tac-toe" element={<TicTacToe />} />
              <Route path="/games/memory" element={<Memory />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
