import React, {useEffect, useState} from 'react'
import Sidebar from './Sidebar'
import ChatBox from './ChatBox'
import EmptyState from './EmptyState'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Home = () => {

  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [webSocket, setWebSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
      navigate('/login')
    }else{
      const fetchData = async () => {
        const { data } = await axios.get("http://localhost:8000/api/exclude_user/", {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });
        setUsers(data)
      }
      fetchData();
    }
  }, [])

  useEffect(() => {
    if(selectedUser !== null){
      const token = localStorage.getItem('token');
      // Set up WebSocket connection
      const ws = new WebSocket(`ws://localhost:8000/ws/api/${selectedUser.id}/?token=${token}`);
      setWebSocket(ws);
      
      // Clean up WebSocket connection on component unmount
      return () => {
        if (webSocket) {
          webSocket.close();
        }
      };
    }
  }, [selectedUser])


  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="container-fluid overflow-hidden" style={{height: "100vh"}}>
      <div className="row">
        <div className="col-md-6 col-lg-3 rounded-3  bg-secondary-subtle">
          <Sidebar users={users} onUserClick={handleUserClick} selectedUser={selectedUser} />
        </div>
        <div className="col-md-6 col-lg-9 min-vh-100  border-5 bg-light">
          <div className="text-center text-black">
            {selectedUser ? (
              <ChatBox selectedUser={selectedUser} onUserClick={handleUserClick} webSocket={webSocket}/>
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