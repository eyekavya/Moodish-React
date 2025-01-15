import React, { useState } from "react";
import Nav from "../Nav";
import { useNavigate } from "react-router-dom";
import authApi from "../../utils/firebase/auth/authApi";

function Authentication(props) {
  const [signUpData, setSignUpData] = useState({ email: "", password: "" });
  const [signInData, setSignInData] = useState({ email: "", password: "" });

  function handleEmail(e) {
    setSignUpData({ ...signUpData, email: e.target.value });
  }

  function handlePassword(e) {
    setSignUpData({ ...signUpData, password: e.target.value });
  }

  function handleSignInData(e) {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  }

  async function onClickSignUp() {
    const data = await authApi.signUpWithEmailPassword(signUpData);
    console.log(data);
  }

  async function onClickSignIn() {
    const data = await authApi.signInWithEmailPassword(signUpData);
    console.log(data);
  }

  const navigate = useNavigate();

  const handleRouting = (route) => {
    navigate(route);
  };
  return (
    <>
      <Nav />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-lavender-200 to-peach-100">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-center text-4xl font-extrabold bg-gradient-to-r from-peach-800 to-lavender-800 text-transparent bg-clip-text tracking-wide mb-8">
            Moodish
          </h1>

          <form className="space-y-4">
            {props.signinSignup === "signup" && (
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none border-2 focus:border-lavender-600"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={
                props.signinSignup === "signup"
                  ? signUpData.email
                  : signInData.email
              }
              onChange={
                props.signinSignup === "signup" ? handleEmail : handleSignInData
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none border-2 focus:border-lavender-600"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={
                props.signinSignup === "signup"
                  ? signUpData.password
                  : signInData.password
              }
              onChange={
                props.signinSignup === "signup"
                  ? handlePassword
                  : handleSignInData
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none border-2 focus:border-lavender-600"
            />

            {props.signinSignup === "signup" ? (
              <button
                type="submit"
                className="w-full bg-lavender-600 text-white py-3 rounded-lg hover:bg-lavender-800 transition-all duration-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-lavender-400"
                disabled={false}
                onClick={() => {
                  onClickSignUp();
                  handleRouting("/signup");
                }}
              >
                Sign Up
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-lavender-600 text-white py-3 rounded-lg hover:bg-lavender-800 transition-all duration-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-lavender-400"
                disabled={false}
                onClick={() => {
                  onClickSignIn();
                  handleRouting("/signin");
                }}
              >
                Sign In
              </button>
            )}
          </form>

          {props.signinSignup === "signup" ? (
            <p className="text-center text-gray-500 mt-4 text-sm">
              Already have an account?{" "}
              <a
                href="/signin"
                className="text-lavender-800 hover:underline"
                onClick={() => {
                  onClickSignIn();
                  handleRouting("/signin");
                }}
              >
                Log in
              </a>
            </p>
          ) : (
            <p className="text-center text-gray-500 mt-4 text-sm">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-lavender-800 hover:underline"
                onClick={() => {
                  onClickSignUp();
                  handleRouting("/signup");
                }}
              >
                Sign up
              </a>
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Authentication;
