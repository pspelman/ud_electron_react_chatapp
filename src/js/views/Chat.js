import React from 'react'
import {Link} from "react-router-dom";
import ChatUserList from "../components/ChatUserList";
import ChatMessagesList from "../components/ChatMessagesList";

export default function Chat() {
  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        {/* ########## USER LIST START ############ */}
        <ChatUserList />
        {/* ########## USER LIST END ############ */}
      </div>
      <div className="col-9 fh">
        {/* ########## CHAT NAME CONTAINER START ############ */}
        <div className="chat-name-container">
          <span className="name">Chat 1</span>
          <Link to={'/'}
                className="btn btn-primary btn-sm back-button"
          >
            Back
          </Link>
        </div>
        {/* ########## CHAT NAME CONTAINER END ############ */}
        <ChatMessagesList />
      </div>
    </div>

  )
};