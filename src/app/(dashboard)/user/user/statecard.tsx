import React from 'react';

const StatCard = ({ count, label, icon, type }) => {
  return (
    <div className="stat-card bg-gradient-to-br from-gray-100 to-gray-300 p-6 rounded-xl shadow-md flex items-center space-x-6 transition-transform transform hover:scale-105 hover:shadow-xl border border-transparent">
      <div className="icon bg-gradient-to-r from-orange-400 to-orange-500 text-white p-4 rounded-full shadow-lg">
        {icon}
      </div>
      <div className="details">
        <p className="text-lg font-semibold text-gray-700 mb-2">{label}</p>
        <p className="text-3xl font-bold text-gray-800">{count}</p>
      </div>
    </div>
  );
};

export default StatCard;
