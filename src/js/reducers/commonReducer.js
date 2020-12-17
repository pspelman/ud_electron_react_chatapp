import {combineReducers} from "redux";


export const createErrorReducer = actionType => {
  return (state = null, action) => {
    switch (action.type) {
      case `${actionType}_INIT`:
        return null
      case `${actionType}_ERROR`:
        return action.error
      default:
        return state
    }
  }
}

export const createIsFetchingReducer = actionType => {
  return (state = false, action) => {
    console.log(`[${action.type.toUpperCase()}] (COMMON IS FETCHING reducer) --> `, action)
    switch (action.type) {
      case `${actionType}_INIT`:
        return true
      case `${actionType}_SUCCESS`:
        return false
      case `${actionType}_ERROR`:
        return false
      default:
        return state
    }
  }
}
