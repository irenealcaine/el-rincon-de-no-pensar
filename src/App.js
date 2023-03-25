import { Route, Routes, BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Quotes from "./pages/Quotes";

const App = () => {
  return (
    <div className="flex gap-5">
      <Sidebar />
      <div className="max-w-5xl flex-1 mx-auto py-4">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/quotes" element={<Quotes />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
