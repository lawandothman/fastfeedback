import { NextApiRequest, NextApiResponse } from 'next'
import { getAllFeedback, getSite } from '@/lib/firestore-admin'

const getSiteFeedback =  async (req: NextApiRequest, res: NextApiResponse) => {
  const siteId = req.query.siteId as string
  const { feedback, error } = await getAllFeedback(siteId)
  const { site } = await getSite(siteId)

  if (error) {
    res.status(500).json({ error })
  }

  res.status(200).json({ feedback, site })
}

export default getSiteFeedback