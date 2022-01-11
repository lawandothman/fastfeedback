import { compareDesc, parseISO } from 'date-fns'
import { IFeedback, ISite } from 'types'
import admin from './firebase-admin'

const firestore = admin.firestore()

export const getAllFeedback = async (siteId: string) => {
  try {
    const snapshot = await firestore
      .collection('feedback')
      .where('siteId', '==', siteId)
      .get()

    const feedback: IFeedback[] = []

    // @ts-ignore
    snapshot.forEach((doc) => feedback.push({ id: doc.id, ...doc.data() }))

    feedback.sort((a, b) => compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)))

    return { feedback }
  } catch (error) {
    return { error }
  }
}

export const getSite = async (siteId: string) => {
  const doc = await firestore.collection('sites').doc(siteId).get()
  const site = {id: doc.id, ...doc.data()}

  return { site }
}

export const getAllSites = async () => {
  const snapshot = await firestore.collection('sites').get()
  const sites: ISite[] = []

  // @ts-ignore
  snapshot.forEach((doc) => sites.push({ id: doc.id, ...doc.data() }))

  return { sites }
}

export const getUserSites = async (userId: string) => {
  const snapshot = await firestore
    .collection('sites')
    .where('authorId', '==', userId)
    .get()

  const sites: ISite[] = []

  // @ts-ignore
  snapshot.forEach((doc) => sites.push({ id: doc.id, ...doc.data() }))

  sites.sort((a, b) => compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)))

  return { sites }
}

export const getUserFeedback = async (userId: string) => {
  const snapshot = await firestore
    .collection('feedback')
    .where('authorId', '==', userId)
    .where('status', 'in', ['pending','active'])
    .get()

  const feedback: IFeedback[] = []

  // @ts-ignore
  snapshot.forEach((doc) => feedback.push({ id: doc.id, ...doc.data() }))

  return { feedback }
}
