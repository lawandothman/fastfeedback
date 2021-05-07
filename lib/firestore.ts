import { User } from '../types'
import firebase from './firebase'

const firestore = firebase.firestore()

const createUser = (user: User) => firestore.collection('users').doc(user.uid).set({ user }, { merge: true })

export default createUser
