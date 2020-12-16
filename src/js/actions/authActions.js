import * as api from '../api/auth'
import firebase from "firebase";


export const registerUser = formData => dispatch => {
  api.registerUser(formData)
    .then(_ => dispatch({type: 'AUTH_REGISTER_SUCCESS'}))
    .catch(error => {
      alert("there was an ERROR during registration: ", JSON.stringify(error))
      console.log(`error with registration: `, error)
      return error
    })

}


export const listenToAuthChange = () => dispatch => {
  dispatch({type: 'AUTH_ON_INIT'})  // this fires off to initialize authentication
  return api.onAuthStateChanges(async authUser => {
    if (authUser) {
      console.log(`trying to get the user for UID: `, authUser.uid)
      const userProfile = await api.getUserProfile(authUser.uid)  // this will get the userProfile from the DB
      dispatch({type: 'AUTH_ON_SUCCESS', user: userProfile})
    } else {
      dispatch({type: 'AUTH_ON_ERROR', user: null})
      console.log(`We are NOT authenticated`, )
    }
  })
}


export const logoutUser = () => dispatch => {
  console.log(`trying to logout`, )
  api
    .logout()
    // .then(_ => dispatch({type: 'AUTH_LOGOUT_SUCCESS'}))
}

export const loginUser = (formData) => dispatch => {
  console.log(`trying to login: `, formData)
  dispatch({type: 'AUTH_LOGIN_INIT'})
  api
    .login(formData)
    .then(_ => dispatch({type: 'AUTH_ON_SUCCESS'}))
    .catch(err => {
      console.log(`error logging in!`, err)
      return err
    });
}