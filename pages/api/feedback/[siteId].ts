import { NextApiRequest, NextApiResponse } from 'next'
import { getAllFeedback } from '@/lib/firestore-admin'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const siteId = typeof req.query.siteId === 'string' ? req.query.siteId : ''
  const { feedback, error } = await getAllFeedback(siteId)

  if (error) {
    res.status(500).json({ error })
  }

  res.status(200).json({ feedback })
}
