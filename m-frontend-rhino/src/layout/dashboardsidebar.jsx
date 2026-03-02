import { Link } from "react-router-dom";

const DashboardSidebar = () => {
  return (
    <div className="w-64 bg-white border-r p-4">
      <h2 className="text-xl font-semibold mb-6">Rhino AI</h2>

      <nav className="flex flex-col gap-3">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/rhinoplasty">New Case</Link>
      </nav>
    </div>
  );
};

export default DashboardSidebar;