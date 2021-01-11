import React, {useEffect} from 'react'
import {withBaseLayout} from "../layouts/Base";
import Messenger from "../components/Messenger";
import * as chatSocket from "../components/socketChat/ChatSocket";

const ChatDirectView = () => {
  const sendChatViaSocket = chat => {
    console.log(`sending chat via socket: `, chat)
  }

  useEffect(() => {
    chatSocket.init()
  }, [])

  return (
    <div>
      <div className={"chat-name-container"}>
        <span className={"name"}>
          Chat Direct
        </span>
      </div>
      <br/>
      <div id={"output"}></div>
      <div className={'container'}>
        <Messenger onSubmit={chatSocket.doSend}/>
      </div>
    </div>
  )
}

export default withBaseLayout(ChatDirectView, {canGoBack: true})