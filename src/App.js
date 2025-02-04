import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/signIn";
import MoodSelection from "./components/MoodSelection";
import Nav from "./components/Nav";

function App() {
  return (
    <>
      <div>
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/mood" element={<MoodSelection />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
