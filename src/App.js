import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Sidebar from "./Components/Sidebar";
import Blog from "./Pages/Blog";
import Games from "./Pages/Games";
import Projects from "./Pages/Projects";
import RandomQuotes from "./Pages/RandomQuotes";
import BlogPostDetail from "./Pages/BlogPostDetail";
import WeatherApp from "./Pages/WeatherApp";

function App() {
  return (
    <>
      <Router>
        <div className="flex">
          <Sidebar />
          <div
            id="container"
            className="absolute md:static pl-16 md:pl-0 z-0 w-full h-full bg-green-50"
          >
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/games" element={<Games />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/blog" element={<Blog />} />
              <Route path="/projects/quotes" element={<RandomQuotes />} />
              <Route path="/projects/weather" element={<WeatherApp />} />

              <Route path="/post/:1" element={<BlogPostDetail />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
