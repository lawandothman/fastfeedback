import { loadStripe } from '@stripe/stripe-js'

const getStripe = async () => loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default getStripe
