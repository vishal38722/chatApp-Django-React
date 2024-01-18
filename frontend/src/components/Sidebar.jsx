import React, { useEffect, useState } from 'react';
// import { users } from '../utils/constants'
import UserItem from './UserItem'
import { IoIosSearch } from "react-icons/io";
import '../css/style.css';
import DesktopNavbar from './DesktopNavbar';
import MobileFooter from './MobileFooter';

const Sidebar = ({ users, onUserClick, selectedUser }) => {

  const [searchText, setSearchText] = useState('');

  const allUsers = users.filter((user) => {
    return user.first_name.toLowerCase().includes(searchText.toLowerCase()) || user.last_name.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <div className='d-flex flex-row'>
      <div className=' col-lg-2 d-none d-md-flex col-md-2  '>
        <DesktopNavbar />
      </div>
      <div className={`sidebar-container ${selectedUser ? 'd-none d-md-inline ' : 'col-12'} col-lg-10 col-md-10 ml-md-3`} style={{ maxHeight: '99vh', overflowY: 'auto'}}>
        {/* Search bar */}
        <div className='d-flex w-100 align-items-center mt-1'>
          <input type="text" className="form-control" onChange={(e) => setSearchText(e.target.value)} placeholder="Search or start a new chat" />
          
          <IoIosSearch size={20} className=" col-1 mb-3" />
        </div>
        <div>
          {allUsers.map((user) => (
            <UserItem user={user} onUserClick={onUserClick} key={user.id} />
          ))}
        </div>
        <MobileFooter />
      </div>
    </div>
  );
};

export default Sidebar;