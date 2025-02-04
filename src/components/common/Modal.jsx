import React from 'react';
import Button from './Button';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-3xl mx-auto my-6">
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          {/* Header */}
          <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
            <h3 className="text-2xl font-semibold">{title}</h3>
            <button
              className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
              onClick={onClose}
            >
              ×
            </button>
          </div>
          
          {/* Body */}
          <div className="relative p-6 flex-auto">
            {children}
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
            <Button 
              variant="secondary" 
              onClick={onClose} 
              className="mr-3"
            >
              {cancelText}
            </Button>
            <Button 
              variant="primary" 
              onClick={onConfirm}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Backdrop */}
      {/* <div className="fixed inset-0 z-40 bg-black opacity-25"></div> */}
    </div>
  );
};

export default Modal;