import React from 'react';
import Button from '../common/Button';

const FormActions = ({ isEditMode, onCancel }) => (
  <div className="flex justify-between mt-6">
    <Button 
      type="button" 
      variant="secondary" 
      onClick={onCancel}
    >
      Cancel
    </Button>
    <Button 
      type="submit" 
      variant="primary"
    >
      {isEditMode ? 'Update Employee' : 'Add Employee'}
    </Button>
  </div>
);

export default FormActions;