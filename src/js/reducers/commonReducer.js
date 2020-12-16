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
