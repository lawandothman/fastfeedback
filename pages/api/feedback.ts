import { NextApiRequest, NextApiResponse } from 'next'
import { getUserFeedback } from '@/lib/firestore-admin'
import admin from '@/lib/firebase-admin'

const getAllFeedback =  async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.headers.token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const { uid } = await admin.auth().verifyIdToken(req.headers.token as string)
    const { feedback } = await getUserFeedback(uid)
    return res.status(200).json({ feedback })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export default getAllFeedback