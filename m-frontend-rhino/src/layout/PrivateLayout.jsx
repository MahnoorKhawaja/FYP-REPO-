import { Outlet } from "react-router-dom";
import DashboardSidebar from "../layout/dashboardsidebar";

const PrivateLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default PrivateLayout;