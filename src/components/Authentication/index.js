import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, X } from "lucide-react";
import authApi from "../../utils/firebase/auth/authApi";
import firestoreApi from "../../utils/firebase/firestore/db";
import { toast } from "sonner";

function Authentication({ isSignUp = false }) {
  const navigate = useNavigate();
  const [authData, setAuthData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordModalOpen, setForgotPasswordModalOpen] =
    useState(false);
  const [resetEmail, setResetEmail] = useState("");

  function onChangeInput(e) {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  }

  function validateInputs() {
    if (isSignUp && authData.name.length < 3) {
      toast.error("Name should be at least 3 characters long");
      return false;
    }
    if (!authData.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (authData.password.length < 6) {
      toast.error("Password should be at least 6 characters long");
      return false;
    }
    return true;
  }

  async function onClickSignUp() {
    if (!validateInputs()) return;
    const data = await authApi.signUpWithEmailPassword(authData);
    await firestoreApi.saveDoc(data?.user?.uid, {
      name: authData?.name,
      email: authData?.email,
      createdAt: firestoreApi.getTimeStamp(),
    });
    navigate("/mood");
  }

  async function onClickSignIn() {
    if (!validateInputs()) return;
    const data = await authApi.signInWithEmailPassword(authData);
    if (data?.user) {
      navigate("/mood");
    }
  }

  async function onResetPassword() {
    if (!resetEmail.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    await authApi.resetPassword(resetEmail);
    toast.success("Password reset link sent to your email");
    setForgotPasswordModalOpen(false);
  }

  return (
    <>
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-b from-lavender-200 to-peach-100">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-center text-4xl font-extrabold bg-gradient-to-r from-peach-800 to-lavender-800 text-transparent bg-clip-text tracking-wide mb-8">
            Moodish
          </h1>
          <div className="space-y-4">
            {isSignUp && (
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none border-2 focus:border-lavender-600"
                onChange={onChangeInput}
                value={authData.name}
              />
            )}
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={authData.email}
              onChange={onChangeInput}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none border-2 focus:border-lavender-600"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                name="password"
                value={authData.password}
                onChange={onChangeInput}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none border-2 focus:border-lavender-600 pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 active:text-gray-600 transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {!isSignUp && (
              <button
                className="text-sm text-lavender-800 hover:underline"
                onClick={() => setForgotPasswordModalOpen(true)}
              >
                Forgot password?
              </button>
            )}
            <button
              className="w-full bg-lavender-600 text-white py-3 rounded-lg hover:bg-lavender-800 transition-all duration-200 font-bold"
              onClick={isSignUp ? onClickSignUp : onClickSignIn}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </div>
          <p className="text-center text-gray-500 mt-4 text-sm">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <Link
              to={isSignUp ? "/signin" : "/signup"}
              className="text-lavender-800 hover:underline"
            >
              {isSignUp ? " Log in" : " Sign up"}
            </Link>
          </p>
        </div>
      </div>
      {isForgotPasswordModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
              onClick={() => setForgotPasswordModalOpen(false)}
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold text-center text-lavender-800 mb-4">
              Reset Password
            </h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none border-2 focus:border-lavender-600"
            />
            <div className="mt-6 flex justify-center">
              <button
                className="px-6 py-2 bg-lavender-600 text-white rounded-lg hover:bg-lavender-800"
                onClick={onResetPassword}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Authentication;
