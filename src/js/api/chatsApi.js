// use the firestore database to get our chats
import db from '../db/firestore'

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