/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, User, Calendar, BarChart, Loader2 } from "lucide-react";
import firestoreApi from "../../utils/firebase/firestore/db";
import { useAuth } from "../../hooks/useAuth";

function Profile() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [moodData, setMoodData] = useState(null);
  const [frequentMoods, setFrequentMoods] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString();
  };

  async function fetchMoodData() {
    if (!user?.uid) return;
    try {
      const data = await firestoreApi.getMoodData(user.uid);
      setMoodData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  async function fetchFrequentMoods() {
    if (!user?.uid) return;
    try {
      const data = await firestoreApi.getFrequentMoods(user.uid);

      setFrequentMoods(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    async function fetchUserData() {
      setLoading(true);
      if (!user?.uid) return;
      try {
        const data = await firestoreApi.getUserData(user.uid);
        setUserData(data);
        fetchMoodData();
        fetchFrequentMoods();
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-lavender-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-lavender-200 to-peach-100 flex flex-col items-center py-10 px-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg text-center"
      >
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 bg-lavender-400 rounded-full flex items-center justify-center shadow-md">
            <User className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-primary capitalize">
          {userData?.name}
        </h1>
        <p className="text-secondary mt-2">{userData?.email}</p>
        <p className="text-sm text-muted mt-1">
          {/* <Clock className="inline w-4 h-4 text-accent mr-1" /> */}
          Member since: {formatDate(userData?.createdAt)}
        </p>
      </motion.div>

      {/* Mood Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 w-full max-w-lg"
      >
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <Sparkles className="text-yellow-500" /> Mood Overview
          </h2>
          <p className="text-text-secondary mt-2">
            Your most frequent moods this week
          </p>

          {!frequentMoods && (
            <p className="text-center mt-4 text-gray-900">
              No moods selected this week
            </p>
          )}
          <div className="grid grid-cols-3 gap-4 mt-4">
            {frequentMoods?.map((e, i) => (
              <div key={i} className="text-center text-gray-900">
                {e.mood}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Progress Tracking */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 w-full max-w-lg"
      >
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <BarChart className="text-blue-500" /> Mood Progress
          </h2>
          <p className="text-text-secondary mt-2">
            See how your mood has changed over time
          </p>
          <div className="mt-4 h-32 bg-lavender-100 rounded-lg flex items-center justify-center">
            <p className="text-lavender-700">[Mood Graph Placeholder]</p>
          </div>
        </div>
      </motion.div>

      {/* Mood Tracking History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8 w-full max-w-lg"
      >
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <Calendar className="text-green-500" /> Mood History
          </h2>
          <p className="text-text-secondary mt-2">Your latest mood logs</p>
          <ul className="mt-4 space-y-2">
            <li className="bg-lavender-200 p-3 rounded-lg">
              😊 Feeling great - 2 hours ago
            </li>
            <li className="bg-peach-200 p-3 rounded-lg">
              😰 Stressed - Yesterday
            </li>
            <li className="bg-lavender-300 p-3 rounded-lg">
              🥱 Tired - 3 days ago
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

export default Profile;
