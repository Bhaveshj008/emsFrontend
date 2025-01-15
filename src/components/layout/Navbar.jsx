import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService';
import { getUserFromToken } from '../../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUserFromToken();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-bold text-primary"
        >
          EMS
        </Link>
        
        <div className="flex items-center space-x-4">
          {user && (
            <>
              <Link 
                to="/employees" 
                className="text-gray-700 hover:text-primary"
              >
                Employees
              </Link>
              <span className="text-gray-500">
                Welcome, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;