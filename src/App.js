import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/signIn";
import MoodSelection from "./components/MoodSelection";
import Nav from "./components/Nav";
import Profile from "./components/Profile";
import { Toaster } from "sonner";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <div>
        <Toaster richColors />
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/mood"
              element={
                <ProtectedRoute>
                  <MoodSelection />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
