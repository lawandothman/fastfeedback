import { IFeedback, ISite, IUser } from 'types'
import firebase from './firebase'

const firestore = firebase.firestore()

export const createUser = (user: IUser) => firestore.collection('users').doc(user.uid).set({ user }, { merge: true })

export const createSite = (site: ISite) => {
  const siteRef = firestore.collection('sites').doc()
  siteRef.set(site)
  return siteRef
}

export const createFeedback = (feedback: IFeedback) => firestore.collection('feedback').add(feedback)

export const deleteFeedback = (id: string) => firestore.collection('feedback').doc(id).delete()
