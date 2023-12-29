import React from 'react'
import { format } from "date-fns";
import { FaUser } from "react-icons/fa";

const MessageBox = ({data}) => {

  
  //logged in user.email===sender.email 
  const isOwn = 1 ;

  const container = `d-flex ${isOwn ? "justify-content-end" : ""} p-3`;
  const avatar = isOwn ? "order-2" : "";
  const body = `d-flex flex-column gap-2 ${isOwn ? "align-items-end" : ""}`;
  const message = `fs-6 overflow-hidden ${
    isOwn
      ? "bg-info text-white rounded-5 py-2 px-3"
      : "bg-success-subtle text-white rounded-5 py-2 px-3"
  }`;

  return (
    <div className={container}>
        <div className="d-flex align-items-center  gap-2">
          <div className={avatar}>
          <span>
              <FaUser size={35} />
          </span>
          </div>
          <div className={body}>
            
            <div className={message}>
                <div className="fs-5 text-black">{data.body}</div>
            </div>
            <div className="d-flex align-items-center gap-1">
              <div className="fs-6 text-black">Sachin</div>
              <div className="fs-6 text-black-50 ">
                {format(new Date(Date.now()), 'p')}
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default MessageBox