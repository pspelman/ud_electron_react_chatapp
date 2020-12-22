import {combineReducers} from "redux";
import {createErrorReducer, createIsFetchingReducer} from "./commonReducer";

function createLoginReducer() {
  return combineReducers({
    isChecking: createIsFetchingReducer('AUTH_LOGIN'),
    error: createErrorReducer('AUTH_LOGIN')
  })
}

function createLogoutReducer() {
  return combineReducers({
    isChecking: createIsFetchingReducer('AUTH_LOGOUT'),
    error: createErrorReducer('AUTH_LOGOUT')
  })
}


function createRegisterReducer() {
  return combineReducers({
    isChecking: createIsFetchingReducer('AUTH_REGISTER'),
    error: createErrorReducer('AUTH_REGISTER')
  })
}



function createAuthReducer() {

  const user = (state=null, action) => {  // only really concerned with authentication actions
    // console.log(`[AUTH reducer] - ${action.type.toUpperCase()}`)
    switch (action.type) {
      case 'AUTH_ON_ERROR':
      case 'AUTH_REGISTfER_INIT':  // initializing the registration
      case 'AUTH_LOGIN_INIT':  // initializing the authentication
      case 'AUTH_LOGIN_ERROR':
      case 'AUTH_REGISTER_ERROR':
      case 'AUTH_ON_INIT':  // initializing the authentication - there's no user
        return null  // return null because there's no user
      case 'AUTH_LOGOUT_SUCCESS':
        return null  // return null because there's no user

      case 'AUTH_ON_SUCCESS':  // the action comes back with the user data
      // case 'AUTH_LOGIN_SUCCESS':  // the action comes back with the user data
      // case 'AUTH_REGISTER_SUCCESS':
        console.log(`[${action.type.toUpperCase()}] (AUTH reducer) --> ${action.user}`)
        return action.user

      default:
        return state
    }

  }


  return combineReducers({
    user,
    isChecking: createIsFetchingReducer('AUTH_ON'),
    login: createLoginReducer(),
    register: createRegisterReducer(),
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