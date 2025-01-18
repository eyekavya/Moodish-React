import React, { useState } from "react";
import Nav from "../Nav";
import { useNavigate } from "react-router-dom";
import authApi from "../../utils/firebase/auth/authApi";
function Authentication(props) {
  const navigate = useNavigate();

  console.log(props.signinSignup);

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

            <button
              type="submit"
              className="w-full bg-lavender-600 text-white py-3 rounded-lg hover:bg-lavender-800 transition-all duration-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-lavender-400"
              disabled={false}
              onClick={
                props.signinSignup === "signup"
                  ? () => {
                      onClickSignUp();
                      handleRouting("/signup");
                    }
                  : () => {
                      onClickSignIn();
                      handleRouting("/signin");
                    }
              }
            >
              {props.signinSignup === "signup" ? "Sign Up" : "Sign In"}
            </button>
          </form>
          <p className="text-center text-gray-500 mt-4 text-sm">
            {props.signinSignup === "signup"
              ? "Already have an account?"
              : "Don't have an account?"}
            <a
              href={props.signinSignup === "signup" ? "/signin" : "/signup"}
              className="text-lavender-800 hover:underline"
              onClick={() => {
                onClickSignIn();
                handleRouting("/signin");
              }}
            >
              {props.signinSignup === "signup" ? "Log in" : "Sign up"}
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Authentication;
