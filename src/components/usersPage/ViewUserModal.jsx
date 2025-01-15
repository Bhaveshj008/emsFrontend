import Modal from "../common/Modal";

const ViewUserModal = ({ user, isOpen, onClose }) => (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="User Details"
      confirmText="Close"
      onConfirm={onClose}
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-gray-600">name:</span>
          <p>{user.name}</p>
        </div>
        <div>
          <span className="text-gray-600">Email:</span>
          <p>{user.email}</p>
        </div>
        <div>
          <span className="text-gray-600">Role:</span>
          <p>{user.role}</p>
        </div>
        <div>
          <span className="text-gray-600">Status:</span>
          <p>{user.status}</p>
        </div>
      </div>
    </Modal>
  );
  export default ViewUserModal