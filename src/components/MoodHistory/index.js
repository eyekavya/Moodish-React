import React, { useEffect, useState } from "react";
import firestoreApi from "../../utils/firebase/firestore/db";
import { useAuth } from "../../hooks/useAuth";
import { motion } from "framer-motion";
import { Calendar, Info } from "lucide-react";
import { toast } from "sonner";
import SuggestionModal from "../SuggestionModal";

const MoodHistory = () => {
  const { user } = useAuth();
  const [moodHistory, setMoodHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState("");

  const formatTimeAgo = (timestamp) => {
    const date = timestamp.toDate();
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  async function handleCardClick(entry) {
    setShowModal(true);
    setLoading(true);

    try {
      setSuggestions(entry.suggestion);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchMoodHistory() {
      if (!user?.uid) return;
      try {
        const moods = await firestoreApi.getMoodData(user.uid);
        const sortedMoods = moods.sort(
          (a, b) => b.moodTimeStamp.toDate() - a.moodTimeStamp.toDate()
        );
        setMoodHistory(sortedMoods);
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchMoodHistory();
  }, [user]);

  return (
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
        <p className="text-text-secondary mt-2">
          A look back at your recent moods
        </p>

        {/* Scrollable list with fixed height */}
        <div className="mt-4 max-h-72 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <ul className="space-y-2">
            {moodHistory.length > 0 ? (
              moodHistory.map((entry, index) => {
                const moodParts = entry.mood.split(" ");
                const moodEmoji = moodParts.pop();
                const moodText = moodParts.join(" ");
                return (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-lavender-200 p-3 rounded-lg hover:bg-lavender-400 transition cursor-pointer"
                    onClick={() => {
                      handleCardClick(entry);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{moodEmoji}</span>
                      <span className="text-text-primary font-medium">
                        {moodText}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        {formatTimeAgo(entry.moodTimeStamp)}
                      </span>
                      <Info className="text-gray-600 w-5 h-5 hover:text-text-accent transition" />
                    </div>
                  </li>
                );
              })
            ) : (
              <p className="text-center mt-4 text-gray-900">
                No mood logs yet.
              </p>
            )}
          </ul>
        </div>
        {/* Suggestion Modal */}
        {showModal && (
          <SuggestionModal
            suggestions={suggestions}
            setShowModal={setShowModal}
            loading={loading}
          />
        )}
      </div>
    </motion.div>
  );
};

export default MoodHistory;
