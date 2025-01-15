import React from 'react';
import { X, Trash2 } from 'lucide-react';
import Modal from '../common/Modal';
import { deleteEmployee } from '../../services/employeeService';

const DeleteModal = ({ isOpen, onClose, onDelete, fetchEmployees }) => {
  const handleDelete = async () => {
    try {
      await deleteEmployee(onDelete);
      fetchEmployees();
      onClose();
    } catch (error) {
      console.error('Failed to delete employee', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this employee? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;