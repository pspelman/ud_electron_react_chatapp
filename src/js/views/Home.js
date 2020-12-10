import React from 'react'
import Navbar from "../components/Navbar";
import JoinedChatsList from "../components/JoinedChatsList";
import AvailableChatsList from "../components/AvailableChatsList";
import ViewTitle from "../components/shared/ViewTitle";
import Chat from "./Chat";

// functional component
export default function Home() {
  return (
      <div className="row no-gutters fh">
        <div className="col-3 fh">
        <JoinedChatsList />
        </div>
        <div className="col-9 fh">
          <ViewTitle />
          <div className="container-fluid">
            <AvailableChatsList />
          </div>
        </div>
      </div>
  )
}