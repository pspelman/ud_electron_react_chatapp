import React, {useEffect} from 'react'
import {Link, useParams} from "react-router-dom";
import ChatUserList from "../components/ChatUserList";
import ChatMessagesList from "../components/ChatMessagesList";
import ViewTitle from "../components/shared/ViewTitle";
import {withBaseLayout} from "../layouts/Base"
import {useDispatch} from "react-redux";
import {subscribeToChat} from "../actions/chatsActions";

// export default function Chat() {
function Chat() {
  const {id} = useParams()
  const dispatch = useDispatch()

  useEffect(() => {  // this will subscribe to the chat when this chat view is created
    const unsubFromChat = dispatch(subscribeToChat(id))
    return () => {
      unsubFromChat()
    }
  })
  return (
    // <BaseLayout>
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <ChatUserList/>
      </div>
      <div className="col-9 fh">
        <ViewTitle text={`Joined channel ${id}`}/>
        <ChatMessagesList/>
      </div>
    </div>
    // </BaseLayout>
  )
}

export default withBaseLayout(Chat, {canGoBack: true})
