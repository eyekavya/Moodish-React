import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Smile } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-lavender-200 to-peach-100 flex flex-col items-center justify-center px-6 text-center">
      {/* Header */}
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
        className="text-lg text-text-secondary mt-4 max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Your go-to space for lifting your mood! Select how you feel and get
        personalized ways to brighten your day. 😊
      </motion.p>

      {/* Mood Selection CTA */}
      <motion.div
        className="mt-8"
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

      {/* Feature Highlights */}
      <motion.div
        className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 },
          },
        }}
      >
        {[
          "Personalized Suggestions",
          "Track Your Mood",
          "Positive Content Feed",
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h3 className="text-xl font-semibold text-lavender-800">
              {feature}
            </h3>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
