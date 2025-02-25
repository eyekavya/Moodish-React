import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import authApi from "../../utils/firebase/auth/authApi";
import { SmilePlus, User, Menu, X } from "lucide-react";
import { toast } from "sonner";

function Nav() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleRouting = (route) => {
    navigate(route);
    setMenuOpen(false); // Close menu on navigation
  };

  const handleLogoutClick = async () => {
    try {
      authApi.handleLogout();
      handleRouting("/signin");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="h-16 flex justify-between items-center px-6 md:px-8 py-4 bg-gradient-to-r from-peach-100 to-lavender-200 shadow-md">
      <h2
        className="text-2xl font-extrabold bg-gradient-to-r from-peach-800 to-lavender-800 text-transparent bg-clip-text tracking-wide cursor-pointer"
        onClick={() => handleRouting("/")}
      >
        Moodish
      </h2>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-lavender-800 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
      </button>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center space-x-4">
        {user ? (
          <>
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
          </>
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
      </ul>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg rounded-b-2xl p-4 md:hidden transition-all duration-300">
          <ul className="flex flex-col items-center space-y-4">
            {user ? (
              <>
                <li>
                  <button
                    className="w-full px-4 py-2 rounded-lg flex items-center gap-2 font-semibold text-lavender-800 hover:bg-lavender-100 transition-all duration-200"
                    onClick={() => handleRouting("/mood")}
                  >
                    <SmilePlus className="w-5 h-5" /> Mood Uplifter
                  </button>
                </li>
                <li>
                  <button
                    className="w-full px-4 py-2 rounded-lg flex items-center gap-2 font-semibold text-lavender-800 hover:bg-lavender-100 transition-all duration-200"
                    onClick={() => handleRouting("/profile")}
                  >
                    <User className="w-5 h-5" /> Profile
                  </button>
                </li>
                <li>
                  <button
                    className="w-full px-6 py-2 rounded-lg bg-lavender-600 text-white hover:bg-lavender-800 transition-all duration-200 font-semibold"
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button
                    className="w-full px-6 py-2 rounded-lg bg-transparent border border-lavender-600 text-lavender-800 hover:bg-lavender-600 hover:text-white transition-all duration-200 font-bold"
                    onClick={() => handleRouting("/signin")}
                  >
                    Sign In
                  </button>
                </li>
                <li>
                  <button
                    className="w-full px-6 py-2 rounded-lg bg-lavender-600 text-white hover:bg-lavender-800 transition-all duration-200 font-bold"
                    onClick={() => handleRouting("/signup")}
                  >
                    Sign Up
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Nav;
