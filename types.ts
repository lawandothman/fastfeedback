export interface User {
  uid: string
  email: string | null
  name: string | null
  provider: string | undefined
  photoUrl: string | undefined
}
