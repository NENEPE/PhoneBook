import { useState, useRef } from 'react';
import type { User, FormHandle } from './components/types';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import Header from './components/Header';
import './App.css';

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setEditing] = useState(false);
  
  const formRef = useRef<FormHandle>(null);

  const AddUSer = (data: Omit<User, 'id'>) => {
    const newUser: User = {
      ...data,
      id: crypto.randomUUID(),
    };
    setUsers([...users, newUser]);
    formRef.current?.resetForm();
  };

  const Delete = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
    setEditing(false);
    formRef.current?.resetForm();
  };

  const EditClick = (user: User) => {
    setEditing(true);
    formRef.current?.setValues(user);
  };

  const EditUser = (user: User) => {
    setUsers(users.map(u => 
      u.id === user.id ? user : u
    ));
    setEditing(false);
    formRef.current?.resetForm();
  };

  const CancelEdit = () => {
    setEditing(false);
    formRef.current?.resetForm();
  };

  const Save = () => {
    localStorage.setItem('phonebook_data', JSON.stringify(users));
    alert('Saved to localStorage');
  };

  const Load = () => {
    const data = localStorage.getItem('phonebook_data');
    if (data) {
      setUsers(JSON.parse(data));
      alert('Loaded from localStorage');
    } else {
      alert('No data found in localStorage');
    }
  };

  const filterUsers = users.filter(u => 
    u.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <Header 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSave={Save}
        onLoad={Load}
      />

      <div className="main-content">
        <UserForm 
          ref={formRef}
          onSubmit={AddUSer}
          onUpdate={EditUser}
          onCancelEdit={CancelEdit}
          isEditing={isEditing}
        />

        <UserList 
          users={filterUsers}
          onEdit={EditClick}
          onDelete={Delete}
        />
      </div>
    </div>
  );
}