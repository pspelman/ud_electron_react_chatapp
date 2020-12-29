import React, {useEffect} from 'react'
import {Link, useParams} from "react-router-dom";
import ChatUserList from "../components/ChatUserList";
import ChatMessagesList from "../components/ChatMessagesList";
import ViewTitle from "../components/shared/ViewTitle";
import {withBaseLayout} from "../layouts/Base"
import {useDispatch, useSelector} from "react-redux";
import {subscribeToChat, subscribeToProfile} from "../actions/chatsActions";

// export default function Chat() {
function Chat() {
  const {id} = useParams()
  const dispatch = useDispatch()
  const activeChat = useSelector(({chats}) => chats.activeChats[id])
  const joinedUsers = activeChat?.joinedUsers

  useEffect(() => {  // this will subscribe to the chat when this chat view is created
    const unsubFromChat = dispatch(subscribeToChat(id))
    return () => {
      unsubFromChat()
    }
  }, [])

  useEffect(() => {
    joinedUsers && subscribeToJoinedUsers(joinedUsers)
  }, [joinedUsers])

  const subscribeToJoinedUsers = (jUsers) => {
    jUsers.forEach(user => {
      dispatch(subscribeToProfile(user.uid))
    })
  }
  return (
    // <BaseLayout>
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <ChatUserList users={activeChat?.joinedUsers || []}/>
      </div>
      <div className="col-9 fh">
        <ViewTitle text={`${activeChat?.name || 'Loading...'}`}/>
        <ChatMessagesList/>
      </div>
    </div>
    // </BaseLayout>
  )
}

export default withBaseLayout(Chat, {canGoBack: true})
