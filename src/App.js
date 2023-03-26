import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Sidebar from "./Components/Sidebar";
import Quotes from "./Pages/Quotes";

function App() {
  return (
    <>
      <Router>
        <div className="flex">
          <Sidebar />
          <div id="container" className="absolute md:static pl-20 md:pl-0 z-0 w-full h-full bg-green-50">
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/quotes' element={<Quotes />} />

            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
