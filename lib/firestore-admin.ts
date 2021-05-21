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

  return { sites }
}
