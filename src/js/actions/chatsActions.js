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
    chat.joinedUsers = chat.joinedUsers ? chat.joinedUsers.map(user => user.id) : []  // condense the joinedUser info into a list of Ids on the chat object
    // console.log(`joined user ids: `, chat.joinedUsers)
  })

  // now we need a sorting function
  // console.log(`going to process chats: k`, chats)

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
      dispatch({type: 'CHATS_JOIN_SUCCESS', chat})
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
  dispatch({type: "CHATS_JOIN_SUCCESS", chat: {...newChat, id: chatId}, createdNew: true})
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


// export const sendChatMessage = (message, chatId) => (dispatch, getState) => {
//   // before sending the message, we need to create the user reference
//   console.log(`[chatsActions.js] - sendChatMessage -- begin!`, )
//
//   const newMessage = {...message}  // create a copy of the original message object
//   const {user} = getState().auth  // the current user
//   const userRef = db.doc(`userProfiles/${user.uid}`)  // attach the userRef to the message
//   console.log(`got the userRef: `, userRef)
//
//   newMessage.author = userRef
//   console.log(`[chatsActions.js] sendChatMessage -- going to call sendChatMessage with new message: `, newMessage, '\nand chatId: ', chatId)
//
//   return api
//     .sendChatMessage(newMessage, chatId)
//     .then(_ => dispatch({type: 'CHATS_MESSAGE_SENT'}))
// }

// export const subscribeToChat = chatId => dispatch =>
//   api
//     .subscribeToChat(chatId, async chat => {
//       const joinedUsers = await Promise.all(
//         chat.joinedUsers.map(async userRef => {
//           const userSnapshot = await userRef.get()
//           return userSnapshot.data()
//         })
//       )
//       console.log(`Joined users: `, joinedUsers)
//       chat.joinedUsers = joinedUsers  // adding the joined users to the chat object
//
//       // Note: I want to create a new chat object for storing my chats by ID
//       console.log(`SUBSCRIBED TO CHAT: `, chatId)
//       dispatch({'type': 'CHATS_SET_ACTIVE_CHAT', chat})
//     })
export const subscribeToChat = chatId => dispatch =>
  api
    .subscribeToChat(chatId, async chat => {

      const joinedUsers = await Promise.all(
        chat.joinedUsers.map(async userRef => {
          const userSnapshot = await userRef.get()
          return userSnapshot.data()
        })
      )
      console.log(`Joined users: `, joinedUsers)
      chat.joinedUsers = joinedUsers  // adding the joined users to the chat object

      // Note: I want to create a new chat object for storing my chats by ID
      console.log(`SUBSCRIBED TO CHAT: `, chatId)
      dispatch({'type': 'CHATS_SET_ACTIVE_CHAT', chat})

    })

export const subscribeToProfile = (uid, chatId) => dispatch =>
  api
    .subscribeToProfile(uid, user => {
      console.log(`USER Profile change detected! `, user)
      dispatch({'type': 'CHATS_UPDATE_USER_STATE', user, chatId})  // handle the updated user state, pass on chatId
    })


// export const subscribeToProfile = uid => dispatch =>
//   api
//     .subscribeToProfile(uid, user => {
//       console.log(`USER Profile change detected! `, user)
//       dispatch({'type': 'CHATS_UPDATE_USER_STATE', user})  // handle the updated user state
//     })

// export const createChat = (formData, userId) => async dispatch => {
//   const newChat = {...formData};
//   newChat.admin = db.doc(`profiles/${userId}`);
//
//   const userId = await api.createChat(newChat);
//   dispatch({type: 'CHATS_CREATE_SUCCESS'});
//   await api.joinChat(userId, chatId)
//   dispatch({type: 'CHATS_JOIN_SUCCESS', chat: {...newChat, id: chatId}});
//   return chatId;
// }

export const sendChatMessage = (message, chatId) => (dispatch, getState) => {
  console.log(`[chatsActions.js] - sendChatMessage -- begin!`,)
  const newMessage = {...message}
  const {user} = getState().auth
  const userRef = db.doc(`userProfiles/${user.uid}`)
  newMessage.author = userRef;
  //
  console.log(`[chatsActions.js] - calling to API with new message: `, newMessage)

  return api
    .sendChatMessage(newMessage, chatId)
    .then(_ => dispatch({type: 'CHATS_MESSAGE_SENT'}))
}

export const subscribeToMessages = chatId => dispatch => {
  return api.subscribeToMessage(chatId, async changes => {  // technically receiving an object of changes
    const messages = changes.map(change => {
      if (change.type === 'added') {  // if the change type is 'added' then it should be shown
        return {id: change.doc.id, ...change.doc.data()}
      }
    })

    const messagesWithAuthor = []
    const cache = {}

    for await(let message of messages) {
      if (cache[message.author.id]) {
        message.author = cache[message.author.id];
      }
      else {
        const userSnapshot = await message.author.get();  // the author is a userRef, so calling get() on it
        cache[userSnapshot.id] = userSnapshot.data()
        message.author = cache[userSnapshot.id]
      }
      messagesWithAuthor.push(message)  // adding the authored message to the list

    }

    dispatch({type: 'CHATS_SET_MESSAGES', messages: messagesWithAuthor, chatId})
    return messages
  })
}

export const registerMessageSubscription = (chatId, messageSub) => ({
  type: 'CHATS_REGISTER_MESSAGE_SUB',
  sub: messageSub,
  chatId
})