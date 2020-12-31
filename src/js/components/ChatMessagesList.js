import React from 'react'
import ChatMessage from "./ChatMessage";

export default function ChatMessagesList({messages = []}) {
  console.log(`chat messages: `, messages)

  return (
    <div className="chat-container">
      <ul className="chat-box chatContainerScroll">
        {/*<ChatMessage message={{content: 'fake message for now'}}/>*/}
        {messages.map(message => <ChatMessage key={message.id} message={message}/>)}
      </ul>
      <br/>
      <br/>
    </div>
  )
}