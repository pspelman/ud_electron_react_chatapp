import React, {useCallback} from 'react'
import ChatMessage from "./ChatMessage";
import {useSelector} from "react-redux";


export default function ChatMessagesList({messages = []}) {
  const user = useSelector(({auth}) => auth.user)
  const isAuthor = useCallback(message => {
    return message?.author.uid === user.uid ? 'chat-right' : 'chat-left'
  })

  return (
    <div className="chat-container">
      <ul className="chat-box chatContainerScroll">
        {/*<ChatMessage message={{content: 'fake message for now'}}/>*/}
        {messages.map(message => <ChatMessage chatClass={isAuthor(message)} key={message.id} message={message}/>)}
      </ul>
      <br/>
      <br/>
    </div>
  )
}