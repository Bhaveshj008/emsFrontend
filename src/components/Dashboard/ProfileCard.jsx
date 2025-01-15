import React from 'react';

const ProfileCard = ({ userProfile, onEditClick }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Profile</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <span className="text-gray-600">Name:</span>
        <p className="font-semibold mt-1">{userProfile.name}</p>
      </div>
      <div>
        <span className="text-gray-600">Email:</span>
        <p className="font-semibold mt-1">{userProfile.email}</p>
      </div>
      <div>
        <span className="text-gray-600">Position:</span>
        <p className="font-semibold mt-1">{userProfile.position || 'Not Set'}</p>
      </div>
      <div>
        <span className="text-gray-600">Salary:</span>
        <p className="font-semibold mt-1">
          {userProfile.salary 
            ? `$${userProfile.salary.toLocaleString()}` 
            : 'Not Set'}
        </p>
      </div>
    </div>
    <button
      onClick={onEditClick}
      className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
    >
      Edit Profile
    </button>
  </div>
);

export default ProfileCard;