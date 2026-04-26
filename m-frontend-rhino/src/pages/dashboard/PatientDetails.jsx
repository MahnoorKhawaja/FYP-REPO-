import { useParams, useNavigate } from "react-router-dom";
import { User, ArrowLeft } from "lucide-react";

function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // dummy data (replace later with API)
  const patient = {
    id,
    name: "Ali Khan",
    age: 32,
    gender: "Male",
    notes: "Patient undergoing pre-op evaluation.",
  };

  return (
    <div className="min-h-screen bg-gray-50 px-8 pt-20">

      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard/patients")}
        className="flex items-center gap-2 text-gray-600 hover:text-black mb-8"
      >
        <ArrowLeft size={18} />
        Back to Patients
      </button>

      {/* Profile Card */}
      <div className="max-w-3xl mx-auto bg-white shadow-md border border-gray-100 rounded-2xl p-8">

        <div className="flex items-center gap-4 mb-6">
          <div className="bg-indigo-100 p-4 rounded-full">
            <User className="text-indigo-600" size={28} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {patient.name}
            </h1>
            <p className="text-gray-500">Patient ID: {patient.id}</p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4 text-gray-700">

          <div>
            <span className="font-semibold">Age:</span> {patient.age}
          </div>

          <div>
            <span className="font-semibold">Gender:</span> {patient.gender}
          </div>

          <div>
            <span className="font-semibold">Notes:</span>
            <p className="mt-1 text-gray-600">{patient.notes}</p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default PatientDetails;