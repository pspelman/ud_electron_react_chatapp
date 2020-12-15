import React from "react";
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../actions/authActions";


export default function Navbar() {
  const history = useHistory()
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
  const message = useSelector(state => {
    return state.message
  })
  return (
    <div className="chat-navbar">
      <nav className="chat-navbar-inner">
        <div className="chat-navbar-inner-left">
          <button onClick={() => history.goBack()}>
            Go Back
          </button>
          <Link
            to='/settings'
            className="btn btn-outline-success ml-2">Settings</Link>
        </div>
        MESSAGE {message}

        <div className="chat-navbar-inner-right">
          <span className="logged-in-user">Hi User</span>

          <Link
            to={'/welcome'}
            className="btn btn-sm btn-outline-success ml-2">Login
          </Link>
          {user &&
          <Link
            to={'/'}
            // onClick={() => dispatch(logoutUser())}
            onClick={() => logOutPage()}
            className="btn btn-outline-danger ml-2">Logout
          </Link> }
        </div>
      </nav>
    </div>
  )
}