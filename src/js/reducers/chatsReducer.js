import {combineReducers} from "redux"
import {createErrorReducer, createIsFetchingReducer} from "./commonReducer"
import {createReducer} from "@reduxjs/toolkit"


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
      case 'CHATS_JOIN_SUCCESS':
        if (!action.createdNew) {
          return [...state, action.chat];
        }
        return [...state]
      case 'CHATS_FETCH_SUCCESS':
        // check for the chat that was joined and remove it from available
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
      case 'CHATS_JOIN_SUCCESS':
        console.log(`got the available chats: `, action.available)
        return state.filter(chat => chat.id !== action.chat.id)
      // return action.available  // this means the action that comes in is going to have a chats objects
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
  const activeChats = createReducer({}, {

    'CHATS_SET_ACTIVE_CHAT': (state, action) => {  // default state is empty object
      const {chat} = action
      state[chat.id] = chat;
    },
    'CHATS_UPDATE_USER_STATE': (state, action) => {
      const {user, chatId} = action  // extract from the action
      const joinedUsers = state[chatId].joinedUsers
      const indexOfUser = joinedUsers.findIndex(jUser => jUser.uid === user.uid)  // identify where in the list the user is

      if (indexOfUser < 0) return state  // the user is not found in joinedUsers
      // note: the line below was enabled when a weird bug happened where the logged in user wouldn't show as online
      if (joinedUsers[indexOfUser].state === user.state) return state  // the state has not changed
      joinedUsers[indexOfUser].state = user.state  // the state has changed --> update the state of the user

    }
  })

  const messages = createReducer({}, {
    'CHATS_SET_MESSAGES': (state, action) => {
      console.log(`PROCESSING CHATS_SET_MESSAGES!`,)

      const previousMessages = state[action.chatId] || []  // either get the previous messages, or its an empty array
      state[action.chatId] = [...previousMessages, ...action.messages]  // this should only add the new changes into the messages
    }
  })

  const messageSubscriptions = (state={}, action) => {
    switch (action.type) {
      case 'CHATS_REGISTER_MESSAGE_SUB':
        return {...state, [action.chatId]: action.sub}  // keep track of the subscriptions by chatId
      default:
        return state
    }
  }

  return combineReducers({
    available,
    joined,
    activeChats,
    messages,
    messageSubscriptions,
    isLoading: createIsFetchingReducer('CHATS_FETCH'),
    loader: createChatsLoaderReducer(),
  })
}

export default createChatReducer()