import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEmployee, getEmployeeById, updateEmployee } from '../services/employeeService';
import EmployeeFormFields from '../components/EmployeeForm/EmployeeFormFields';
import FormHeader from '../components/EmployeeForm/FormHeader';
import FormActions from '../components/EmployeeForm/FormActions';
import ConfirmationModal from '../components/EmployeeForm/ConfirmationModal';
import ErrorAlert from '../components/EmployeeForm/ErrorAlert';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    position: '',
    salary: ''
  });
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      fetchEmployee();
    }
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const employee = await getEmployeeById(id);
      setFormData({
        name: employee.name,
        email: employee.email,
        mobile: employee.mobile,
        position: employee.position,
        salary: employee.salary.toString()
      });
    } catch (error) {
      console.error('Failed to fetch employee', error);
      setErrors({ submit: 'Failed to load employee data' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const employeeData = {
        ...formData,
        salary: parseFloat(formData.salary)
      };
  
      if (isEditMode) {
        await updateEmployee(id, employeeData);
      } else {
        await createEmployee(employeeData);
      }
      
      navigate('/employees');
    } catch (error) {
      handleSubmissionError(error);
    }
  };

  const handleSubmissionError = (error) => {
    if (error.data) {
      switch (error.data.status) {
        case 'validation_error':
          setErrors(error.data.errors);
          break;
        case 'duplicate_error':
          setErrors({
            submit: error.data.message,
            ...(error.data.duplicateFields?.reduce((acc, field) => {
              acc[field] = `${field} already exists`;
              return acc;
            }, {}))
          });
          break;
        default:
          setErrors({ submit: error.data.message || 'Failed to save employee' });
      }
    } else {
      setErrors({ submit: error.message || 'An unexpected error occurred' });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <FormHeader isEditMode={isEditMode} />
        <form onSubmit={handleSubmit}>
          <ErrorAlert error={errors.submit} />
          <EmployeeFormFields 
            formData={formData}
            errors={errors}
            onChange={handleChange}
          />
          <FormActions 
            isEditMode={isEditMode}
            onCancel={() => setIsModalOpen(true)}
          />
        </form>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => navigate('/employees')}
      />
    </div>
  );
};

export default EmployeeForm;