import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Smile,
  Coffee,
  ArrowRight,
  Droplet,
  Lightbulb,
  Brain,
  Bed,
  Footprints,
  Timer,
  Trophy,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="bg-gradient-to-b from-lavender-200 to-peach-100 min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center h-[calc(100vh-64px)] px-6">
        <motion.h1
          className="text-7xl font-bold text-lavender-900 flex flex-col items-center gap-2 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-text-contrast">Understand & Elevate Your</span>
          <span className="flex items-center gap-2 text-lavender-600">
            Mood Effortlessly{" "}
            <Sparkles className="w-12 h-12 text-lavendar-600 animate-pulse" />
          </span>
        </motion.h1>

        <motion.p
          className="text-2xl text-gray-700 mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span>
            Select how you're feeling, and our AI will provide personalized
            activities, insights, and
          </span>
          <br />
          <span>uplifting content to help you feel your best in seconds.</span>
        </motion.p>

        <motion.div
          className="mt-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/mood"
            className="px-6 py-3 mt-8 bg-lavender-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-lavender-800 transition-all flex items-center gap-2"
          >
            Start Your Mood Journey <Smile className="w-6 h-6" />
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-4xl font-bold text-lavender-900">
          Unlock a Happier Life
        </h2>
        <p className="text-gray-600 text-xl mt-2">
          Get AI-driven suggestions to boost your mood, reduce stress, and stay
          motivated.
        </p>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
              icon: <Timer className="w-8 h-8 text-lavender-800" />,
            },
            {
              title: "Swipe for Positivity",
              description: "Browse uplifting content to brighten your day.",
              icon: <Smile className="w-8 h-8 text-lavender-800" />,
            },
            {
              title: "Engaging Mood Challenges",
              description: "Try interactive activities to boost your mindset.",
              icon: <Trophy className="w-8 h-8 text-lavender-800" />,
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
              <p className="text-gray-600 text-m mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center">
          <Link
            to={user ? "/mood" : "/signup"}
            className="w-fit px-4 py-2 bg-lavender-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-lavender-800 transition-all flex items-center gap-2"
          >
            Get Started <ArrowRight className="w-6 h-8" />
          </Link>
          {!user && (
            <p className="mt-4 text-gray-600">
              Already have an account?{" "}
              <Link to="/signin" className="text-lavender-800 hover:underline">
                Sign in
              </Link>
            </p>
          )}
        </div>
      </section>

      {/* Mental Health Tips */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-4xl font-bold text-lavender-900">
          Essential Well-being Tips
        </h2>
        <p className="text-gray-600 text-xl mt-2">
          Simple ways to maintain a healthy mind and body.
        </p>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              title: "Practice Mindfulness",
              description:
                "Breathe deeply and focus on the present to ease stress.",
              icon: <Brain className="w-8 h-8 text-lavender-800" />,
            },
            {
              title: "Stay Hydrated",
              description: "Drink enough water to stay focused and energized.",
              icon: <Droplet className="w-8 h-8 text-lavender-800" />,
            },
            {
              title: "Prioritize Sleep",
              description:
                "Stick to a routine and limit screen time before bed.",
              icon: <Bed className="w-8 h-8 text-lavender-800" />,
            },
            {
              title: "Move Your Body",
              description:
                "A short walk or stretch can boost your mood instantly.",
              icon: <Footprints className="w-8 h-8 text-lavender-800" />,
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
              <h3 className="text-xl font-semibold text-lavender-800 mt-3">
                {tip.title}
              </h3>
              <p className="text-gray-600 text-m mt-2">{tip.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Support the Project */}
      <section className="py-16 px-6 text-center bg-peach-200">
        <h2 className="text-4xl font-bold text-lavender-900">
          Support the Project
        </h2>
        <p className="text-gray-600 text-xl mt-4">
          If you find this tool helpful, consider buying me a coffee to <br />{" "}
          support ongoing development!
        </p>
        <div className="mt-8 flex justify-center">
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
