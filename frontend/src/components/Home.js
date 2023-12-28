import React from 'react'
import Sidebar from './Sidebar'
import ChatBox from './ChatBox'

const Home = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 col-lg-3 border-dark-subtle min-vh-100 bg-light ">
          <div className="text-center text-black p-3  ">
            <h4>Users</h4>
            <Sidebar />
          </div>
        </div>
        <div className="col-md-6 col-lg-9 min-vh-100 border-5 bg-white">
          <div className="p-3 text-center text-black">
            <h4>Chat Box</h4>
            <ChatBox />
          </div>
        </div>
      </div>
    </div>


  )
}

export default Home