import React, {useEffect, useState} from 'react'
import Sidebar from './Sidebar'
import ChatBox from './ChatBox'
import EmptyState from './EmptyState'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Home = () => {

  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  const [users, setUsers] = useState([])

  useEffect(() => {
    console.log("Home Page")
    const token = localStorage.getItem('token');
    if(!token){
      navigate('/login')
    }else{
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
    }
  }, [])

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="container-fluid overflow-hidden" style={{height: "100vh"}}>
      <div className="row">
        <div className="col-md-6 col-lg-3 rounded-3  bg-secondary-subtle">
          <Sidebar users={users} onUserClick={handleUserClick} />
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