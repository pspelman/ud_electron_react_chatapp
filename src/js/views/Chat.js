import React, {useEffect, useRef, useCallback} from 'react'
import {Link, useParams} from "react-router-dom";
import ChatUserList from "../components/ChatUserList";
import ChatMessagesList from "../components/ChatMessagesList";
import ViewTitle from "../components/shared/ViewTitle";
import {withBaseLayout} from "../layouts/Base"
import {useDispatch, useSelector} from "react-redux";
import {sendChatMessage, subscribeToChat, subscribeToProfile} from "../actions/chatsActions";
import LoadingView from "../components/shared/LoadingView";
import Messenger from "../components/Messenger";

// export default function Chat() {
function Chat() {
  const {id: chatId} = useParams()
  const userStatusListeners = useRef({})  // need to keep the value between renders, so we use useRef to keep the value between renders
  const dispatch = useDispatch()
  const activeChat = useSelector(({chats}) => chats.activeChats[chatId])
  const joinedUsers = activeChat?.joinedUsers

  const sendMessage = useCallback(message => {
    //   console.log(`[Chat.js] - calling sendChatMessage | message:  `, message, `chat id: `, chatId )
    dispatch(sendChatMessage(message, chatId))
      // .then(_ => messageList.current.scrollIntoView(false))
  }, [chatId])

  useEffect(() => {  // this will subscribe to the chat when this chat view is created
    const unsubFromChat = dispatch(subscribeToChat(chatId))
    return () => {
      unsubFromChat();
      unsubFromJoinedUsers();
    }
  }, [])

  useEffect(() => {
    joinedUsers && subscribeToJoinedUsers(joinedUsers)
  }, [joinedUsers])

  const subscribeToJoinedUsers = useCallback(jUsers => {
    jUsers.forEach(user => {
      if (!userStatusListeners.current[user.uid]) {  // if the listener isn't there yet
        userStatusListeners.current[user.uid] = dispatch(subscribeToProfile(user.uid, chatId));
      }
    })
  }, [dispatch, chatId])

  const unsubFromJoinedUsers = useCallback(() => {
    Object.keys(userStatusListeners.current)
      .forEach(id => userStatusListeners.current[id]())  // this will execute the callback function for each of the IDs
  }, [userStatusListeners.current])

  if (!activeChat?.id) {
    return <LoadingView message={"loading chat..."}/>
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
        <Messenger onSubmit={sendMessage}/>
      </div>
    </div>
    // </BaseLayout>
  );
}

export default withBaseLayout(Chat, {canGoBack: true})
