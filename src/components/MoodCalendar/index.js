import React, { useEffect, useState } from "react";
import firestoreApi from "../../utils/firebase/firestore/db";
import { useAuth } from "../../hooks/useAuth";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

const MoodCalendar = () => {
  const { user } = useAuth();
  const [moodData, setMoodData] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);

  useEffect(() => {
    async function fetchMoodData() {
      if (!user?.uid) return;
      try {
        const data = await firestoreApi.getMoodData(user.uid);
        setMoodData(data);
      } catch (error) {
        console.error("Error fetching mood data:", error);
      }
    }
    fetchMoodData();
  }, [user]);

  const getMoodForDate = (date) => {
    const moodEntry = moodData.find(
      (m) =>
        new Date(m.moodTimeStamp.toDate()).toDateString() ===
        date.toDateString()
    );
    return moodEntry ? moodEntry.mood.match(/\p{Emoji}/gu)?.[0] || "" : "";
  };

  const renderCalendar = () => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

    let days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(today.getFullYear(), today.getMonth(), day);
      const mood = getMoodForDate(currentDate);

      days.push(
        <div
          key={day}
          className="h-12 w-12 flex items-center justify-center bg-lavender-100 rounded-lg cursor-pointer hover:bg-lavender-400 transition"
          onClick={() =>
            setSelectedMood(mood ? { date: currentDate, mood } : null)
          }
        >
          {mood || day}
        </div>
      );
    }

    return days;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white p-6 rounded-2xl shadow-md mt-8 w-full max-w-lg"
    >
      <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
        <CalendarDays className="text-blue-500" /> Mood Calendar
      </h2>
      <p className="text-text-secondary mt-2">
        Your mood throughout this month
      </p>
      <div className="grid grid-cols-7 gap-2 mt-4">{renderCalendar()}</div>

      {selectedMood && (
        <div className="mt-4 p-4 bg-peach-100 rounded-lg">
          <p className="text-lg font-semibold">
            {selectedMood.date.toDateString()}
          </p>
          <p className="text-xl">Mood: {selectedMood.mood}</p>
        </div>
      )}
    </motion.div>
  );
};

export default MoodCalendar;
