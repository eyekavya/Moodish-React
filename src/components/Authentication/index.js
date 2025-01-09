import React from "react";

function Authentication() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-lavender-200 to-peach-100">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-center text-4xl font-extrabold bg-gradient-to-r from-peach-800 to-lavender-800 text-transparent bg-clip-text tracking-wide mb-8">
            Moodish
          </h1>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none border-2 focus:border-lavender-600"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none border-2 focus:border-lavender-600"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none border-2 focus:border-lavender-600"
            />

            <button
              type="submit"
              className="w-full bg-lavender-600 text-white py-3 rounded-lg hover:bg-lavender-800 transition-all duration-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-lavender-400"
              disabled={false}
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-gray-500 mt-4 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-lavender-800 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Authentication;
