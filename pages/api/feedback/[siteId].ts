import { NextApiRequest, NextApiResponse } from 'next'
import { getAllFeedback } from '@/lib/firestore-admin'

const getSiteFeedback =  async (req: NextApiRequest, res: NextApiResponse) => {
  const { feedback, error } = await getAllFeedback(req.query.siteId as string)

  if (error) {
    res.status(500).json({ error })
  }

  res.status(200).json({ feedback })
}

export default getSiteFeedback