import React, {useEffect} from 'react'
import {withBaseLayout} from "../layouts/Base";
import Messenger from "../components/Messenger";
import * as chatSocket from "../components/socketChat/ChatSocket";
import ThreadsList from "../components/ThreadsList";

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
      <div className={'row no-gutters fh'}>
        <div className={'col-3 fh'}>
          <div className="list-container">
            <ThreadsList />
          </div>
        </div>
        <div id={"output"} className={'col-9 fh'}></div>
      </div>
      <div>
        <Messenger onSubmit={chatSocket.doSend}/>
      </div>
    </div>
  )
}

export default withBaseLayout(ChatDirectView, {canGoBack: true})