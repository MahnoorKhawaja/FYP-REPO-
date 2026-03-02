const StatsCards = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-xl shadow">
        Total Patients: 12
      </div>
      <div className="bg-white p-4 rounded-xl shadow">
        Active Cases: 5
      </div>
      <div className="bg-white p-4 rounded-xl shadow">
        AI Evaluations: 8
      </div>
    </div>
  );
};

export default StatsCards;