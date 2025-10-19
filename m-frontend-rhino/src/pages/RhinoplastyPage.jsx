export default function RhinoplastyPage() {
  const navigate = (path) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-sky-500 p-6">
      <div className="text-center max-w-xl bg-white/30 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/40">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-4 drop-shadow-lg">
          AI-Based Rhinoplasty Evaluation
        </h1>
        <p className="text-blue-950/90 text-lg mb-10">
          Empowering surgeons with data-driven precision for pre and post-operative analysis.
        </p>

        <div className="flex gap-6 justify-center">
          <button
            onClick={() => navigate("/preoperation")}
            className="px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300"
          >
            Pre Operation
          </button>

          <button
            onClick={() => navigate("/postoperation")}
            className="px-8 py-4 text-lg font-semibold text-blue-900 bg-white rounded-xl shadow-lg hover:bg-blue-50 hover:text-blue-800 transition-all duration-300"
          >
            Post Operation
          </button>
        </div>
      </div>

      <footer className="mt-10 text-white/80 text-sm">
        © 2025 Rhinoplasty AI — Precision. Clarity. Confidence.
      </footer>
    </div>
  );
}
