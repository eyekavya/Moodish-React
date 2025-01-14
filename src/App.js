import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Authentication from "./components/Authentication";

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Authentication />} />
            <Route path="/signin" element={<Authentication />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
