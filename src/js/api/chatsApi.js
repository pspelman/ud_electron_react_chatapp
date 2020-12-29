// use the firestore database to get our chats
import db from '../db/firestore'
import firebase from 'firebase/app'

const extractSnapshot = snapshot =>
  snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));

export const fetchChats = () => {
  return db
    .collection('chats')
    .get()
    .then(extractSnapshot)
  // .then((snapshot) => {
  //   // need to extract the pieces of data we want
  //   // if you are fetching a collection then data are provided under snapshot.docs
  //   // debugger
  //   // return snapshot.docs.map(doc => {
  //   //   return doc.data()  // extracting the chats data from the doc
  //   // })
  //   // NOTE: simplify the logic, use destructuring
  //   return extractSnapshot(snapshot)
  //
  // })
}

export const createChat = chatData => {
  console.log(`going to create the chat in the API: `, chatData)
  // return async () => await db
  return db
    .collection('chats')  // reference the collection I want to access
    .add(chatData)  // provide the data I want to add
    .then(docRef => docRef.id)
}

export const joinChat = async (userId, chatId) => {
  console.log(`[chatsAPI] - joinChat - going to join | chatId: ${chatId} | userId: ${userId}`,)

  const userRef = db.doc(`userProfiles/${userId}`)
  const chatRef = db.doc(`chats/${chatId}`);

  // now await the update for the chat
  await userRef.update({joinedChats: firebase.firestore.FieldValue.arrayUnion(chatRef)})
  await chatRef.update({joinedUsers: firebase.firestore.FieldValue.arrayUnion(userRef)})

}

export const subscribeToChat = (chatId, onSubscribe) =>  // onSubcribe is the callback function for handling subscription updates for this specific chat
  db
    .collection(`chats`)
    .doc(chatId)
    .onSnapshot(snapshot => {
      const chat = {id: snapshot.id, ...snapshot.data()}  // get the id and the rest of the chat data into an object
      onSubscribe(chat)
    })

export const subscribeToProfile = (uid, onSubscribe) =>  // onSubcribe is the callback function for handling subscription updates for this specific chat
  db
    .collection(`userProfiles`)
    .doc(uid)
    .onSnapshot(snapshot => onSubscribe(snapshot.data()))