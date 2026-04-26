import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Users, UserPlus } from "lucide-react";
import { TypeAnimation } from "react-type-animation";

function DashboardHome() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const cards = [
    { title: "My Patients", route: "/dashboard/patients", icon: <Users size={40} /> },
    { title: "Add a new Patient", route: "/dashboard/add-patient", icon: <UserPlus size={40} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-24 px-6 text-center">

      {/* Welcome Section */}
      <div className="mb-16 flex flex-col items-center">

        {/* Profile Image */}
        {isLoaded && (
          <img
            src={user?.imageUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full mb-4 border-2 border-gray-200 shadow-sm"
          />
        )}

        {/* Welcome Text */}
        <TypeAnimation
          sequence={[
            `Welcome Dr. ${isLoaded ? user?.firstName || "Doctor" : "Doctor"}`,
            2000,
          ]}
          wrapper="h1"
          speed={50}
          className="text-5xl font-bold text-gray-800"
          repeat={0}
          cursor={false}
        />

        <TypeAnimation
          sequence={[1500, "What would you like to do today?"]}
          wrapper="p"
          speed={60}
          className="text-xl text-gray-500 mt-4"
          repeat={0}
          cursor={false}
        />
      </div>

      {/* Cards */}
      <div className="flex gap-10 justify-center items-center flex-wrap">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.route)}
            className="cursor-pointer bg-white rounded-3xl shadow-md border border-gray-100 
                       p-10 w-80 hover:shadow-xl hover:-translate-y-2 
                       transition-all duration-300 text-center"
          >
            <div className="text-indigo-600 mb-6 flex justify-center">
              {card.icon}
            </div>

            <h2 className="text-2xl font-semibold text-gray-800">
              {card.title}
            </h2>

            <p className="text-gray-500 text-base mt-2">
              Click to open
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardHome;