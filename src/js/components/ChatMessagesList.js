import React from 'react'
import ChatMessage from "./ChatMessage";

export default function ChatMessagesList() {
  return (
    <div className="chat-container">
      <ul className="chat-box chatContainerScroll">
        <ChatMessage message={{content: 'fake message for now'}}/>
      </ul>
      <br/>
      <br/>
    </div>

  )
};