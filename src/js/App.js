import React from 'react'
import HomeView from './views/Home'
import {
  HashRouter as Router,
  Switch,
  Route, Link
} from 'react-router-dom'
import Navbar from "./components/Navbar";
import Settings from "./views/Settings";
import Login from "./views/Login";
import Register from "./views/Register";
import Chat from "./views/Chat";



class HomeLink extends React.Component {
  render() {
    return <Link
      to={"/"}

      className="btn btn-sm btn-outline-danger ml-2">
      Home
    </Link>;
  }
}

export default function App() {
  // debugger
  return (
    <Router>
      <Navbar/>
      <div className='content-wrapper'>
      <Switch>
        <Route path={"/"}
               exact={true}
        >
          <HomeView/>
        </Route>

        <Route path={"/settings"}
        >
          <Settings/>
        </Route>

        <Route path={"/chat"}
        >
          <Chat/>
        </Route>

        <Route path={"/login"}>
          <Login/>
        </Route>

        <Route path={"/register"}>
          <Register />
          <HomeLink />
        </Route>
      </Switch>
      </div>
    </Router>
  )
}
