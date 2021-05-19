import { NextApiRequest, NextApiResponse } from 'next'
import admin from '@/lib/firebase-admin'
import { ISite } from 'types'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const sites: ISite[] = []

  const snapshot = await admin.firestore().collection('sites').get()

  // @ts-ignore
  snapshot.forEach((doc) => sites.push({ id: doc.id, ...doc.data() }))

  res.status(200).json({ sites })
}
