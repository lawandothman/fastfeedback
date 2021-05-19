import { NextApiRequest, NextApiResponse } from 'next'
import { getAllSites } from '@/lib/firestore-admin'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const sites = await getAllSites()
  res.status(200).json({ sites })
}
