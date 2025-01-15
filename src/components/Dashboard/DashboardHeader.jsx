import React from 'react';
import { UserPlus, Settings } from 'lucide-react';

const DashboardHeader = ({ user, navigate }) => (
  <>
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Welcome, {user.name}!
      </h1>
      <p className="text-gray-600 mt-1">
        {user.role} Dashboard
      </p>
    </div>

    {(user.role === 'ADMIN' || user.role === 'MANAGER') && (
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => navigate('/employees/new')}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Add Employee
        </button>
        {user.role === 'ADMIN' && (
          <button
            onClick={() => navigate('/users')}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Settings className="w-5 h-5 mr-2" />
            Manage Users
          </button>
        )}
      </div>
    )}
  </>
);

export default DashboardHeader;