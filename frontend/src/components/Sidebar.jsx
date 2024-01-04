import React, { useEffect, useState } from 'react';
// import { users } from '../utils/constants'
import UserItem from './UserItem'
import '../css/style.css';

const Sidebar = ({ users, onUserClick }) => {
  return (
    <div className="sidebar-container" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
      {users.map((user) => (
        <UserItem user={user} onUserClick={onUserClick} key={user.id} />
      ))}
    </div>
  );
};

export default Sidebar;