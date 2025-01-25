import React from "react";
import Nav from "../Nav";

function MoodSelection() {
  const moods = [
    { id: 1, name: "Happy 😊" },
    { id: 2, name: "Stressed 😓" },
    { id: 3, name: "Tired 😴" },
    { id: 4, name: "Excited 🤩" },
    { id: 5, name: "Calm 🧘‍♀️" },
  ];

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-lavender-100 flex flex-col items-center py-8">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-lavender-800">
            How are you feeling today?
          </h1>
          <p className="text-text-secondary mt-2">
            Select a mood to get personalized suggestions.
          </p>
        </header>

        {/* Mood Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full px-4 max-w-4xl">
          {moods.map((mood) => (
            <div
              key={mood.id}
              className="bg-lavender-200 p-6 rounded-lg shadow-lg text-center cursor-pointer hover:bg-lavender-400 transition duration-300"
            >
              <p className="text-xl font-semibold text-text-primary">
                {mood.name}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-text-secondary">
            Remember, it's okay to feel how you feel. Let's find something to
            help!
          </p>
        </footer>
      </div>
    </>
  );
}

export default MoodSelection;
