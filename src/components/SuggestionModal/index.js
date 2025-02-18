import { Loader2, Sparkles, X } from "lucide-react";
import React from "react";

function SuggestionModal({ setShowModal, loading, suggestions }) {
  const formatSuggestions = (text) => {
    return text
      .split("•")
      .filter(Boolean)
      .map((point) => point.trim());
  };
  return (
    <>
      <div>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-11/12 max-w-2xl relative">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 bg-lavender-600 text-white p-2 rounded-full hover:bg-lavender-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
              <h2 className="text-2xl font-semibold text-lavender-800 flex items-center gap-2">
                Here's Something to Brighten Your Day!
              </h2>
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="flex justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-lavender-600" />
                </div>
              ) : suggestions ? (
                formatSuggestions(suggestions).map((point, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-gradient-to-r from-lavender-200 to-peach-100 transform transition-all duration-300 hover:scale-102 hover:shadow-md animate-fade-in"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <p className="text-lavender-800 font-medium">{point}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No suggestions available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuggestionModal;
