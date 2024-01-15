import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { FaUser } from "react-icons/fa";
import {HiPaperAirplane} from "react-icons/hi2";
import MessageBox from "./MessageBox";
import Header from "./Header";
import axios from "axios";

const ChatBox = ({selectedUser, onUserClick, webSocket}) => {

  const [loggedInUser, setLoggedInUser] = useState(null)
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:8000/user/", {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      console.log("data of loggedIn User: ", data);
      setLoggedInUser(data);
    }
    fetchData();
  }, [])

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  //logged in user.email===sender.email 
  const isOwn = 1 ;

  const container = `d-flex ${isOwn ? "justify-content-end" : ""} gap-3 p-4`;
  const avatar = isOwn ? "order-2" : "";
  const body = `d-flex flex-column gap-2 ${isOwn ? "align-items-end" : ""}`;
  const message = `fs-6 overflow-hidden ${
    isOwn
      ? "bg-info text-white rounded-5 py-2 px-3"
      : "bg-success-subtle text-white rounded-5 py-2 px-3"
  }`;

  const generateDummyMessages = (count) => {
    const dummyMessages = [];
    
    for (let i = 0; i < count; i++) {
      dummyMessages.push({
        id: Math.random()*10,
        sender: {
          name: "John Doe",
          email: "john.doe@example.com",
        },
        body: "Lorem ipsum dolor",
        createdAt: new Date().toISOString()
      });
    }
  
    return dummyMessages;
  };

  useEffect(() => {
    console.log("Selected User: ", selectedUser)
    if (webSocket) {
      webSocket.addEventListener('message', (event) => {
        console.log("event in ChatBox: ", event)
        console.log("URL in ChatBox: ", event.currentTarget.url)
        const data = JSON.parse(event.data);
        console.log('Received message from server:', data);

        const url = event.currentTarget.url;
        const userIdMatch = url.match(/\/api\/(\d+)\//);
        const userId = userIdMatch ? userIdMatch[1] : null;
        console.log('User ID from WebSocket URL:', userId);

        // setMessages(prevMessages => [...prevMessages, data]);
        setMessages(prevMessages => [...prevMessages, { message: data.message, sender: data.sender, timestamp: data.timestamp }]);
      });
    }
  }, [webSocket]);

  useEffect(() => {
    console.log("messages in ChatBox: ", messages);
  }, [messages]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (webSocket && newMessage.trim() !== "") {
      webSocket.send(JSON.stringify({ message: newMessage}));
      setNewMessage("");
    }
  }

  // useEffect(() => {
  //   const dummyMessages = generateDummyMessages(1);// API call
  //   setMessages((prevMessages) => [...prevMessages, ...dummyMessages]);
  // }, []);
  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const dummyMessages = generateDummyMessages(1);
  //   setMessages((prevMessages) => [...prevMessages, ...dummyMessages]);
  //   setNewMessage("")
  // }

  return (
    <div style={{width: "inherit"}}>
      <Header selectedUser={selectedUser} onUserClick={onUserClick}/>
      {/* Chat area */}
      <div style={{paddingBottom: "7rem", height:"calc(100vh - 7rem)", overflow: "auto"}}>
        {messages.map((message, index) => (
          <MessageBox data={message} key={index} selectedUser={selectedUser.id}/> // key={message.id}
        ))}
      </div>
      {/* form */}
      <div className="fixed-bottom d-flex align-items-center flex-row justify-content-end rounded-3">
        <div className="col-12 col-md-6 col-lg-9 offset-md-3 bg-light p-1">
          <form onSubmit={handleSubmit} className="d-flex align-items-center flex-row justify-content-end  gap-3 ">
            <input
              type="text"
              className="form-control p-3"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className="btn btn-primary btn-lg pb-3 mb-3" type="submit">
              <HiPaperAirplane />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
