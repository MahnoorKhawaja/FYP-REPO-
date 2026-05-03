import { useParams, useNavigate } from "react-router-dom";
import { User, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from 'axios';

function PatientDetails() {
  const navigate = useNavigate();  
  const { patientId } = useParams();
  const { user } = useUser();
  const [patient, setPatient] = useState(null);
  console.log("PatientDetails loaded");
  console.log("Params:", patientId);
  console.log("User:", user);
  

  useEffect(() => {
  console.log('=== useEffect triggered ===');
  console.log('user.id:', user?.id);
  console.log('patientId:', patientId);  
  if (!user?.id || !patientId) return;  // Add !patientId check

  const fetchPatients = async () => {
    try {
      console.log('Fetching patient for ID:', patientId);  // Debug log
      const res = await axios.get(
        `http://localhost:8000/patients_details?patient_id=${patientId}`
      );
      setPatient(res.data);
      console.log('Patient data:', res.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  fetchPatients();
}, [user?.id, patientId]);  // Include user.id to refetch if user changes


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
              {patient ? patient.name : "Patient not found"}
            </h1>
            <p className="text-gray-500">Patient ID: {patient ? patient.id : "N/A"}</p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4 text-gray-700">

          <div>
            <span className="font-semibold">Age:</span> {patient ? patient.age : "N/A"}
          </div>

          <div>
            <span className="font-semibold">Gender:</span> {patient ? patient.gender : "N/A"}
          </div>

          <div>
            <span className="font-semibold">Notes:</span>
            <p className="mt-1 text-gray-600">{patient ? patient.notes : "N/A"}</p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default PatientDetails;