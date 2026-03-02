import StatsCards from "../../component/dashboard/StatsCards";
import RecentActivity from "../../component/dashboard/RecentActivity";

const DashboardHome = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        Surgeon Dashboard
      </h1>

      <StatsCards />
      <RecentActivity />
    </div>
  );
};

export default DashboardHome;