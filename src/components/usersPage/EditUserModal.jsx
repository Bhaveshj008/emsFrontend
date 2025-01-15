import { useState } from "react";
import Modal from "../common/Modal";
import UserForm from "./UserForm";
import api from "../../utils/api";

const EditUserModal = ({ user, isOpen, onClose, onUserUpdated }) => {
    const [formData, setFormData] = useState(user);
  
    const handleSubmit = async () => {
      try {
        const response = await api.put(`/users/${user._id}`, formData);
        onUserUpdated(response.data);
      } catch (err) {
        console.error('Failed to update user:', err);
      }
    };
  
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Edit User"
        confirmText="Update"
        onConfirm={handleSubmit}
      >
        <UserForm 
          formData={formData}
          setFormData={setFormData}
          editMode
        />
      </Modal>
    );
  };
  export default EditUserModal