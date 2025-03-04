import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, User, Loader2 } from "lucide-react";
import firestoreApi from "../../utils/firebase/firestore/db";
import { useAuth } from "../../hooks/useAuth";
import MoodCalendar from "../MoodCalendar";
import MoodHistory from "../MoodHistory";
import { toast } from "sonner";

function Profile() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [frequentMoods, setFrequentMoods] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString();
  };

  async function fetchMoodData() {
    if (!user?.uid) return [];
    try {
      const data = await firestoreApi.getMoodData(user.uid);
      return data;
    } catch (error) {
      toast.error(error.message);
      return [];
    }
  }

  function fetchFrequentMoods(moods) {
    if (!moods || moods.length === 0) {
      setFrequentMoods([]);
      return;
    }

    // Get timestamp for 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Filter moods from the last 7 days
    const recentMoods = moods.filter((m) => {
      const moodDate = m.moodTimeStamp?.toDate
        ? m.moodTimeStamp.toDate()
        : null;
      return moodDate && moodDate >= sevenDaysAgo;
    });

    if (recentMoods.length === 0) {
      setFrequentMoods([]);
      return;
    }

    // Count occurrences of each mood
    const moodCount = {};
    recentMoods.forEach((m) => {
      if (moodCount[m.mood]) {
        moodCount[m.mood]++;
      } else {
        moodCount[m.mood] = 1;
      }
    });

    // Sort moods by frequency and take the top 3
    const sortedMoods = Object.entries(moodCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([mood]) => ({ mood }));

    setFrequentMoods(sortedMoods);
  }

  useEffect(() => {
    async function fetchUserData() {
      setLoading(true);
      if (!user?.uid) return;
      try {
        const data = await firestoreApi.getUserData(user.uid);
        setUserData(data);
        const moods = await fetchMoodData(); // Fetch moods and wait
        fetchFrequentMoods(moods); // Call fetchFrequentMoods after moods are available
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          Member since: {formatDate(userData?.createdAt)}
        </p>
      </motion.div>

      {/* Frequent Mood */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 w-full max-w-lg"
      >
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <Sparkles className="text-yellow-500" /> Mood Insights
          </h2>
          <p className="text-text-secondary mt-2">
            Most logged moods over the past 7 days
          </p>

          {!frequentMoods || frequentMoods.length === 0 ? (
            <p className="text-center mt-4 text-gray-900">
              No moods selected this week
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {frequentMoods.map((e, i) => (
                <div key={i} className="text-center text-gray-900">
                  {e.mood}
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Mood Calendar */}
      <MoodCalendar />

      {/* Mood Tracking History */}
      <MoodHistory />
    </div>
  );
}

export default Profile;
