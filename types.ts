export interface IUser {
  uid: string
  email: string | null
  name: string | null
  provider: string | undefined
  photoUrl: string | null
}

export interface ISite {
  id?: string
  authorId: string | undefined
  createdAt: string
  name: string
  url: string
}

export interface IFeedback {
  id?: string
  author?: string | null
  authorId?: string
  createdAt: string
  provider?: string
  rating: number
  siteId: string
  status: string
  text?: string
}
