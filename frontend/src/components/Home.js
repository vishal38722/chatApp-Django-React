import React from 'react'
import Sidebar from './Sidebar'
import ChatBox from './ChatBox'

const Home = () => {
  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4 col-lg-3">
          <div class="bg-primary text-light p-3">
            <h4>Sidebar</h4>
          </div>
        </div>
        <div class="col-md-8 col-lg-9">
          <div class="bg-light p-3">
            <h4>Chat Box</h4>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Home