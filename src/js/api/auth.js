import db from '../db/firestore'
import firebase from "firebase";
import 'firebase/auth'

function createUserProfile(userProfile) {
  db
    .collection('userProfiles')
    .doc(userProfile.uid)
    .set(userProfile)
    .then(response => {
      console.log(`user profile created: `, response)
    })
}

export async function registerUser({email, password, username, avatar}) {
  try {
    const {user} = await firebase.auth().createUserWithEmailAndPassword(email, password)
    // after successful user creation, create the profile in the db
    await createUserProfile({uid: user.uid, username, email, avatar, joinedChats: []})
    return user
  } catch (error) {
    return Promise.reject(error.message)
  }
}