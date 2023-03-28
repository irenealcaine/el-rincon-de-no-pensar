import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Sidebar from "./Components/Sidebar";
import Quotes from "./Pages/Quotes";
import Games from "./Pages/Games";
import Portfolio from "./Pages/Portfolio";

function App() {
  return (
    <>
      <Router>
        <div className="flex">
          <Sidebar />
          <div
            id="container"
            className="absolute md:static pl-20 md:pl-0 z-0 w-full h-full bg-green-50"
          >
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/quotes" element={<Quotes />} />
              <Route path="/games" element={<Games />} />
              <Route path="/portfolio" element={<Portfolio />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
