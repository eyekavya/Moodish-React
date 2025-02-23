import React from "react";
import { Link } from "react-router-dom";
import { Frown, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-gradient-to-b from-lavender-200 to-peach-100 text-center px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
      >
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 10 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.5,
          }}
          className="bg-white p-6 rounded-full shadow-lg"
        >
          <Frown className="w-16 h-16 text-lavender-800" />
        </motion.div>

        <h1 className="text-6xl font-bold text-lavender-900 mt-6">
          Oops! Page Not Found
        </h1>
        <p className="text-xl text-gray-700 mt-4 max-w-md">
          Looks like you're lost in the void. Let's get you back to a happier
          place!
        </p>

        <motion.div
          initial={{ y: 10 }}
          animate={{ y: -10 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.5,
          }}
          className="mt-8"
        >
          <Link
            to="/"
            className="px-6 py-3 bg-lavender-600 text-white text-lg font-semibold rounded-full shadow-lg flex items-center gap-2 hover:bg-lavender-800 transition-all"
          >
            <Home className="w-6 h-6" /> Take Me Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
