import React, {useEffect} from 'react'
import Navbar from "../components/Navbar";
import JoinedChatsList from "../components/JoinedChatsList";
import AvailableChatsList from "../components/AvailableChatsList";
import ViewTitle from "../components/shared/ViewTitle";
import Chat from "./Chat";
// import {fetchChats} from "../api/chats";  // NOTE: Not needed anymore b/c we're now using actions (next line)
import {useDispatch, useSelector} from "react-redux"
import {fetchChats} from "../actions/chatsActions"
import LoadingView from "../components/shared/LoadingView";
import {Redirect} from "react-router";
import {withBaseLayout} from "../layouts/Base";
import AppNotification from "../utils/notifications";
import {Link} from "react-router-dom";


// functional component
function Home() {
  const dispatch = useDispatch()
  const joinedChats = useSelector(({chats}) => chats.joined)
  const availableChats = useSelector(({chats}) => chats.available)
  useEffect(() => {
    AppNotification.setup()
  }, [dispatch]);

  const chatsLoading = useSelector(({chats}) => chats.isLoading)
  const isChecking = useSelector(({chats}) => chats.isLoading)
  const user = useSelector(({auth}) => auth.user)
  console.log(`HOME: user: `, user)
  console.log(`HOME: \nchatsLoading: ${chatsLoading}\nisChecking: ${isChecking}`,)

  // add the joined / available chats


  if (user) {
    useEffect(() => {
      dispatch(fetchChats())
    }, [dispatch]);
  }

  if (isChecking || chatsLoading) {  // want to show a loader if we're checking on the auth status
    console.log(`AUTH LOADING ${isChecking} | CHATS LOADING ${chatsLoading} | still loading`,)
    return <LoadingView/>
  }
  if (!user) {
    return <Redirect to={"/welcome"}/>;
  }


  console.log(`DONE LOADING? --> GOING TO SHOW CHATS`,);
  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        {/*<JoinedChatsList chats={chats}/>*/}
        <JoinedChatsList chats={joinedChats}/>
      </div>
      <div className="col-9 fh">
        <ViewTitle text={"Choose your channel"}>
          <Link className={"btn btn-outline-primary"} to={'/chatCreate'}>New</Link>
        </ViewTitle>
        <div className="container-fluid">
          <AvailableChatsList chats={availableChats?availableChats:[]}/>
        </div>
      </div>
    </div>
  )
}

export default withBaseLayout(Home)