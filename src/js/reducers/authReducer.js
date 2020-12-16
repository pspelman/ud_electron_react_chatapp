const DEFAULT_STATE = {
  user: null,
  isChecking: false
}

export default function authReducer(state=DEFAULT_STATE, action) {
  switch (action.type) {
    case 'AUTH_ON_INIT':  // initializing the authentication
      console.log(`authentication init`, )
      return {...state, isChecking: true}

    case 'AUTH_ON_SUCCESS':  // the action comes back with the user data
      console.log(`[AUTH_ON_SUCCESS] Authenticated | action: `, JSON.stringify(action))
      return {...state, user: action.user, isChecking: false}

    case 'AUTH_ON_ERROR':
      console.log(`[AUTH_ON_ERROR] NOT Authenticated`, )
      return {...state, user: null, isChecking: false}

    case 'AUTH_REGISTER_INIT':  // initializing the authentication
      console.log(`[AUTH_REGISTER_INIT] registration init`, )
      return {...state, isChecking: true}

    case 'AUTH_LOGIN_INIT':  // initializing the authentication
      console.log(`[AUTH_LOGIN_INIT] login initiated`, )
      return {...state, isChecking: true}

    case 'AUTH_REGISTER_SUCCESS':
      console.log(`[AUTH_REGISTER_SUCCESS] success`, )
      return {...state, user: action.user, isChecking: false}

    case 'AUTH_REGISTER_ERROR':
      console.log(`[AUTH_REGISTER_ERROR] - error registering`, )
      return {...state, user: null, isChecking: false}

    case 'AUTH_LOGOUT_SUCCESS':
      console.log(`[AUTH_LOGOUT_SUCCESS] - successfully logged out`, )
      return {...state, user: null, isChecking: false}

    default:
      return state
  }

};