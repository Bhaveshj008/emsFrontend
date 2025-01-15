import React from 'react';
import { Navigate } from 'react-router-dom';
import { isTokenExpired } from '../../utils/auth';
import Navbar from '../layout/Navbar';

const ProtectedRoute = ({ children }) => {
  if (isTokenExpired()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

export default ProtectedRoute;