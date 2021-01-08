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
        <React.Fragment>
            <h1>
              ChatDirectView
              <br/>
              <div id={"output"}>
                View the incoming messages
              </div>
              <div>
                input outgoing messages
                <br/>
              <Messenger onSubmit={chatSocket.doSend}/>
              </div>
            </h1>
        </React.Fragment>
    )
}

export default withBaseLayout(ChatDirectView, {canGoBack: true})