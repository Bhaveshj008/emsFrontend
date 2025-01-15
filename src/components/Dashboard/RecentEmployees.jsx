import React from 'react';
import { Eye } from 'lucide-react';

const RecentEmployees = ({ employees, navigate }) => (
  <div className="bg-white rounded-lg shadow-sm mb-8">
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Employees</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-gray-600">Name</th>
              <th className="text-left py-3 px-4 text-gray-600">Email</th>
              <th className="text-left py-3 px-4 text-gray-600">Position</th>
              <th className="text-right py-3 px-4 text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">{employee.name}</td>
                <td className="py-3 px-4">{employee.email}</td>
                <td className="py-3 px-4">{employee.position}</td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => navigate(`/employees/edit/${employee._id}`)}
                    className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default RecentEmployees;