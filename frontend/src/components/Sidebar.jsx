import React from 'react'
import { users } from '../utils/constants'
import UserItem from './UserItem'

const Sidebar = () => {
  return (
    <div>
        {users.map((user) => (
            <UserItem user={user} key={user.id} />
        ))}
    </div>
  )
}

export default Sidebar