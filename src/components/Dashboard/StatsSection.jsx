import React from 'react';
import { Users, DollarSign, Building2 } from 'lucide-react';
import StatCard from './StatCard';

const StatsSection = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <StatCard
      icon={Users}
      title="Total Employees"
      value={stats.totalEmployees}
      iconColor="text-indigo-500"
    />
    <StatCard
      icon={DollarSign}
      title="Total Salary"
      value={`$${stats.totalSalary.toLocaleString()}`}
      iconColor="text-green-500"
    />
    <StatCard
      icon={Building2}
      title="Departments"
      value={stats.departments.length}
      iconColor="text-blue-500"
    />
  </div>
);

export default StatsSection;