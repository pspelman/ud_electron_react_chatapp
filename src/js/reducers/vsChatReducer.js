import {combineReducers} from "redux"

function createVsChatReducer() {
  const createdThreads = (state=[], action) => {
    switch (action.type) {
      case 'C_THREAD_CREATE':
        console.log(`created new thread! `, action.thread.threadID)
        return [...state, action.thread.threadID]
      default:
        return state
    }
  }

  return combineReducers({
    createdThreads,
    // todo: keep track of the last thread created
    // todo: create the callback to delete a thread
    // todo: shred the threds manually from other device to keep the list clean
    // todo: handle sThreadMessage (to receive messages)
    latestThread,
  })
}

export default createVsChatReducer()