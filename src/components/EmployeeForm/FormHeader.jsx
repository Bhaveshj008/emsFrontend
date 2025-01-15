import React from 'react';

const FormHeader = ({ isEditMode }) => (
  <h1 className="text-3xl font-bold mb-6 text-primary">
    {isEditMode ? 'Edit Employee' : 'Add New Employee'}
  </h1>
);

export default FormHeader;