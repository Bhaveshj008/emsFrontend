import React from 'react';
import { X, User, Mail, Phone, Briefcase, DollarSign } from 'lucide-react';
import Modal from '../common/Modal';

const ViewModal = ({ isOpen, onClose, employee }) => {
  if (!employee) return null;

  const details = [
    { icon: User, label: 'Name', value: employee.name },
    { icon: Mail, label: 'Email', value: employee.email },
    { icon: Phone, label: 'Mobile', value: employee.mobile },
    { icon: Briefcase, label: 'Position', value: employee.position },
    { icon: DollarSign, label: 'Salary', value: `$${employee.salary.toLocaleString()}` }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Employee Details</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {details.map(({ icon: Icon, label, value }) => (
            <div key={label}>
              <div className="flex items-center text-gray-600 mb-1">
                <Icon className="h-4 w-4 mr-2" />
                {label}
              </div>
              <p className="font-semibold">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ViewModal;