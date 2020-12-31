import React from "react";
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../actions/authActions";
import ninjaImage from '../ninja_PNG18.png';
import BackButton from "./shared/BackButton";


export default function Navbar({canGoBack, view}) {
  // const history = useHistory()  // used for back button - moved to separate component
  const dispatch = useDispatch()
  const logOutPage = () => {
    dispatch(logoutUser())
    window.electron.controlApi.restartApp()
  }
  const user = useSelector(({auth}) => auth.user)  // using redux to check for the user


  // const logoutBtn = (
  //   <Link
  //     onClick={() => dispatch(logoutUser())}
  //     to={'/'}
  //     className="btn btn-outline-danger ml-2">Logout
  //   </Link>
  // )
  console.log(`VIEW: `, view)

  const message = useSelector(state => {
    return state.message
  })
  return (
    <div className="chat-navbar">
      <nav className="chat-navbar-inner">
        <div className="chat-navbar-inner-left">
          {canGoBack && <BackButton/>}
          {view !== "Settings"  &&
          <Link
            to='/settings'
            className="btn btn-outline-success ml-2">Settings</Link>}
        </div>
        {message}

        <div className="chat-navbar-inner-right">
          {/*{user ? <img src={ninjaImage} className={"avatar mr-2"} alt=""/> : ''}*/}
          {user ? <img src={user.avatar} className={"avatar mr-2"} alt=""/> : ''}
          <span className="logged-in-user">Hi {user ? user.username : 'User'}</span>

          {/*<Link*/}
          {/*  to={'/welcome'}*/}
          {/*  className="btn btn-sm btn-outline-success ml-2">Login*/}
          {/*</Link>*/}
          {user &&
          <Link
            to={'/'}
            onClick={() => dispatch(logoutUser())}
            // onClick={() => logOutPage()}
            className="btn btn-outline-danger ml-2">Logout
          </Link>}
        </div>
      </nav>
    </div>
  )
}