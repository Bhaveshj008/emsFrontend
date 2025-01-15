import React from 'react';
import { User, Mail, Briefcase, DollarSign, Pencil, Trash2, Eye } from 'lucide-react';

const EmployeeTable = ({ 
  employees, 
  user, 
  navigate, 
  setDeleteEmployeeId, 
  setIsDeleteModalOpen,
  setSelectedEmployee,
  setIsViewModalOpen 
}) => {
  const renderActionButtons = (employee) => {
    const actions = {
      'ADMIN': (
        <div className="flex space-x-2 justify-center">
          <button
            onClick={() => navigate(`/employees/edit/${employee._id}`)}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              setDeleteEmployeeId(employee._id);
              setIsDeleteModalOpen(true);
            }}
            className="p-1 text-red-600 hover:bg-red-50 rounded-full transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
      'MANAGER': (
        <button
          onClick={() => navigate(`/employees/edit/${employee._id}`)}
          className="p-1 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
        >
          <Pencil className="h-4 w-4" />
        </button>
      ),
      'EMPLOYEE': (
        <button
          onClick={() => {
            setSelectedEmployee(employee);
            setIsViewModalOpen(true);
          }}
          className="p-1 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
        >
          <Eye className="h-4 w-4" />
        </button>
      )
    };

    return actions[user.role] || null;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                Name
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-2" />
                Position
              </div>
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center justify-end">
                <DollarSign className="h-4 w-4 mr-2" />
                Salary
              </div>
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee) => (
            <tr key={employee._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.position}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                ${employee.salary.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {renderActionButtons(employee)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;