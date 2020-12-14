import React from 'react'
import HomeView from './views/Home'
import {
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
import {Provider} from 'react-redux'
import WelcomeView from "./views/Welcome";


class HomeLink extends React.Component {
  render() {
    return <Link
      to={"/"}

      className="btn btn-sm btn-outline-danger ml-2">
      Home
    </Link>;
  }
}

const store = configureStore()

export default function App() {
  // debugger
  return (
    <Provider store={store}>
      <Router>
        <Navbar/>
        <div className='content-wrapper'>
          <Switch>
            <Route path={"/"}
                   exact={true}
            >
              <WelcomeView/>
            </Route>
            <Route path={"/home"}>
              <HomeView/>
            </Route>

            <Route path={"/settings"}
            >
              <Settings/>
            </Route>

            <Route
              path={"/chat/:id"}>  {/* Note: needed to add the :id to the route for it to get grabbed from the params*/}
              <Chat/>
            </Route>

            <Route path={"/welcome"}>
              <Login/>
            </Route>

            <HomeLink/>

          </Switch>
        </div>
      </Router>
    </Provider>
  )
}
