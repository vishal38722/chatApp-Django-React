import React, {useEffect, useState} from 'react'
import Sidebar from './Sidebar'
import ChatBox from './ChatBox'
import EmptyState from './EmptyState'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Home = () => {

  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  const [users, setUsers] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:8000/api/exclude_user/", {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      console.log(data)
      setUsers(data)
    }
    fetchData();
  }, [])

  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate('/login')
    }
  }, [])

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="container-fluid overflow-hidden" style={{height: "100vh"}}>
      <div className="row">
        <div className="col-md-6 col-lg-3 border-dark-subtle p-3 rounded-3  bg-secondary-subtle">
          <div className="text-center text-black ">
            <h4>Users</h4>
            <Sidebar users={users} onUserClick={handleUserClick} />
          </div>
        </div>
        <div className="col-md-6 col-lg-9 min-vh-100  border-5 bg-light">
          <div className="text-center text-black">
            {selectedUser ? (
              <ChatBox user={selectedUser} />
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