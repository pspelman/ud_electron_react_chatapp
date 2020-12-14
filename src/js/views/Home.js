import React, {useEffect} from 'react'
import Navbar from "../components/Navbar";
import JoinedChatsList from "../components/JoinedChatsList";
import AvailableChatsList from "../components/AvailableChatsList";
import ViewTitle from "../components/shared/ViewTitle";
import Chat from "./Chat";
// import {fetchChats} from "../api/chats";  // NOTE: Not needed anymore b/c we're now using actions (next line)
import {useDispatch} from "react-redux"
import {fetchChats} from "../actions/chats"


// functional component
export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    // let chats = fetchChats().then(chats => {
    //   console.log(`chats: `, chats)
    // })
    dispatch(fetchChats())
  }, [dispatch])

  return (
      <div className="row no-gutters fh">
        <div className="col-3 fh">
          <JoinedChatsList />
        </div>
        <div className="col-9 fh">
          <ViewTitle text={"Choose your channel"}/>
          <div className="container-fluid">
            <AvailableChatsList />
          </div>
        </div>
      </div>
  )
}