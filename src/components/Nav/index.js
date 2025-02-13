import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import authApi from "../../utils/firebase/auth/authApi";
import { SmilePlus, User } from "lucide-react";
import firestoreApi from "../../utils/firebase/firestore/db";

function Nav() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRouting = (route) => {
    navigate(route);
  };

  const handleLogoutClick = async () => {
    try {
      authApi.handleLogout();
      handleRouting("/signin");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
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

          {user ? (
            <ul className="flex items-center space-x-4">
              <li>
                <button
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 font-semibold transition-all duration-200 ${
                    location.pathname === "/mood"
                      ? "bg-lavender-100 text-lavender-800"
                      : "text-lavender-800 hover:bg-lavender-100"
                  }`}
                  onClick={() => handleRouting("/mood")}
                >
                  <SmilePlus className="w-5 h-5" /> Mood Uplifter
                </button>
              </li>
              <li>
                <button
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 font-semibold transition-all duration-200 ${
                    location.pathname === "/profile"
                      ? "bg-lavender-100 text-lavender-800"
                      : "text-lavender-800 hover:bg-lavender-100"
                  }`}
                  onClick={() => handleRouting("/profile")}
                >
                  <User className="w-5 h-5" /> Profile
                </button>
              </li>
              <li>
                <button
                  className="px-6 py-2 rounded-lg bg-lavender-600 text-white hover:bg-lavender-800 transition-all duration-200 font-semibold"
                  onClick={handleLogoutClick}
                >
                  Logout
                </button>
              </li>
            </ul>
          ) : (
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
          )}
        </nav>
      </div>
    </>
  );
}

export default Nav;
