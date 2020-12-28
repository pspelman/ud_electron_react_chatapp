import {combineReducers} from "redux";
import {createErrorReducer, createIsFetchingReducer} from "./commonReducer";

function createChatsLoaderReducer() {
  return combineReducers({
    // isLoading: createIsFetchingReducer('CHATS_FETCH'),  // this will send chats fetch init to cause loading to return true
    isLoading: false,
    error: createErrorReducer('CHATS_FETCH'),
  })
}


function createChatReducer() {
  const joined = (state = [], action) => {
    switch (action.type) {
      case 'CHATS_FETCH_RESTART':
        return []
      case 'CHATS_FETCH_ERROR':
        // return {items: []}
        return []
      case 'CHATS_FETCH_SUCCESS':
        console.log(`got the chats`, action.joined)
        return action.joined  // this means the action that comes in is going to have a chats objects
      default:
        return state;
    }
  }

  const available = (state = [], action) => {
    switch (action.type) {
      case 'CHATS_FETCH_RESTART':
        return []
      case 'CHATS_FETCH_ERROR':
        // return {items: []}
        return []
      case 'CHATS_FETCH_SUCCESS':
        console.log(`got the available chats: `, action.available)
        return action.available  // this means the action that comes in is going to have a chats objects
      default:
        return state;
    }
  }

  // const chats = (state = [], action) => {
  //   // console.log(`[${action.type.toUpperCase()}] (CHATS reducer) --> `, action)
  //   switch (action.type) {
  //     case 'CHATS_FETCH_ERROR':
  //       // return {items: []}
  //       return []
  //     case 'CHATS_FETCH_SUCCESS':
  //       console.log(`got the chats`, action.chats)
  //       // return {items: action.chats}  // this means the action that comes in is going to have a chats objects
  //       return action.chats  // this means the action that comes in is going to have a chats objects
  //     default:
  //       return state;
  //   }
  // };

  return combineReducers({
    available,
    joined,
    isLoading: createIsFetchingReducer('CHATS_FETCH'),
    loader: createChatsLoaderReducer(),
  })
}

export default createChatReducer()