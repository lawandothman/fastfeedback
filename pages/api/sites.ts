import { NextApiRequest, NextApiResponse } from 'next'
import { getUserSites } from '@/lib/firestore-admin'
import admin from '@/lib/firebase-admin'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.headers.token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const { uid } = await admin.auth().verifyIdToken(req.headers.token as string)
    const { sites } = await getUserSites(uid)
    return res.status(200).json({ sites })
  } catch (error) {
    return res.status(500).json({ error })
  }
}
