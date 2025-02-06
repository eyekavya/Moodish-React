import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../utils/firebase/auth/authApi";
import firestoreApi from "../../utils/firebase/firestore/db";

function Authentication({ isSignUp = false }) {
  const navigate = useNavigate();

  const [authData, setAuthData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function onChangeInput(e) {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  }

  async function onClickSignUp() {
    const data = await authApi.signUpWithEmailPassword(authData);
    console.log(data);
    await firestoreApi.saveDoc(data?.user?.uid, {
      name: authData?.name,
      email: authData?.email,
      signedUp: firestoreApi.getTimeStamp(),
    });

    navigate("/");
  }

  async function onClickSignIn() {
    const data = await authApi.signInWithEmailPassword(authData);
    console.log(data);
    navigate("/");
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
                placeholder="Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none border-2 focus:border-lavender-600"
                onChange={onChangeInput}
                value={authData.name}
              />
            )}
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={authData.email}
              onChange={onChangeInput}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none border-2 focus:border-lavender-600"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={authData.password}
              onChange={onChangeInput}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none border-2 focus:border-lavender-600"
            />

            <button
              className="w-full bg-lavender-600 text-white py-3 rounded-lg hover:bg-lavender-800 transition-all duration-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-lavender-400"
              disabled={false}
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
    </>
  );
}

export default Authentication;
