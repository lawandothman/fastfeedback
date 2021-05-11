export interface IUser {
  uid: string
  email: string | null
  name: string | null
  provider: string | undefined
  photoUrl: string | null
}

export interface ISite {
  name: string
  link: string
}
