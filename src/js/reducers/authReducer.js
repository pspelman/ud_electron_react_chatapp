import {combineReducers} from "redux";


function createAuthReducer() {

  const user = (state=null, action) => {  // only really concerned with authentication actions
    switch (action.type) {
      case 'AUTH_ON_ERROR':
      case 'AUTH_REGISTER_INIT':  // initializing the registration
      case 'AUTH_LOGIN_INIT':  // initializing the authentication
      case 'AUTH_REGISTER_ERROR':
      case 'AUTH_ON_INIT':  // initializing the authentication - there's no user
      case 'AUTH_LOGOUT_SUCCESS':
        console.log(`[${action.type.toUpperCase()}] user --> null`)
        return null  // return null because there's no user

      case 'AUTH_ON_SUCCESS':  // the action comes back with the user data
      case 'AUTH_REGISTER_SUCCESS':
        console.log(`[${action.type.toUpperCase()}] user --> ${action.user}`)
        return action.user

      default:
        return state
    }

  }

  const isChecking = (state=false, action) => {
    switch (action.type) {
      case 'AUTH_LOGIN_INIT':  // initializing the authentication
      case 'AUTH_REGISTER_INIT':
      case 'AUTH_ON_INIT':
        console.log(`[${action.type.toUpperCase()}] isChecking --> TRUE`)
        return true

      case 'AUTH_REGISTER_ERROR':
      case 'AUTH_ON_ERROR':
      // case 'AUTH_REGISTER_SUCCESS':
      // case 'AUTH_LOGIN_SUCCESS':
      case 'AUTH_LOGOUT_SUCCESS':
      case 'AUTH_ON_SUCCESS':  // the action comes back with the user data
        console.log(`[${action.type.toUpperCase()}] isChecking --> FALSE`)
        return  false

      default:
        return state
    }

  }

  return combineReducers({
    user,
    isChecking
  })
}

export default createAuthReducer()

// export default function authReducer(state=DEFAULT_STATE, action) {
//   switch (action.type) {
//     case 'AUTH_ON_INIT'd:  // initializing the authentication
//       console.log(`authentication init`, )
//       return {...state, isChecking: true}
//
//     case 'AUTH_ON_SUCCESS':  // the action comes back with the user data
//       console.log(`[AUTH_ON_SUCCESS] Authenticated | action: `, JSON.stringify(action))
//       return {...state, user: action.user, isChecking: false}
//
//     case 'AUTH_ON_ERROR':
//       console.log(`[AUTH_ON_ERROR] NOT Authenticated`, )
//       return {...state, user: null, isChecking: false}
//
//     case 'AUTH_REGISTER_INIT':  // initializing the authentication
//       console.log(`[AUTH_REGISTER_INIT] registration init`, )
//       return {...state, isChecking: true}
//
//     case 'AUTH_LOGIN_INIT':  // initializing the authentication
//       console.log(`[AUTH_LOGIN_INIT] login initiated`, )
//       return {...state, isChecking: true}
//
//     case 'AUTH_REGISTER_SUCCESS':
//       console.log(`[AUTH_REGISTER_SUCCESS] success`, )
//       return {...state, user: action.user, isChecking: false}
//
//     case 'AUTH_REGISTER_ERROR':
//       console.log(`[AUTH_REGISTER_ERROR] - error registering`, )
//       return {...state, user: null, isChecking: false}
//
//     case 'AUTH_LOGOUT_SUCCESS':
//       console.log(`[AUTH_LOGOUT_SUCCESS] - successfully logged out`, )
//       return {...state, user: null, isChecking: false}
//
//     default:
//       return state
//   }
//
// };