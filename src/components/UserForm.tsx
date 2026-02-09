import React, { useState, forwardRef, useImperativeHandle } from 'react';
import type { User, FormHandle } from './types';

interface Props {
  onSubmit: (user: Omit<User, 'id'>) => void;
  onUpdate: (user: User) => void;
  onCancelEdit: () => void;
  isEditing: boolean;
}

const UserForm = forwardRef<FormHandle, Props>(({ onSubmit, onUpdate, onCancelEdit, isEditing }, ref) => {
  const [formData, setData] = useState<User>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  useImperativeHandle(ref, () => ({
    resetForm: () => {
      setData({ id: '', firstName: '', lastName: '', email: '', phone: '' });
    },
    setValues: (user: User) => {
      setData(user);
    }
  }));

  const update = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      onUpdate(formData);
    } else {
      onSubmit({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone
      });
    }
  };

  const clear = () => {
    setData({ id: '', firstName: '', lastName: '', email: '', phone: '' });
    if (isEditing) onCancelEdit();
  };

  return (
    <div className="form-section">
      <h2>{isEditing ? 'Edit user' : 'New user'}</h2>
      
      <form onSubmit={submit}>
        <div className="form-group">
          <label>First Name</label>
          <input name="firstName" value={formData.firstName} onChange={update} required />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input name="lastName" value={formData.lastName} onChange={update} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input name="email" type="email" value={formData.email} onChange={update} required />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input name="phone" type="tel" value={formData.phone} onChange={update} required />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn">
            {isEditing ? 'Save' : 'Add'}
          </button>
          
          {isEditing && (
            <button type="button" className="btn" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
          
          <button type="button" className="btn" onClick={clear}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
});

export default UserForm;