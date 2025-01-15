import React from 'react';
import Input from '../common/Input';
import Select from '../common/Select';

const EmployeeFormFields = ({ formData, errors, onChange }) => {
  const positionOptions = [
    {label: 'Select'},
    { value: 'Software Engineer', label: 'Software Engineer' },
    { value: 'Project Manager', label: 'Project Manager' },
    { value: 'HR Manager', label: 'HR Manager' },
    { value: 'Sales Representative', label: 'Sales Representative' },
    { value: 'Marketing Specialist', label: 'Marketing Specialist' }
  ];

  return (
    <>
      <Input
        label="Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={onChange}
        required
        error={errors.name}
        placeholder="Enter employee name"
      />
      
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={onChange}
        required
        error={errors.email}
        placeholder="Enter employee email"
      />
      
      <Input
        label="Mobile"
        type="tel"
        name="mobile"
        value={formData.mobile}
        onChange={onChange}
        required
        error={errors.mobile}
        placeholder="Enter mobile number"
      />
      
      <Select
        label="Position"
        name="position"
        value={formData.position}
        onChange={onChange}
        options={positionOptions}
        required
        error={errors.position}
      />
      
      <Input
        label="Salary"
        type="number"
        name="salary"
        value={formData.salary}
        onChange={onChange}
        required
        error={errors.salary}
        placeholder="Enter salary"
      />
    </>
  );
};

export default EmployeeFormFields;