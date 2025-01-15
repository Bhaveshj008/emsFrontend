import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployees, getEmployeeStats } from '../services/employeeService';
import { getUserFromToken, isTokenExpired } from '../utils/auth';
import api from '../utils/api';

import DashboardHeader from '../components/Dashboard/DashboardHeader';
import StatsSection from '../components/Dashboard/StatsSection';
import RecentEmployees from '../components/Dashboard/RecentEmployees';
import ProfileCard from '../components/Dashboard/ProfileCard';
import ProfileEditModal from '../components/Dashboard/ProfileEditModal';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalSalary: 0,
    departments: []
  });
  const [recentEmployees, setRecentEmployees] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: '',
    email: '',
    mobile: '',
    position: '',
    salary: ''
  });
  const [profileErrors, setProfileErrors] = useState({});

  const navigate = useNavigate();
  const user = getUserFromToken();

  useEffect(() => {
    if (isTokenExpired()) {
      navigate('/login');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const profileResponse = await api.get('/auth/profile');
        const profileData = profileResponse.data;
        setUserProfile(profileData);
        
        // Initialize editedProfile with current user data
        setEditedProfile({
          name: profileData.name || '',
          email: profileData.email || '',
          mobile: profileData.mobile || '',
          position: profileData.position || '',
          salary: profileData.salary || ''
        });

        if (user.role === 'ADMIN' || user.role === 'MANAGER') {
          const statsData = await getEmployeeStats();
          setStats(statsData);
          
          const employeesData = await getEmployees({
            limit: 5,
            sortBy: 'createdAt',
            sortOrder: 'desc'
          });
          setRecentEmployees(employeesData.employees || []);
        } else {
          setStats({
            totalEmployees: 1,
            totalSalary: profileData.salary || 0,
            departments: []
          });
        }
      } catch (err) {
        setError({
          message: 'Failed to load dashboard data',
          details: err
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate, user.role]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific field error
    if (profileErrors[name]) {
      setProfileErrors(prev => {
        const updated = {...prev};
        delete updated[name];
        return updated;
      });
    }
  };

  const handleProfileSubmit = async () => {
    try {
      // Validate form
      const errors = {};
      
      if (!editedProfile.name) errors.name = 'Name is required';
      if (!editedProfile.email) errors.email = 'Email is required';
      if (!editedProfile.mobile) errors.mobile = 'Mobile number is required';
      if (!editedProfile.position) errors.position = 'Position is required';
      if (!editedProfile.salary) errors.salary = 'Salary is required';

      if (Object.keys(errors).length > 0) {
        setProfileErrors(errors);
        return;
      }

      const employeeData = {
        ...editedProfile,
        salary: parseFloat(editedProfile.salary)
      };
      console.log(userProfile)
      const response = await api.put(`/employees/${userProfile._id}`, employeeData);
      const userResponse = await api.put(`/users/${userProfile._id}`, employeeData);
      console.log(userResponse)
      console.log(userProfile)
      setUserProfile(response.data);
      setIsEditModalOpen(false);
    } catch (error) {
      if (error.response?.data?.status === 'validation_error') {
        setProfileErrors(error.response.data.errors?.fields || {});
      } else {
        setProfileErrors({
          submit: error.response?.data?.message || 'Failed to update profile'
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-semibold mb-2">Error Loading Dashboard</p>
          <p className="text-red-500">{error.message}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DashboardHeader user={user} navigate={navigate} />
      
      {(user.role === 'ADMIN' || user.role === 'MANAGER') && (
        <>
          <StatsSection stats={stats} />
          {recentEmployees.length > 0 && (
            <RecentEmployees 
              employees={recentEmployees}
              navigate={navigate}
            />
          )}
        </>
      )}

      {user.role === 'EMPLOYEE' && userProfile && (
        <>
          <ProfileCard
            userProfile={userProfile}
            onEditClick={() => setIsEditModalOpen(true)}
          />
          <ProfileEditModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            profile={editedProfile}
            onChange={handleProfileChange}
            onSubmit={handleProfileSubmit}
            errors={profileErrors}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
