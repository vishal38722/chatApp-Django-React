import React, { useEffect, useState } from 'react';
// import { users } from '../utils/constants'
import UserItem from './UserItem'

const Sidebar = ({users, onUserClick}) => {
  
  return (
    <div>
        {users.map((user) => (
            <UserItem user={user} onUserClick={onUserClick} key={user.id} />
        ))}
    </div>
  )
}

export default Sidebar