import firebase from "firebase/app"
import 'firebase/database';
import db from '../db/firestore';

const getOnlineStatus = isOnline => ({
  state: isOnline ? 'online' : 'offline',
  lastChanged: firebase.firestore.FieldValue.serverTimestamp()
})


export const setUserOnlineStatus = (uid, isOnline) => {
  const userRef = db.doc(`/userProfiles/${uid}`);
  const updateData = getOnlineStatus(isOnline) // this gets the online status of the user (returns object)
  // console.log(`updating online status to : `, isOnline)
  return userRef.update(updateData)  // this is updating the DB and returning a callback
}

export const onConnectionChanged = onConnection =>
  firebase
    .database()
    .ref('.info/connected')
    .on('value', snapshot => {
      const isConnected = snapshot?.val() ? snapshot.val() : false;  // it's posisble the snapshot will be undefined, make sure to account for it
      console.log(`[connectionApi.js] onConnectionChanged | CONNECTED: `, isConnected)
      onConnection(isConnected)
    })
