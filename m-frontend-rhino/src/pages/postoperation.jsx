import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ComparisonUploadPage() {
  const navigate = useNavigate();

  const preOpKeys = ["front", "left", "right", "basal"];
  const postOpKeys = ["post_front", "post_left", "post_right", "post_basal"];

  const [images, setImages] = useState({
    front: null,
    left: null,
    right: null,
    basal: null,
    post_front: null,
    post_left: null,
    post_right: null,
    post_basal: null,
  });

  const [preview, setPreview] = useState({
    front: null,
    left: null,
    right: null,
    basal: null,
    post_front: null,
    post_left: null,
    post_right: null,
    post_basal: null,
  });

  const [loading, setLoading] = useState(false);

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setImages((prev) => ({ ...prev, [key]: file }));
      setPreview((prev) => ({ ...prev, [key]: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = async () => {
    for (const key of [...preOpKeys, ...postOpKeys]) {
      if (!images[key]) {
        alert("Please upload all 8 images (Pre-Op + Post-Op).");
        return;
      }
    }

    const formData = new FormData();
    [...preOpKeys, ...postOpKeys].forEach((key) => formData.append(key, images[key]));

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/upload_comparison",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      localStorage.setItem("nose_scores", JSON.stringify(response.data["nose_scores"]));
      localStorage.setItem("resultFilename_pre", response.data["3d_results_pre"]);
      localStorage.setItem("resultFilename_post", response.data["3d_results_post"]);
      console.log("Received response:", response.data);

      alert("Upload successful! Redirecting to comparison page...");
      navigate("/comparison");

    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload images.");
    } finally {
      setLoading(false);
    }
  };

  const renderImageBox = (label, key) => (
    <div
      key={key}
      className="bg-white/10 rounded-2xl shadow-lg p-4 flex flex-col items-center justify-center hover:bg-white/20 transition"
    >
      <label htmlFor={key} className="cursor-pointer flex flex-col items-center">
        {preview[key] ? (
          <img
            src={preview[key]}
            alt={label}
            className="w-40 h-40 object-cover rounded-lg mb-3 border-2 border-white"
          />
        ) : (
          <div className="w-40 h-40 flex items-center justify-center border-2 border-dashed border-white rounded-lg mb-3">
            <span className="text-sm opacity-70">Upload {label}</span>
          </div>
        )}
        <input
          id={key}
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, key)}
          className="hidden"
        />
        <span className="text-sm font-medium">{label}</span>
      </label>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-indigo-900 via-purple-700 to-pink-500 p-8 text-white">
      <h1 className="text-3xl font-bold mb-10">Upload Pre & Post Operation Images</h1>

      <h2 className="text-xl font-semibold mb-4">Pre-Operation Images</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mb-10">
        {preOpKeys.map((key) =>
          renderImageBox(key.replace("_", " ").toUpperCase(), key)
        )}
      </div>

      <h2 className="text-xl font-semibold mb-4">Post-Operation Images</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mb-10">
        {postOpKeys.map((key) =>
          renderImageBox(key.replace("_", " ").toUpperCase(), key)
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`mt-6 bg-white text-indigo-900 font-semibold py-2 px-6 rounded-xl hover:bg-indigo-100 transition ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Uploading..." : "Upload & Compare"}
      </button>
    </div>
  );
}
