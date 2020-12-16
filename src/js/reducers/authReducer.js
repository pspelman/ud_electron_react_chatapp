import {combineReducers} from "redux";


function createAuthReducer() {

  function loginReducer(state = {error: null}, action) {
    console.log(`[LOGIN reducer] - ${action.type.toUpperCase()}`)
    switch (action.type) {
      case 'AUTH_LOGIN_INIT':
        return {error: null}
      case 'AUTH_LOGIN_ERROR':
        return {error: action.error}
      default:
        return state
    }
  }

  function registerReducer(state = {error: null}, action) {
    console.log(`[REGISTER reducer] - ${action.type.toUpperCase()}`)
    switch (action.type) {
      case 'AUTH_REGISTER_INIT':
        console.log(`==> error: `, null)
        return {error: null}
      case 'AUTH_REGISTER_ERROR':
        console.log(`==> action.error: `, action.error)
        return {error: action.error}
      default:
        return state
    }
  }

  const user = (state=null, action) => {  // only really concerned with authentication actions
    console.log(`[USER reducer] - ${action.type.toUpperCase()}`)
    switch (action.type) {
      case 'AUTH_ON_ERROR':
      case 'AUTH_REGISTER_INIT':  // initializing the registration
      case 'AUTH_LOGIN_INIT':  // initializing the authentication
      case 'AUTH_LOGIN_ERROR':
      case 'AUTH_REGISTER_ERROR':
      case 'AUTH_ON_INIT':  // initializing the authentication - there's no user
      case 'AUTH_LOGOUT_SUCCESS':
        console.log(`[${action.type.toUpperCase()}] (USER reducer) --> null`)
        return null  // return null because there's no user

      case 'AUTH_ON_SUCCESS':  // the action comes back with the user data
      case 'AUTH_REGISTER_SUCCESS':
        console.log(`[${action.type.toUpperCase()}] (USER reducer) --> ${action.user}`)
        return action.user

      default:
        return state
    }

  }

  const isChecking = (state=false, action) => {
    console.log(`[IsCHECKING reducer] - ${action.type.toUpperCase()}`)
    switch (action.type) {
      case 'AUTH_LOGIN_INIT':  // initializing the authentication
      case 'AUTH_REGISTER_INIT':
      case 'AUTH_ON_INIT':
        console.log(`isChecking --> TRUE`)
        return true

      case 'AUTH_ON_ERROR':
      case 'AUTH_REGISTER_ERROR':
      case 'AUTH_LOGIN_ERROR':
      case 'AUTH_LOGOUT_SUCCESS':
      case 'AUTH_ON_SUCCESS':  // the action comes back with the user data
        console.log(`isChecking --> FALSE`)
        return  false

      default:
        return state
    }

  }

  return combineReducers({
    user,
    isChecking,
    login: loginReducer,
    register: registerReducer,
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