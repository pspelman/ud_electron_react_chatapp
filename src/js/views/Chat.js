import React, {useEffect, useRef} from 'react'
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
  const userStatusListeners = useRef({})  // need to keep the value between renders, so we use useRef to keep the value between renders
  const dispatch = useDispatch()
  const activeChat = useSelector(({chats}) => chats.activeChats[id])
  const joinedUsers = activeChat?.joinedUsers

  useEffect(() => {  // this will subscribe to the chat when this chat view is created
    const unsubFromChat = dispatch(subscribeToChat(id))
    return () => {
      unsubFromChat();
      unsubFromJoinedUsers();
    }
  }, [])

  useEffect(() => {
    joinedUsers && subscribeToJoinedUsers(joinedUsers)
  }, [joinedUsers])

  const subscribeToJoinedUsers = (jUsers) => {
    jUsers.forEach(user => {
      if (!userStatusListeners.current[user.uid]) {  // if the listener isn't there yet
        userStatusListeners.current[user.uid] = dispatch(subscribeToProfile(user.uid));
      }
    })
  }

  const unsubFromJoinedUsers = () => {
    Object.keys(userStatusListeners.current)
      .forEach(id => userStatusListeners.current[id]())  // this will execute the callback function for each of the IDs
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
