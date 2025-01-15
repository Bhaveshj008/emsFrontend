import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Select from '../components/common/Select';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    role: 'EMPLOYEE'
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }

    // Additional custom validation
    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        setErrors(prev => ({
          ...prev,
          confirmPassword: 'Passwords do not match'
        }));
      } else {
        setErrors(prev => {
          const newErrors = {...prev};
          delete newErrors.confirmPassword;
          return newErrors;
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation before submission
    const clientErrors = {};

    // name validation
    if (!formData.name) {
      clientErrors.name = ['name is required'];
    } else if (formData.name.length < 3 || formData.name.length > 20) {
      clientErrors.name = ['name must be between 3 and 20 characters'];
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.name)) {
      clientErrors.name = ['name can only contain letters, numbers, and underscores'];
    }

    // Email validation
    if (!formData.email) {
      clientErrors.email = ['Email is required'];
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      clientErrors.email = ['Invalid email format'];
    }

    // Mobile validation
    if (!formData.mobile) {
      clientErrors.mobile = ['Mobile number is required'];
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      clientErrors.mobile = ['Mobile number must be 10 digits'];
    }

    // Password validation
    if (!formData.password) {
      clientErrors.password = ['Password is required'];
    } else if (formData.password.length < 6) {
      clientErrors.password = ['Password must be at least 6 characters long'];
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(formData.password)) {
      clientErrors.password = ['Password must include uppercase, lowercase, number, and special character'];
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      clientErrors.confirmPassword = ['Passwords do not match'];
    }

    // If client-side errors exist, set them and prevent submission
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
        role: formData.role
      });
      navigate('/'); // Redirect to dashboard
    } catch (error) {
      
      if (error.status === 'validation_error') {
      
        const backendErrors = error.errors?.fields || {};
        setErrors(backendErrors);
      } else if (error.status === 'duplicate_error') {
        
        setErrors({
          submit: error.message
        });
      } else {
        
        setErrors({ 
          submit: error.message || 'Registration failed' 
        });
      }
    }
  };

  const roleOptions = [
    { value: 'EMPLOYEE', label: 'Employee' },
    { value: 'MANAGER', label: 'Manager' },
    { value: 'ADMIN', label: 'Admin' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">
          Create Account
        </h2>
        <form onSubmit={handleSubmit}>
          {errors.submit && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {errors.submit}
            </div>
          )}
          <Input
            label="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Choose a name"
            error={errors.name?.[0]}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            error={errors.email?.[0]}
          />
          <Input
            label="Mobile"
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            placeholder="Enter mobile number"
            error={errors.mobile?.[0]}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Create a password"
            error={errors.password?.[0]}
          />
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm your password"
            error={errors.confirmPassword?.[0]}
          />
          <Select
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            options={roleOptions}
            error={errors.role?.[0]}
          />
          <Button 
            type="submit" 
            variant="primary" 
            className="w-full mt-4"
          >
            Register
          </Button>
        </form>
        <div className="mt-4 text-center">
          <span>Already have an account? </span>
          <Link 
            to="/login" 
            className="text-primary hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;