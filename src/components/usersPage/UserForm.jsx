import Input from "../common/Input";
import Select from "../common/Select";
const UserForm = ({ formData, setFormData,  errors = {}, loading, editMode }) => {
    const roleOptions = [
      { value: 'EMPLOYEE', label: 'Employee' },
      { value: 'MANAGER', label: 'Manager' },
      { value: 'ADMIN', label: 'Admin' }
    ];
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    return (
        
      <div className="space-y-4">
        {console.log(errors)}
        {errors.submit && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {errors.submit[0]}
          </div>
        )}
        
        <Input
          label="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name?.[0]}
          disabled={loading}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email?.[0]}
          disabled={loading}
        />
        {!editMode && (
          <>
            <Input
              label="Mobile"
              name="mobile"
              type="tel"
              value={formData.mobile}
              onChange={handleChange}
              error={errors.mobile?.[0]}
              disabled={loading}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password?.[0]}
              disabled={loading}
            />
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword?.[0]}
              disabled={loading}
            />
          </>
        )}
        <Select
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          options={roleOptions}
          error={errors.role?.[0]}
          disabled={loading}
        />
      </div>
    );
  };
  export default UserForm