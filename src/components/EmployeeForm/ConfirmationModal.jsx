import React from 'react';
import Modal from '../common/Modal';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    onConfirm={onConfirm}
    title="Confirm Cancel"
    confirmText="Yes, Discard"
    cancelText="No, Keep Editing"
  >
    Are you sure you want to discard the changes?
  </Modal>
);

export default ConfirmationModal;