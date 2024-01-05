import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Header = ({user}) => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }
  return (
    <div className="position-sticky d-flex border-bottom px-sm-4 px-6 py-4 px-lg-6 justify-content-between align-items-center border-success bg-success rounded-3 " style={{ margin: "0 -.66rem"}} onClick={logout}>
        <div className="d-flex gap-3 align-items-center">
            <div>
                <span>
                    <FaUser size={35} />
                </span>
            </div>
            <div className="d-flex flex-column">
                <div className='fs-4'>{`${user.first_name} ${user.last_name}`}</div>
                <div className="fs-6 font-light text-start text-muted ">
                    Online
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header