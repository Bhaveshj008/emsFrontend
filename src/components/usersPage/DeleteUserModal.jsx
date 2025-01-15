const DeleteUserModal = ({ user, isOpen, onClose, onUserDeleted }) => {
    const handleDelete = async () => {
      try {
        await api.delete(`/users/${user._id}`);
        onUserDeleted(user._id);
      } catch (err) {
        console.error('Failed to delete user:', err);
      }
    };
  
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Confirm Delete"
        confirmText="Delete"
        onConfirm={handleDelete}
      >
        <p>Are you sure you want to delete user: {user.name}?</p>
      </Modal>
    );
  };
  export default DeleteUserModal