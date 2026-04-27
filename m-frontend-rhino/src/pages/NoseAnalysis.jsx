import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function NoseAnalysis({ features }) {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState("");

  const handleAnalyze = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/analyze-nose", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ features }),
      });

      const data = await res.json();
      setAnalysis(data.analysis);

    } catch (err) {
      console.error(err);
      setAnalysis("Error generating analysis.");
    }

    setLoading(false);
  };

  return (
  <div
  className="mt-6 p-6 rounded-2xl
    bg-gradient-to-br from-white/90 via-blue-50/60 to-white/50
    backdrop-blur-md
    shadow-[0_15px_40px_rgba(0,0,0,0.15)]
    border border-white/70
    w-full max-w-md mx-auto
    space-y-4"
>
    {/* Header */}
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold text-gray-800">
        AI Nose Analysis
      </h2>

      {analysis && (
        <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-medium">
          Generated
        </span>
      )}
    </div>

    {/* Button */}
    <button
      onClick={handleAnalyze}
      className="relative overflow-hidden
        bg-gradient-to-r from-blue-500 to-blue-600
        hover:from-blue-600 hover:to-blue-700
        text-white px-5 py-2.5 rounded-xl
        font-medium shadow-md
        transition-all duration-200
        active:scale-[0.98]"
    >
      {loading ? "Analyzing..." : "Generate Analysis"}
    </button>

    {/* Output */}
    {analysis && (
      <div
        className="max-h-[320px] overflow-y-auto pr-2
          rounded-xl bg-white/60 p-4
          border border-white/50"
      >
        <div className="prose prose-sm text-gray-700 leading-relaxed">
          <ReactMarkdown>{analysis}</ReactMarkdown>
        </div>
      </div>
    )}
  </div>
);}