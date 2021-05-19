import { IFeedback, ISite, IUser } from 'types'
import firebase from './firebase'

const firestore = firebase.firestore()

export const createUser = (user: IUser) => firestore.collection('users').doc(user.uid).set({ user }, { merge: true })

export const createSite = (site: ISite) => firestore.collection('sites').add(site)

export const createFeedback = (feedback: IFeedback) => firestore.collection('feedback').add(feedback)
