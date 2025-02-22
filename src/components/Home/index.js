import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Smile,
  Coffee,
  ArrowRight,
  Droplet,
  Lightbulb,
  Moon,
  Wind,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-lavender-200 to-peach-100 min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center h-screen px-6">
        <motion.h1
          className="text-5xl font-bold text-lavender-900 flex items-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Moodish{" "}
          <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
        </motion.h1>
        <motion.p
          className="text-lg text-gray-700 mt-4 max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          AI-powered mood booster! Select how you feel and get personalized ways
          to brighten your day. 😊
        </motion.p>
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/mood"
            className="px-6 py-3 bg-lavender-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-lavender-800 transition-all flex items-center gap-2"
          >
            Start Your Mood Journey <Smile className="w-6 h-6" />
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-lavender-900">
          Discover Moodish
        </h2>
        <p className="text-gray-600 mt-2">
          AI-powered suggestions tailored to your mood.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              title: "Personalized Mood Suggestions",
              description:
                "Receive custom recommendations based on how you feel.",
              icon: <Lightbulb className="w-8 h-8 text-lavender-800" />,
            },
            {
              title: "Track Your Mood Over Time",
              description:
                "Monitor patterns in your emotions and improve self-awareness.",
              icon: <Moon className="w-8 h-8 text-lavender-800" />,
            },
            {
              title: "Swipe for Positivity",
              description: "Browse uplifting content to brighten your day.",
              icon: <Smile className="w-8 h-8 text-lavender-800" />,
            },
            {
              title: "Engaging Mood Challenges",
              description: "Try interactive activities to boost your mindset.",
              icon: <Wind className="w-8 h-8 text-lavender-800" />,
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              {feature.icon}
              <h3 className="text-xl font-semibold text-lavender-800 mt-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center">
          <Link
            to="/signup"
            className="w-fit px-4 py-2 bg-lavender-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-lavender-800 transition-all flex items-center gap-2"
          >
            Get Started <ArrowRight className="w-6 h-8" />
          </Link>
          <p className="mt-4 text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="text-lavender-800 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </section>

      {/* Mental Health Tips */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-lavender-900">
          Essential Well-being Tips
        </h2>
        <p className="text-gray-600 mt-2">
          Simple ways to maintain a healthy mind and body.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              title: "Water Properly",
              description:
                "Stay hydrated to improve mental clarity and well-being.",
              icon: <Droplet className="w-8 h-8 text-lavender-800" />,
            },
            {
              title: "Provide Light",
              description: "Sunlight helps regulate mood and energy levels.",
              icon: <Lightbulb className="w-8 h-8 text-lavender-800" />,
            },
            {
              title: "Control Temperature",
              description:
                "A comfortable environment supports relaxation and focus.",
              icon: <Moon className="w-8 h-8 text-lavender-800" />,
            },
            {
              title: "Ensure Air Flow",
              description: "Fresh air can boost mood and reduce stress.",
              icon: <Wind className="w-8 h-8 text-lavender-800" />,
            },
          ].map((tip, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              {tip.icon}
              <h3 className="text-lg font-semibold text-lavender-800 mt-3">
                {tip.title}
              </h3>
              <p className="text-gray-600 text-sm mt-2">{tip.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Support the Project */}
      <section className="py-16 px-6 text-center bg-peach-200">
        <h2 className="text-3xl font-bold text-lavender-900">
          Support the Project
        </h2>
        <p className="text-gray-600 mt-2">
          If you find this tool helpful, consider buying me a coffee to <br />{" "}
          support ongoing development!
        </p>
        <div className="mt-6 flex justify-center">
          <a
            href="https://www.buymeacoffee.com/yourlink"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit px-5 py-3 bg-yellow-400 text-black text-lg font-semibold rounded-lg shadow-lg flex items-center gap-2 transition-all duration-300 hover:bg-yellow-500 hover:scale-105"
          >
            <Coffee className="w-6 h-6" /> Buy Me a Coffee
          </a>
        </div>
      </section>
      {/* Footer */}
      <footer className="mt-16 py-6 text-center text-gray-700">
        <div className="flex flex-col items-center space-y-2">
          <p className="text-sm">&copy; {new Date().getFullYear()} Moodish</p>
          <div className="flex items-center space-x-2">
            <span className="text-sm">Made with</span>
            <span className="text-red-500 text-lg animate-pulse">❤️</span>
            <span className="text-sm">to brighten your day</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
