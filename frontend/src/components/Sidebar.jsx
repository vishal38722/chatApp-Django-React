import React, { useEffect, useState } from 'react';
// import { users } from '../utils/constants'
import UserItem from './UserItem'
import '../css/style.css';
import DesktopNavbar from './DesktopNavbar';
import MobileFooter from './MobileFooter';

const Sidebar = ({ users, onUserClick }) => {
  return (
    <div className='d-flex flex-row'>
      <div className=' col-lg-2 d-none d-md-flex col-md-2  '>
        <DesktopNavbar />
      </div>
      <div className="sidebar-container col-12 col-lg-10 col-md-10 ml-md-3" style={{ maxHeight: '99vh', overflowY: 'auto'}}>
        <p className='fs-3 text-center'>Users</p>
        {/* Search bar */}
        <div>
          {users.map((user) => (
            <UserItem user={user} onUserClick={onUserClick} key={user.id} />
          ))}
        </div>
        <MobileFooter />
      </div>
    </div>
  );
};

export default Sidebar;