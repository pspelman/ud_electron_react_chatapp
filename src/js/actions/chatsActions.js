import * as api from '../api/chatsApi'
import db from "../db/firestore";


// export function fetchChats() {
//   return async function (dispatch) {
//     // dispatch actions
//     console.log(`dispatching api.fetchChats`, )
//
//     const chats = await api.fetchChats()
//       // .then(response => {
//       //   console.log(`chats response: `, response)
//       // })
//       dispatch({
//         type: 'CHATS_FETCH_SUCCESS',
//         chats
//       })
//     return chats
//
//   };
// }

export const fetchChats = () => async (dispatch, getState) => { // Note: this is a rewritten version of the code above
  const {user} = getState().auth  // use the getState to get out the user

  console.log(`going to dispatch CHATS_FETCH_INIT`,)
  dispatch({type: 'CHATS_FETCH_INIT'})
  const chats = await api.fetchChats()

  chats.forEach(chat => {
    chat.joinedUsers = chat.joinedUsers.map(user => user.id)  // condense the joinedUser info into a list of Ids on the chat object
    console.log(`joined user ids: `, chat.joinedUsers)
  })

  // now we need a sorting function
  console.log(`going to process chats: k`, chats)

  const sortedChats = chats.reduce((processedChats, chat) => {
    // FIRST check if the currently logged in user is included in the chat
    // Note: thanks to thunk middleware and getstate we can get the userId
    // const chatToJoin = chat && chat.joinedUsers.includes(user.uid) ? 'joined' : 'available'  // if the current user is part of the chat's users, mark it as joined
    processedChats[chat && chat.joinedUsers.includes(user.uid) ? 'joined' : 'available'].push(chat)  // add the chat to the appropriate list
    return processedChats
  }, {joined: [], available: []})  // we will start the iteration with a single object, {'joined' as an empty array and 'available' as an empty array}

  console.log(`sorted chats: `, sortedChats)
  dispatch({
    type: 'CHATS_FETCH_SUCCESS',
    ...sortedChats,
  })
  return sortedChats

  // api
  //   .fetchChats()
  //   .then(chats => dispatch({
  //     type: 'CHATS_FETCH_SUCCESS',
  //     chats
  //   }))
  //   .catch(err => {
  //     console.log(`error fetching chats: `, err)
  //     dispatch({type: 'CHATS_FETCH_ERROR', error: err})
  //   })
}

export const joinChat = (userId, chat) => dispatch =>
  api.joinChat(userId, chat.id)
    .then(chatId => {
      console.log(`successfully joined chat `, chatId)
      dispatch({type: 'CHATS_JOIN_SUCCESS'})
    })
// export const joinChat = (chatId, getState) => async dispatch => {
//   const {user} = getState().auth
//
//   // todo: maybe check if there are permissions to join
//   console.log(`trying to join userId ${user.id} to chat `, chatId)
//
// }

export const createChat = (formData, userId) => async dispatch => {
  const newChat = {...formData}  // need  to pass the user ID
  // get the user profile for the given ID
  newChat.admin = db.doc(`profiles/${userId}`)  // each chat has to have an admin --> assign the user creating the chat as the admin
  // newChat.joinedUsers = [userRef]  // each chat has a joinedUsers array --> add this first user to the array

  const chatId = await api.createChat(newChat)
  dispatch({type: "CHATS_CREATE_SUCCESS"})

  await api.joinChat(userId, chatId)  // now use the action to update the DB for this user to join the chat
  dispatch({type: "CHATS_JOIN_SUCCESS", chat: {...newChat, id: chatId}})
  return chatId



  // return api  // need to add admin and joinedUsers to formData
  //   .createChat(newChat) // this will return the ID of the chat --> chain the ID
  //   .then(_ => {
  //     dispatch({type: "CHATS_CREATE_SUCCESS"})
  //     return chatId
  //   })
  //   .then(chatId => {
  //     api.joinChat(userId, chatId)
  //   })
  //   .catch(err => {
  //     console.log(`error creating chat: `, err)
  //     dispatch({type: 'CHATS_CREATE_ERROR', error: err})
  //   })
}

// export const createChat = (formData, userId) => async dispatch => {
//   const newChat = {...formData};
//   newChat.admin = db.doc(`profiles/${userId}`);
//
//   const chatId = await api.createChat(newChat);
//   dispatch({type: 'CHATS_CREATE_SUCCESS'});
//   await api.joinChat(userId, chatId)
//   dispatch({type: 'CHATS_JOIN_SUCCESS', chat: {...newChat, id: chatId}});
//   return chatId;
// }