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

export const logout = () => {
  firebase.auth().signOut()
    .then(msg => {
      console.log(`invoking ELECTRON RELOAD`, )


    })
}

export const login = ({email, password}) => firebase.auth().signInWithEmailAndPassword(email, password)  // destructure to get email / pass

export const onAuthStateChanges = onAuth => {
  // this is where you get when user logs in or logs out
  firebase.auth().onAuthStateChanged(onAuth)  // this is going to be the callback that is called when auth state changes
}
