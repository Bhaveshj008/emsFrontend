import React from 'react';

const StatCard = ({ icon: Icon, title, value, iconColor }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <div className="flex items-center">
      <Icon className={`h-12 w-12 ${iconColor}`} />
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
    </div>
  </div>
);

export default StatCard;