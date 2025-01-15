import React from 'react';
import { Search, DollarSign, Plus } from 'lucide-react';

const FilterSection = ({ 
  user, 
  searchTerm, 
  setSearchTerm, 
  filters, 
  setFilters, 
  setPagination, 
  fetchEmployees,
  navigate 
}) => {
  const renderAddEmployeeButton = () => {
    if (user.role === 'ADMIN' || user.role === 'MANAGER') {
      return (
        <button 
          onClick={() => navigate('/employees/new')}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Employee
        </button>
      );
    }
    return null;
  };

  if (user.role !== 'ADMIN' && user.role !== 'MANAGER') {
    return null;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Employee List
        </h1>
        {renderAddEmployeeButton()}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPagination(prev => ({ ...prev, currentPage: 1 }));
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <select
          value={filters.position}
          onChange={(e) => {
            setFilters(prev => ({ ...prev, position: e.target.value }));
            setPagination(prev => ({ ...prev, currentPage: 1 }));
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          <option value="">All Positions</option>
          <option value="Software Engineer">Software Engineer</option>
          <option value="Project Manager">Project Manager</option>
          <option value="HR Manager">HR Manager</option>
        </select>
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="number"
              placeholder="Min Salary"
              value={filters.minSalary}
              onChange={(e) => {
                setFilters(prev => ({ ...prev, minSalary: e.target.value }));
                setPagination(prev => ({ ...prev, currentPage: 1 }));
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="relative flex-1">
            <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="number"
              placeholder="Max Salary"
              value={filters.maxSalary}
              onChange={(e) => {
                setFilters(prev => ({ ...prev, maxSalary: e.target.value }));
                setPagination(prev => ({ ...prev, currentPage: 1 }));
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <button 
            onClick={fetchEmployees}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSection;
