import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {joinChat} from "../actions/chatsActions";

export default function AvailableChatsList(props) {
  const user = useSelector(({auth}) => auth.user)
  const dispatch = useDispatch()

  const confirmJoinChat = chat => {
    // prompt the user to confirm they want to join the chat
    const doJoinChat = confirm(`Are you sure you want to join the chat '${chat.name}?`)
    if (doJoinChat) {
      console.log(`going to join the chat: `, chat)
      dispatch(joinChat(user.uid, chat))
    }
  }

  const availableChats = props.chats.map((chat) => {
    return (
      <div
        key={chat.id}
        className="col-lg-3 col-md-6 mb-3"
      >
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{chat.name}</h5>
            <p className="card-text">{chat.description}</p>
            <button
              onClick={() => {
                confirmJoinChat(chat)
              }}
              className="btn btn-outline-primary">Join Chat
            </button>
          </div>
        </div>
      </div>
    )
  })

  return (
    <div className="row mt-3">
      {false &&
      <div className="container-fluid">
        <div className="alert alert-warning">No chats to join :(</div>
      </div>}
      {availableChats}
    </div>

  )
}