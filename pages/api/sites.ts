import { NextApiRequest, NextApiResponse } from 'next'
import { getAllSites } from '@/lib/firestore-admin'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const { sites, error } = await getAllSites()

  if (error) {
    res.status(500).json({ error })
  }

  res.status(200).json({ sites })
}
