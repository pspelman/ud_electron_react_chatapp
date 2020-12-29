
import * as api from '../api/connectionApi';


export const checkUserConnection = uid => dispatch =>
  api.onConnectionChanged((isConnected) => {
    let callback = api.setUserOnlineStatus(uid, isConnected)
    console.log(`[connectionActions.js] checkUserConnection | isConnected: `, isConnected)
    // alert(`[connectionActions.js] checkUserConnection | isConnected: ${isConnected}`)
    dispatch({type: 'CONNECTION_USER_STATUS_CHANGED'})
    return callback  // Note: the IDE complained about an ignored promise from api.setUserOnlineStatus()
  })

