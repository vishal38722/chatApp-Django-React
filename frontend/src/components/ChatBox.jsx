import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { FaUser } from "react-icons/fa";
import {HiPaperAirplane} from "react-icons/hi2";
import MessageBox from "./MessageBox";
import Header from "./Header";

const ChatBox = ({selectedUser, onUserClick, webSocket}) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([]);
    if (webSocket) {
      webSocket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        if(Array.isArray(data.message)){
          for(const key in data.message){
            setMessages(prevMessages => [...prevMessages, { message: data.message[key] }]);
          }
        }else{
          setMessages(prevMessages => [...prevMessages, { message: data.message }]);
        }
      });
    }
  }, [webSocket]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (webSocket && newMessage.trim() !== "") {
      webSocket.send(JSON.stringify({ message: newMessage}));
      setNewMessage("");
    }
  }

  return (
    <div style={{width: "inherit"}}>
      <Header selectedUser={selectedUser} onUserClick={onUserClick}/>
      <div style={{paddingBottom: "7rem", height:"calc(100vh - 7rem)", overflow: "auto"}}>
        {messages.map((message, index) => (
          <MessageBox data={message} key={index} selectedUser={selectedUser}/> 
        ))}
      </div>
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
