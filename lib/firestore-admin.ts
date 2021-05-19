import { IFeedback } from 'types'
import admin from './firebase-admin'

const firestore = admin.firestore()

// eslint-disable-next-line import/prefer-default-export
export const getAllFeedback = async (siteId: string) => {
  const snapshot = await firestore
    .collection('feedback')
    .where('siteId', '==', siteId)
    .get()

  const feedback: IFeedback[] = []

  // @ts-ignore
  snapshot.forEach((doc) => feedback.push({ id: doc.id, ...doc.data() }))

  return feedback
}
