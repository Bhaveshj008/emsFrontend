import { useState } from "react";
import Modal from "../common/Modal";
import UserForm from "./UserForm";
import api from "../../utils/api";


const CreateUserModal = ({ isOpen, onClose, onUserCreated }) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
      role: 'EMPLOYEE'
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
  
    const handleApiError = (err, setErrors) => {
        if (err.response && err.response.data) {
          const errorData = err.response.data;
          
          if (errorData.status === 'validation_error') {
            setErrors(errorData.errors?.fields || {});
          } else if (errorData.status === 'duplicate_error') {
            setErrors({
              submit: [errorData.message || 'User already exists']
            });
          } else {
            setErrors({
              submit: ['Failed to create user']
            });
          }
        } else {
          setErrors({
            submit: ['An unexpected error occurred']
          });
        }
      };
    const handleSubmit = async () => {
      try {
        setLoading(true);
        setErrors({});
        const response = await api.post('/auth/register', {
          ...formData,
          role: formData.role
        });
        onUserCreated(response.data.user);
      } catch (err) {
        handleApiError(err, setErrors);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Create New User"
        confirmText={loading ? "Creating..." : "Create User"}
        onConfirm={handleSubmit}
        confirmDisabled={loading}
      >
        <UserForm 
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          loading={loading}
        />
      </Modal>
    );
  };
  export default CreateUserModal