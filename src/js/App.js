import React, {useEffect} from 'react'
import HomeView from './views/Home'
import {
  Redirect,
  HashRouter as Router,
  Switch,
  Route, Link, useHistory, useParams
} from 'react-router-dom'
import Navbar from "./components/Navbar";
import Settings from "./views/Settings";
import Login from "./views/Welcome";
import Chat from "./views/Chat";
import {createStore} from "redux";
import configureStore from "./store";
import {Provider, useDispatch, useSelector} from 'react-redux'
import WelcomeView from "./views/Welcome";
import {listenToAuthChange} from "./actions/authActions";
import StoreProvider from "./store/StoreProvider";
import LoadingView from "./components/shared/LoadingView";
import BaseLayout from "./layouts/Base";
import {listenToConnectionChanges} from "./actions/appActions";


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
      {...rest}  // destructurize anything else coming in
      render={props =>
        user ?
          React.cloneElement(onlyChild, {...rest, ...props}) :
          <Redirect to={"/"} />
      }
      />
  )
}

const ContentWrapper = ({children}) => <div className="content-wrapper">{children}</div>

function ChatApp() {
  // debugger
  const dispatch = useDispatch()
  const isChecking = useSelector(({auth}) => auth.isChecking)
  const isOnline = useSelector(({app}) => app.isOnline)

  useEffect(() => {
    const unsubFromConnectionChanges = dispatch(listenToConnectionChanges())  // rewrote to return the UNSUB function
    const unsubFromAuth = dispatch(listenToAuthChange())  // listenToAuthChange() returns an UNSUB function --> call it for cleanup

    return function () {
      unsubFromAuth()
      unsubFromConnectionChanges()
    }
  }, [dispatch])

  if (isChecking) {
    return <LoadingView />
  }
  if (!isOnline) {
    return <LoadingView message={"Offline... waiting to reconnect..."}/>
  }

  return (
      <Router>
        <ContentWrapper>
          <Switch>
            <Route path={"/"} exact={true}>
              <WelcomeView />
            </Route>

            <AuthRoute path={"/home"}>
              <HomeView/>
            </AuthRoute>

            <AuthRoute path={"/settings"}>
              <Settings/>
            </AuthRoute>

            <AuthRoute path={"/chat/:id"}>  {/* Note: needed to add the :id to the route for it to get grabbed from the params*/}
              <Chat/>
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
      <ChatApp />
    </StoreProvider>
  )
}
