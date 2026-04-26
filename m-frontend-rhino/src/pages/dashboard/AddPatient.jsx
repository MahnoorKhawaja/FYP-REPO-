import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function AddPatient() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("New Patient Data:", form);

    // later: send to backend here

    navigate("/dashboard/patients");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-8 pt-20">

      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 text-gray-600 hover:text-black mb-8"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      {/* Form Container */}
      <div className="max-w-2xl mx-auto bg-white shadow-md border border-gray-100 rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Add New Patient
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Patient Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          {/* Age */}
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          {/* Gender */}
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          {/* Notes */}
          <textarea
            name="notes"
            placeholder="Medical Notes"
            value={form.notes}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            rows="4"
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            Save Patient
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddPatient;