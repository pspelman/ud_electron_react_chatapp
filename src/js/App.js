import React, {useEffect} from 'react'
import HomeView from './views/Home'
import {checkUserConnection} from "./actions/connectionActions"
import Navbar from "./components/Navbar";
import Settings from "./views/Settings";
import Login from "./views/Welcome";
import ChatView from "./views/Chat";
import {createStore} from "redux";
import configureStore from "./store";
import {Provider, useDispatch, useSelector} from 'react-redux'
import WelcomeView from "./views/Welcome";
import {listenToAuthChange} from "./actions/authActions";
import StoreProvider from "./store/StoreProvider";
import LoadingView from "./components/shared/LoadingView";
import BaseLayout from "./layouts/Base";
import {listenToConnectionChanges} from "./actions/appActions";
import ChatCreateView from "./views/ChatCreate";
import {
  Redirect,
  HashRouter as Router,
  Switch,
  Route, Link, useHistory, useParams
} from 'react-router-dom'
import {loadInitialSettings} from "./actions/settingsActions";
import ChatDirectView from "./views/ChatDirect";

class HomeLink extends React.Component {
  render() {
    return <Link
      to={"/"}
      className="btn btn-sm btn-outline-danger ml-2">
      Home
    </Link>;
  }
}

function AuthRoute({children, ...rest}) {
  const user = useSelector(({auth}) => auth.user)

  const onlyChild = React.Children.only(children)  // ensure we are only allowing a single child (no additional children)

  return (
    <Route
      {...rest} // destructurize anything else coming in
      render={props =>
        user ?
          React.cloneElement(onlyChild, {...rest, ...props}) :
          <Redirect to={"/"}/>
      }
    />
  )
}

const ContentWrapper = ({children}) => {
  const isDarkTheme = useSelector(({settings}) => settings.isDarkTheme)

  return (
    <div className={`content-wrapper ${isDarkTheme ? 'dark' : 'light'}`}>
      {children}
    </div>
  )
}


function ChatApp() {
  // debugger
  const dispatch = useDispatch()
  dispatch(loadInitialSettings())
  const isChecking = useSelector(({auth}) => auth.isChecking)
  const isOnline = useSelector(({app}) => app.isOnline)
  const user = useSelector(({auth}) => auth.user)

  useEffect(() => {
    const unsubFromConnectionChanges = dispatch(listenToConnectionChanges())  // rewrote to return the UNSUB function
    const unsubFromAuth = dispatch(listenToAuthChange())  // listenToAuthChange() returns an UNSUB function --> call it for cleanup

    return function () {
      unsubFromAuth()
      unsubFromConnectionChanges()
    }
  }, [dispatch])

  useEffect(() => {
    let unsubFromUserConnection;
    if (user?.uid) {
      unsubFromUserConnection = dispatch(checkUserConnection(user.uid));
    }

    return () => {
      unsubFromUserConnection && unsubFromUserConnection();
    }
  }, [dispatch, user])


  if (!isOnline) {
    return <LoadingView message={"Offline... waiting to reconnect..."}/>
  }
  if (isChecking) {
    return <LoadingView/>
  }

  return (
    <Router>
      <ContentWrapper>
        <Switch>
          <Route path={"/"} exact={true}>
            <WelcomeView/>
          </Route>

          <AuthRoute path={"/home"}>
            <HomeView/>
          </AuthRoute>

          <AuthRoute path={"/chatCreate"}>
            <ChatCreateView/>
          </AuthRoute>

          <AuthRoute path={"/settings"}>
            <Settings/>
          </AuthRoute>

          {/*Note: needed to add the :id to the route for it to get grabbed from the params*/}
          <AuthRoute path="/chat/:id">
            <ChatView/>
          </AuthRoute>

          <AuthRoute path={"/chatDirect"}>
            <ChatDirectView/>
          </AuthRoute>

          <Route path={"/welcome"}>
            <Login/>
          </Route>

          <HomeLink/>

        </Switch>
      </ContentWrapper>
    </Router>
  );
}

export default function App() {
  // debugger
  return (
    <StoreProvider>
      <ChatApp/>
    </StoreProvider>
  )
}
