import React from "react";
import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();

  const handleRouting = (route) => {
    navigate(route);
  };

  return (
    <>
      <div>
        <nav className="h-16 flex justify-between items-center px-8 py-4 bg-gradient-to-r from-peach-100 to-lavender-200 shadow-md">
          <h2
            className="text-2xl font-extrabold bg-gradient-to-r from-peach-800 to-lavender-800 text-transparent bg-clip-text tracking-wide cursor-pointer"
            onClick={() => handleRouting("/")}
          >
            Moodish
          </h2>

          <div className="space-x-4">
            <button
              className="px-6 py-2 rounded-lg bg-transparent border border-lavender-600 text-lavender-800 hover:bg-lavender-600 hover:text-white transition-all duration-200 font-bold"
              onClick={() => handleRouting("/signin")}
            >
              Sign In
            </button>
            <button
              className="px-6 py-2 rounded-lg bg-lavender-600 text-white hover:bg-lavender-800 transition-all duration-200 font-bold"
              onClick={() => handleRouting("/signup")}
            >
              Sign Up
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Nav;
