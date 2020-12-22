import {combineReducers} from "redux";


function createAppReducer() {
  const {onLine} = navigator  // this will get the onLine attribute from navigator (part of the framework)

  const isOnline = (state = onLine, action) => {
    switch (action.type) {
      case 'APP_IS_ONLINE':
      case 'APP_IS_OFFLINE':
        return action.isOnline
      default:
        return state
    }
  }

  return combineReducers({
    isOnline
  })
}

export default createAppReducer()