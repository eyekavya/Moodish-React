import React, { useState } from "react";
import Nav from "../Nav";

function MoodSelection() {
  const [userMood, setUserMood] = useState("");
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

  const handleMoodSubmit = (e) => {
    if (e.key === "Enter" && userMood.trim()) {
      console.log("Submitted Mood:", userMood); // Replace with actual submission logic
      setUserMood(""); // Clear the input after submission
    }
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-lavender-100 flex flex-col items-center py-10 px-6">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-lavender-800">
            How are you feeling today?
          </h1>
          <p className="text-lg text-text-secondary mt-3">
            Select a mood or type in how you feel to get personalized
            suggestions.
          </p>
        </header>

        {/* Input Section */}
        <div className="w-full max-w-lg mb-10">
          <input
            type="text"
            value={userMood}
            onChange={(e) => setUserMood(e.target.value)}
            onKeyDown={handleMoodSubmit}
            placeholder="Type your mood and press Enter..."
            className="w-full p-4 rounded-lg border border-lavender-400 shadow-sm focus:ring-2 focus:ring-lavender-400 focus:outline-none"
          />
        </div>

        {/* Mood Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl">
          {moods.map((mood) => (
            <div
              key={mood.id}
              className="bg-white border border-gray-200 rounded-lg shadow-md p-5 flex flex-col items-center text-center cursor-pointer hover:bg-lavender-200 transition-transform transform hover:scale-105"
            >
              <span className="text-2xl">{mood.name.split(" ")[1]}</span>
              <p className="mt-2 text-lg font-medium text-gray-700">
                {mood.name.split(" ")[0]}
              </p>
            </div>
          ))}
        </div>

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
