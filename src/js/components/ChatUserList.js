import React from 'react'

export default function ChatUserList({users = []}) {
  return (
    <div className="list-container">
      <div className="chat-search-box">
        <div className="input-group">
          <input className="form-control" placeholder="Search"/>
        </div>
      </div>
      <ul className="items">
        {users.map(user => {
          return (
            <li
              key={user.uid}
              onClick={() => {
              }}
              className="item">
              <div className="item-status">
                <img
                  src={user.avatar}
                  alt="User Avatar"/>
                <div className={`status-box-${user.state || 'offline'}`}/>
                <span className={`status-${user.state || 'offline'}`}>
                  {user.state}
                </span>
              </div>
              <p className="name-time">
                <span className="name mr-2">{user.username}</span>
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}