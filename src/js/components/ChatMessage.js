import React from 'react'

export default function ChatMessage({message}) {
  return (
    <li
      key={message.id}
      className="chat-left">
      <div className="chat-avatar">
        <img
          src="https://www.pinclipart.com/picdir/middle/133-1331433_free-user-avatar-icons-happy-flat-design-png.png"
          alt="Retail Admin" />
        <div className="chat-name">Test User 1</div>
      </div>
      <div className="chat-text-wrapper">
        <span className="chat-text">{message?.content || '...waiting on content'}</span>
        <span className="chat-spacer"></span>
        <div className="chat-hour">5h or some time ago</div>
      </div>
    </li>
  )
}