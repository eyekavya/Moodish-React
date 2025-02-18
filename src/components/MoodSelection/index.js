import React, { useState } from "react";
import { analyzeMood } from "../../utils/googleAI/moodAnalyzer";
import { Loader2, Send } from "lucide-react";
import firestoreApi from "../../utils/firebase/firestore/db";
import { useAuth } from "../../hooks/useAuth";
import SuggestionModal from "../SuggestionModal";
import { toast } from "sonner";

function MoodSelection() {
  const { user } = useAuth();
  const [userMood, setUserMood] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const moods = [
    { id: 1, name: "Sad 😢" },
    { id: 2, name: "Stressed 😰" },
    { id: 3, name: "Angry 😠" },
    { id: 4, name: "Tired 😴" },
    { id: 5, name: "Anxious 😟" },
    { id: 6, name: "Overwhelmed 🌪️" },
    { id: 7, name: "Lonely 🥺" },
    { id: 8, name: "Frustrated 🤯" },
    { id: 9, name: "Bored 😒" },
    { id: 10, name: "Heartbroken 💔" },
    { id: 11, name: "Hopeless 😞" },
    { id: 12, name: "Jealous 😒" },
    { id: 13, name: "Guilty 😔" },
    { id: 14, name: "Regretful 🫤" },
    { id: 15, name: "Rejected ❌" },
    { id: 16, name: "Insecure 😟" },
    { id: 17, name: "Fearful 😨" },
    { id: 18, name: "Annoyed 😤" },
    { id: 19, name: "Shy 🫣" },
    { id: 20, name: "Resentful 🤬" },
    { id: 21, name: "Embarrassed 🫠" },
    { id: 22, name: "Disappointed 😕" },
    { id: 23, name: "Confused 😵‍💫" },
    { id: 24, name: "Lonely 🥀" },
    { id: 25, name: "Nervous 🫨" },
    { id: 26, name: "Overworked 💼" },
    { id: 27, name: "Restless 🌀" },
    { id: 28, name: "Helpless 🫎" },
    { id: 29, name: "Ashamed 🙈" },
    { id: 30, name: "Defeated 🏳️" },
    { id: 31, name: "Unloved 💔" },
    { id: 32, name: "Underconfident 😔" },
  ];

  const handleMoodSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowModal(false);

    try {
      const result = await analyzeMood(userMood);
      setSuggestions(result);
      setShowModal(true);
      setUserMood("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  async function handleMoodCardClick(moodName) {
    setSuggestions("");
    setShowModal(true);
    setLoading(true);

    try {
      const result = await analyzeMood(moodName);
      setSuggestions(result);
      const data = {
        mood: moodName,
        moodTimeStamp: firestoreApi.getTimeStamp(),
        suggestion: result,
      };

      await firestoreApi.saveMood(user?.uid, data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-lavender-200 to-peach-100 flex flex-col items-center py-10 px-6">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-lavender-900">
            How are you feeling today?
          </h1>
          <p className="text-lg text-text-secondary mt-3">
            Share how you're feeling, and let's find ways to lift your spirits.
          </p>
        </header>

        {/* Input Section */}
        <form onSubmit={handleMoodSubmit} className="w-full max-w-lg mb-10">
          <div className="relative">
            <input
              type="text"
              value={userMood}
              onChange={(e) => setUserMood(e.target.value)}
              placeholder="Type your mood and press Enter..."
              className="w-full p-4 rounded-lg border border-lavender-400 shadow-sm focus:ring-2 focus:ring-lavender-400 focus:outline-none"
            />
            <button
              disabled={loading || !userMood}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-5 py-2 bg-lavender-600 text-white rounded-lg shadow-md hover:bg-lavender-800 focus:ring-2 focus:ring-lavender-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>

        {/* Mood Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl">
          {moods.map((moods) => (
            <div
              key={moods.id}
              className="bg-white border border-gray-200 rounded-lg shadow-md p-5 flex flex-col items-center text-center cursor-pointer 
        hover:bg-gradient-to-b hover:from-lavender-300 hover:to-peach-200 transition-transform transform hover:scale-105"
              onClick={() => {
                handleMoodCardClick(moods.name);
              }}
            >
              <span className="text-2xl">{moods.name.split(" ")[1]}</span>
              <p className="mt-2 text-lg font-medium text-gray-700">
                {moods.name.split(" ")[0]}
              </p>
            </div>
          ))}
        </div>

        {/* Suggestion Modal */}
        {showModal && (
          <SuggestionModal
            suggestions={suggestions}
            setShowModal={setShowModal}
            loading={loading}
          />
        )}

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-text-secondary text-sm">
            It's okay to feel how you feel. Let's find something to help!
          </p>
        </footer>
      </div>
    </>
  );
}

export default MoodSelection;
