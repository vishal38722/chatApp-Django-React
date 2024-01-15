import React, { useEffect} from 'react';
import { parseISO, format } from 'date-fns';
import { FaUser } from 'react-icons/fa';

const MessageBox = ({ data, selectedUser }) => {
  
  useEffect(() => {
    console.log('Data in MessageBox', data);
    console.log('timestamp in MessageBox', data.timestamp);
    console.log('selectedUser in MessageBox', selectedUser);
  }, [data]);

  const isOwn = (data.sender.id === selectedUser) ? 0 : 1;

  const container = `d-flex ${isOwn ? 'justify-content-end' : ''} p-3`;
  const avatar = isOwn ? 'order-2' : '';
  const body = `d-flex flex-column gap-2 ${isOwn ? 'align-items-end' : ''}`;
  const message = `fs-6 overflow-hidden ${
    isOwn
      ? 'bg-info text-white rounded-5 py-2 px-3'
      : 'bg-success-subtle text-white rounded-5 py-2 px-3'
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
            <div className="fs-5 text-black">{data.message}</div>
          </div>
          <div className="d-flex align-items-center gap-1">
            <div className="fs-6 text-black">{isOwn?"You":`${data.sender.first_name} ${data.sender.last_name}`}</div>
            <div className="fs-6 text-black-50 ">
              {/* {format(new Date(Date.now()), 'p')} */}
              {format(parseISO(data.timestamp), 'h:mm a')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
