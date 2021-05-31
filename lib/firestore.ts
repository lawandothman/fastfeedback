import { IFeedback, ISite, IUser } from 'types'
import firebase from './firebase'
import getStripe from './stripe'

const firestore = firebase.firestore()
const app = firebase.app()

export const createUser = (user: IUser) => firestore.collection('users').doc(user.uid).set(user, { merge: true })

export const createSite = (site: ISite) => {
  const siteRef = firestore.collection('sites').doc()
  siteRef.set(site)
  return siteRef
}

export const createFeedback = (feedback: IFeedback) => {
  const feedbackRef = firestore.collection('feedback').doc()
  feedbackRef.set(feedback)
  return feedbackRef
}

export const deleteFeedback = (id: string) => firestore.collection('feedback').doc(id).delete()

export const createCheckoutSession = async (uid: string) => {
  const checkoutSessionRef = await firestore
    .collection('users')
    .doc(uid)
    .collection('checkout_sessions')
    .add({
      price: 'price_1IwubBLM94muTW7TuPLrbLHc',
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    })

  checkoutSessionRef.onSnapshot(async (snap) => {
    // @ts-ignore
    const { sessionId } = snap.data()

    if (sessionId) {
      const stripe = await getStripe()
      stripe?.redirectToCheckout({ sessionId })
    }
  })
}

export const goToBillingPortal = async () => {
  const functionRef = app
    .functions('europe-west2')
    .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink')
  const { data } = await functionRef({ returnUrl: window.location.origin })
  window.location.assign(data.url)
}
