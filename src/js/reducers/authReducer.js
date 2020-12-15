const DEFAULT_STATE = {
  user: null,
  isChecking: false
}

export default function authReducer(state=DEFAULT_STATE, action) {
  switch (action.type) {
    case 'AUTH_ON_INIT':  // initializing the authentication
      console.log(`authentication init`, )
      return {user: null, isChecking: true}
    case 'AUTH_ON_SUCCESS':  // the action comes back with the user data
      console.log(`Authenticated`, )
      return {user: action.user, isChecking: false}
    case 'AUTH_ON_ERROR':
      console.log(`NOT Authenticated`, )
      return {user: null, isChecking: false}
    case 'AUTH_REGISTER_SUCCESS':
      return {user: action.user, isChecking: false}
    case 'AUTH_REGISTER_ERROR':
      return {user: null, isChecking: false}
    default:
      return state
  }

};