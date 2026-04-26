import { useNavigate } from "react-router-dom";
import { Search, User } from "lucide-react";
import { useState } from "react";

function MyPatients() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // temporary dummy data (replace with backend later)
  const patients = [
    { id: 1, name: "Ali Khan", age: 32 },
    { id: 2, name: "Sara Ahmed", age: 28 },
    { id: 3, name: "John Doe", age: 40 },
  ];

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-8 pt-20">

      {/* Header */}
      <div className="max-w-5xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800">My Patients</h1>
        <p className="text-gray-500 mt-2">
          View and manage all your patient records
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-10 relative">
        <Search className="absolute left-4 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search patients..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Patient List */}
      <div className="max-w-5xl mx-auto grid gap-6">
        {filteredPatients.map((patient) => (
          <div
            key={patient.id}
            onClick={() => navigate(`/patients/${patient.id}`)}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 
                       hover:shadow-md hover:-translate-y-1 transition cursor-pointer flex items-center justify-between"
          >

            {/* Left side */}
            <div className="flex items-center gap-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <User className="text-indigo-600" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {patient.name}
                </h2>
                <p className="text-sm text-gray-500">
                  Age: {patient.age}
                </p>
              </div>
            </div>

            {/* Right side */}
            <span className="text-sm text-gray-400">
              View Profile →
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default MyPatients;