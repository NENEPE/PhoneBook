import type { User } from './types';

interface ListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export default function SubscriberList({ users, onEdit, onDelete }: ListProps) {
  return (
    <div className="list-section">
      <h2>User List ({users.length})</h2>
      
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map(u => (
          <div key={u.id} className="user-card">
            <div className="card-info">
              <h3>{u.firstName} {u.lastName}</h3>
              <p><strong>Email:</strong> {u.email}</p>
              <p><strong>Phone:</strong> {u.phone}</p>
            </div>
            <div className="card-actions">
              <button className="btn" onClick={() => onEdit(u)}>Edit</button>
              <button className="btn btn-danger" onClick={() => onDelete(u.id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};