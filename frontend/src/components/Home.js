import React, {useState} from 'react'
import Sidebar from './Sidebar'
import ChatBox from './ChatBox'
import EmptyState from './EmptyState'

const Home = () => {

  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (userId) => {
    setSelectedUser(userId);
  };

  return (
    <div className="container-fluid overflow-hidden" style={{height: "100vh"}}>
      <div className="row">
        <div className="col-md-6 col-lg-3 border-dark-subtle p-3 rounded-3  bg-secondary-subtle">
          <div className="text-center text-black ">
            <h4>Users</h4>
            <Sidebar onUserClick={handleUserClick} />
          </div>
        </div>
        <div className="col-md-6 col-lg-9 min-vh-100  border-5 bg-light">
          <div className="text-center text-black">
            {selectedUser ? (
              <ChatBox userId={selectedUser} />
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>
    </div>


  )
}

export default Home