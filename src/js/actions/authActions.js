import * as api from '../api/auth'

export const registerUser = formData => dispatch => {
  return api.registerUser(formData)
    .then(user => {
      dispatch({type: 'AUTH_REGISTER_SUCCESS', user})
    })
    .catch(error => {
      alert("there was an ERROR during registration: ", JSON.stringify(error))
      console.log(`error with registration: `, error)
    })
}


export const listenToAuthChange = () => dispatch => {
  api.onAuthStateChanges(authUser => {
    if (authUser) {
      console.log(`We are authenticated`,);
    } else {
      console.log(`We are NOT authenticated`, )
    }
  })
}