import {combineReducers} from "redux";


function createUserReducer() {
  const guid = (state = null, action) => {
    switch (action.type) {
      case 'sLoginComplete':
        console.log(`\n\ngot GUID: `, action.sessionData.serverGuid)
        return action.sessionData.serverGuid
      default:
        return state
    }
  }

  return combineReducers({
    guid
  })
}

function createVsAuthReducer() {

  const session = (state = {}, action) => {  // session actions
    switch (action.type) {
      case 'VS_LOGIN_INIT':
        console.log(`STARTING LOGIN`)
        return state
      case 'sLoginComplete':
        console.log(`\n\n[vsAuthReducer] LOGIN COMPLETE --> setting session info to : `, JSON.stringify(action))
        return action.sessionData
      default:
        return state
    }
  }

  return combineReducers({
    session,
    user: createUserReducer(),
  })
}

export default createVsAuthReducer()