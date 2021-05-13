import { NextApiRequest, NextApiResponse } from 'next'
import db from '@/lib/firebase-admin'
import { ISite } from 'types'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const sites: ISite[] = []

  const snapshot = await db.collection('sites').get()
  snapshot.forEach((doc) => {
    const {
      authorId, createdAt, site, url,
    } = doc.data()

    sites.push({
      id: doc.id,
      authorId,
      createdAt,
      site,
      url,
    })
  })

  res.status(200).json(sites)
}
