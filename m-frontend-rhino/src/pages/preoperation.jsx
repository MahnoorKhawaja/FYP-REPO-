import React, { useState } from "react";
import axios from "axios";

export default function PreOperationPage() {
  const [images, setImages] = useState({
    front: null,
    left: null,
    right: null,
    basal: null,
  });

  const [preview, setPreview] = useState({
    front: null,
    left: null,
    right: null,
    basal: null,
  });

  const [loading, setLoading] = useState(false);

  const handleImageChange = (e, view) => {
    const file = e.target.files[0];
    if (file) {
      setImages((prev) => ({ ...prev, [view]: file }));
      setPreview((prev) => ({ ...prev, [view]: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = async () => {
    if (!images.front || !images.left || !images.right || !images.basal) {
      alert("Please upload all four images before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("front", images.front);
    formData.append("left", images.left);
    formData.append("right", images.right);
    formData.append("basal", images.basal);

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload successful:", response.data);
      alert("Images uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload images. Check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-sky-500 p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">Pre-Operation Image Upload</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {[
          { label: "Front View", key: "front" },
          { label: "Left Profile View", key: "left" },
          { label: "Right Profile View", key: "right" },
          { label: "Basal View", key: "basal" },
        ].map(({ label, key }) => (
          <div
            key={key}
            className="bg-white/10 rounded-2xl shadow-lg p-4 flex flex-col items-center justify-center hover:bg-white/20 transition"
          >
            <label
              htmlFor={key}
              className="cursor-pointer flex flex-col items-center"
            >
              {preview[key] ? (
                <img
                  src={preview[key]}
                  alt={`${label}`}
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
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`mt-10 bg-white text-blue-800 font-semibold py-2 px-6 rounded-xl hover:bg-blue-100 transition ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Uploading..." : "Upload All"}
      </button>
    </div>
  );
}
