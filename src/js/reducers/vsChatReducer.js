import {combineReducers} from "redux"

function createVsChatReducer() {
  const createdThreads = (state = [], action) => {
    switch (action.type) {
      case 'C_THREAD_CREATE':
        console.log(`created new thread! `, action.thread.threadID)
        return [...state, action.thread.threadID]
      default:
        return state
    }
  }

  const threads = (state = [], action) => {
    switch (action.type) {
      case 'sThreadCreate':
        // add thread to current threads
        // todo: consider organizing by threadID ?
        return [...state, action.thread]

      case 'sServerDeletedThread':
      case 'sShredThread':
        // todo: consider organizing by threadID ?
        let remainingThreads = state.filter(_thread => _thread.threadID !== action.thread.threadID)
        console.log(`REMOVED ${action.thread.threadID} leaving : `, remainingThreads)
        return remainingThreads

      default:
        return state
    }
  }

  const selectedThread = (state = null, action) => {
    switch (action.type) {
      case 'C_THREAD_CREATE':
        return action.thread
      case 'SET_SELECTED_THREAD':
        return action.thread
      default:
        return state
    }
  }

  return combineReducers({
    threads,
    createdThreads,
    // todo: keep track of the last thread created
    // todo: create the callback to delete a thread
    // todo: shred the threds manually from other device to keep the list clean
    // todo: handle sThreadMessage (to receive messages)
    selectedThread,
  })
}

export default createVsChatReducer()