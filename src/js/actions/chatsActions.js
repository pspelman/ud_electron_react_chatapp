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

export const fetchChats = () => dispatch => { // Note: this is a rewritten version of the code above
  console.log(`going to dispatch CHATS_FETCH_INIT`,)

  dispatch({type: 'CHATS_FETCH_INIT'})
  api
    .fetchChats()
    .then(chats => dispatch({
      type: 'CHATS_FETCH_SUCCESS',
      chats
    }))
    .catch(err => {
      console.log(`error fetching chats: `, err)
      dispatch({type: 'CHATS_FETCH_ERROR', error: err})
    })
}

export const createChat = (formData, userId) => dispatch => {
  const newChat = {...formData}  // need  to pass the user ID
  const useRef = db.doc(`profiles/${userId}`)  // get the user profile for the given ID
  newChat.admin = useRef  // each chat has to have an admin --> assign the user creating the chat as the admin
  newChat.joinedUsers = [useRef]  // each chat has a joinedUsers array --> add this first user to the array

  return api  // need to add admin and joinedUsers to formData
    .createChat(newChat)
    .then(_ => dispatch({type: "CHATS_CREATE_SUCCESS"}))
    .catch(err => {
      console.log(`error creating chat: `, err)
      dispatch({type: 'CHATS_CREATE_ERROR', error: err})
    })
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