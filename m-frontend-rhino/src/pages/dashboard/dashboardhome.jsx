import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  UserPlus,
  Upload,
  BarChart2,
  FileText,
  Box
} from "lucide-react";
import { TypeAnimation } from "react-type-animation";

function DashboardHome() {
  const { user } = useUser();
  const navigate = useNavigate();

  const cards = [
    { title: "My Patients", route: "/patients", icon: <Users size={28} /> },
    { title: "Add Patient", route: "/preoperation", icon: <UserPlus size={28} /> },
    { title: "Upload Case", route: "/rhinoplasty", icon: <Upload size={28} /> },
    { title: "Compare Results", route: "/comparison", icon: <BarChart2 size={28} /> },
    { title: "Generate Report", route: "/report", icon: <FileText size={28} /> },
    { title: "View 3D Models", route: "/success", icon: <Box size={28} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* Welcome Section */}
      <div className="mb-8">

        {/* Typing Welcome */}
        <TypeAnimation
          sequence={[
            `Welcome Dr ${user?.firstName} `,
            2000,
          ]}
          wrapper="h1"
          speed={50}
          className="text-3xl font-bold text-gray-800"
          repeat={0}
            cursor={false}

        />

        {/* Typing Subtext */}
        <TypeAnimation
          sequence={[
            1500, // delay so it starts after first line
            "What would you like to do today?",
          ]}
          wrapper="p"
          speed={60}
          className="text-gray-500 mt-2"
          repeat={0}
            cursor={false}

        />

      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.route)}
            className="cursor-pointer bg-white rounded-2xl shadow-sm border border-gray-100 p-6 
                       hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-indigo-600 mb-4">
              {card.icon}
            </div>

            <h2 className="text-lg font-semibold text-gray-800">
              {card.title}
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Click to open
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardHome;