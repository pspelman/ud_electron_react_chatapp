import React from 'react'
import Navbar from "../components/Navbar";
import JoinedChats from "../components/JoinedChats";
import AvailableChats from "../components/AvailableChats";

// functional component
export default function Home() {
  return (
    <div className='content-wrapper'>

      {/* ########## NAVBAR START ############ */}
      <Navbar/>
      {/* ########## NAVBAR END ############ */}

      <div className="row no-gutters fh">
        <div className="col-3 fh">

          {/* ########## CHAT LIST START ############ */}
          <JoinedChats/>
          {/* ########## CHAT LIST END ############ */}
        </div>
        <div className="col-9 fh">
          {/* ########## CHAT NAME CONTAINER START ############ */}
          <div className="chat-name-container">
            <span className="name">Choose your channel</span>
            <a href="/"
               className="btn btn-primary btn-sm back-button">
              Back</a>
          </div>
          {/* ########## CHAT NAME CONTAINER END ############ */}
          <div className="container-fluid">
            {/* ########## CHAT LIST START ############ */}
            <AvailableChats/>

            {/* ########## CHAT LIST END ############ */}
          </div>
        </div>
      </div>
    </div>
  )
}