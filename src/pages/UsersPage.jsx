import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { getUserFromToken } from '../utils/auth';
import UserTable from '../components/usersPage/UserTable';
import CreateUserModal from '../components/usersPage/CreateUserModal';
import ViewUserModal from '../components/usersPage/ViewUserModal';
import EditUserModal from '../components/usersPage/EditUserModal';
import DeleteUserModal from '../components/usersPage/DeleteUserModal';
import SearchBar from '../components/usersPage/SearchInput';
import LoadingSpinner from '../components/usersPage/LoadingSpinner';
import ErrorDisplay from '../components/usersPage/ErrorDisplay';
import Button from '../components/common/Button';


const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('');

  const navigate = useNavigate();
  const currentUser = getUserFromToken();

  useEffect(() => {
    if (currentUser.role !== 'ADMIN') {
      navigate('/dashboard');
      return;
    }

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await api.get('/users');
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (err) {
        setError({
          message: 'Failed to fetch users',
          details: err
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate, currentUser.role]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  const handleUserCreated = (newUser) => {
    setUsers(prev => [...prev, newUser]);
    setFilteredUsers(prev => [...prev, newUser]);
    setIsCreateModalOpen(false);
  };

  const handleUserUpdated = (updatedUser) => {
    const newUsers = users.map(u => u._id === updatedUser._id ? updatedUser : u);
    setUsers(newUsers);
    setFilteredUsers(newUsers);
    setIsModalOpen(false);
  };

  const handleUserDeleted = (userId) => {
    setUsers(users.filter(u => u._id !== userId));
    setFilteredUsers(filteredUsers.filter(u => u._id !== userId));
    setIsModalOpen(false);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">User Management</h1>
        <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
          Add New User
        </Button>
      </div>

      <SearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />

      <UserTable 
        users={filteredUsers}
        onView={(user) => {
          setSelectedUser(user);
          setModalMode('view');
          setIsModalOpen(true);
        }}
        onEdit={(user) => {
          setSelectedUser(user);
          setModalMode('edit');
          setIsModalOpen(true);
        }}
        onDelete={(user) => {
          setSelectedUser(user);
          setModalMode('delete');
          setIsModalOpen(true);
        }}
      />

      <CreateUserModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onUserCreated={handleUserCreated}
      />

      {selectedUser && modalMode === 'view' && (
        <ViewUserModal 
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {selectedUser && modalMode === 'edit' && (
        <EditUserModal 
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUserUpdated={handleUserUpdated}
        />
      )}

      {selectedUser && modalMode === 'delete' && (
        <DeleteUserModal 
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUserDeleted={handleUserDeleted}
        />
      )}
    </div>
  );
};

export default UsersPage;