// src/components/layout/Sidebar.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getUserFromToken, removeToken } from '../../utils/auth';

// Icons (you can use react-icons or create SVG components)
const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const EmployeeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const ReportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h8l4 4v10a2 2 0 01-2 2z" />
  </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const Sidebar = ({ isMobile, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUserFromToken();

  // Sidebar menu items with role-based access
  const menuItems = [
    {
      name: 'Dashboard',
      path: '/',
      icon: <DashboardIcon />,
      roles: ['ADMIN', 'MANAGER', 'EMPLOYEE']
    },
    {
      name: 'Employees',
      path: '/employees',
      icon: <EmployeeIcon />,
      roles: ['ADMIN', 'MANAGER']
    },
    {
      name: 'Reports',
      path: '/reports',
      icon: <ReportIcon />,
      roles: ['ADMIN', 'MANAGER']
    }
  ];

  // Handle logout
  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role)
  );

  return (
    <div 
      className={`
        fixed inset-y-0 left-0 z-50 
        w-64 bg-white shadow-lg 
        transform transition-transform duration-300 ease-in-out
        ${isMobile ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:block
      `}
    >
      {/* Sidebar Content */}
      <div className="flex flex-col h-full">
        {/* Logo and Brand */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-2xl font-bold text-primary">EMS</h2>
          {isMobile && (
            <button 
              onClick={onClose} 
              className="md:hidden text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
          )}
        </div>

        {/* User Profile */}
        <div className="p-4 border-b">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold">
                {user?.name?.[0].toUpperCase()}
              </span>
            </div>
            <div className="ml-3">
              <h3 className="font-semibold">{user?.name}</h3>
              <p className="text-sm text-gray-500">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          {filteredMenuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center p-3 rounded-lg mb-2 
                ${location.pathname === item.path 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 hover:bg-gray-100'}
                transition duration-200
              `}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="
              w-full flex items-center p-3 
              text-red-500 hover:bg-red-50 
              rounded-lg transition duration-200
            "
          >
            <span className="mr-3"><LogoutIcon /></span>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

// Mobile-friendly Sidebar Wrapper
const SidebarWrapper = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button 
        onClick={toggleMobileMenu} 
        className="md:hidden fixed top-4 left-4 z-50 bg-primary text-white p-2 rounded-md"
      >
        ☰
      </button>

      {/* Sidebar Component */}
      <Sidebar 
        isMobile={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
};

export default SidebarWrapper;