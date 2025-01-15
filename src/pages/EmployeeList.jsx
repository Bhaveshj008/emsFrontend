import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployees } from '../services/employeeService';
import { getUserFromToken, isTokenExpired } from '../utils/auth';
import EmployeeTable from '../components/EmployeeList/EmployeeTable';
import FilterSection from '../components/EmployeeList/FilterSection';
import Pagination from '../components/EmployeeList/Pagination';
import DeleteModal from '../components/EmployeeList/DeleteModal';
import ViewModal from '../components/EmployeeList/ViewModal';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalEmployees: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: 'createdAt',
    direction: 'desc'
  });
  const [filters, setFilters] = useState({
    position: '',
    minSalary: '',
    maxSalary: ''
  });

  const navigate = useNavigate();
  const user = getUserFromToken();

  useEffect(() => {
    if (isTokenExpired()) {
      navigate('/login');
      return;
    }
    fetchEmployees();
  }, [pagination.currentPage, sortConfig]);

  const fetchEmployees = async () => {
    try {
      const queryParams = {
        page: pagination.currentPage,
        limit: 10,
        search: searchTerm,
        sortBy: sortConfig.key,
        sortOrder: sortConfig.direction,
        ...filters
      };
      const data = await getEmployees(queryParams);
      setEmployees(data.employees);
      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalEmployees: data.total
      });
    } catch (error) {
      console.error('Failed to fetch employees', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <FilterSection 
          user={user}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
          setPagination={setPagination}
          fetchEmployees={fetchEmployees}
          navigate={navigate}
        />
        
        <EmployeeTable 
          employees={employees}
          user={user}
          navigate={navigate}
          setDeleteEmployeeId={setDeleteEmployeeId}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setSelectedEmployee={setSelectedEmployee}
          setIsViewModalOpen={setIsViewModalOpen}
        />

        <Pagination 
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>

      <DeleteModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={deleteEmployeeId}
        fetchEmployees={fetchEmployees}
      />

      <ViewModal 
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        employee={selectedEmployee}
      />
    </div>
  );
};

export default EmployeeList;