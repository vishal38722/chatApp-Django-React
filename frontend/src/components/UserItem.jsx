import React from 'react' 
import { FaUser } from "react-icons/fa";

const UserItem = ({user}) => {
  return (
    <>  
        <div className="w-100 card mb-2 overflow-wrap-break-word" onClick={() => {}}>
            <div className="d-flex align-items-center justify-content-start">
                <span className="me-3">
                    <FaUser size={40} />
                </span>
                <div>
                    <p className="fw-bold text-gray-800 mb-1">
                        {user.name}
                    </p>
                    <span className="text-muted fs-6">
                        {user.email}
                    </span>
                </div>
            </div>
        </div>
    </>
  )
}

export default UserItem