import React, {
  createContext, useContext, useEffect, useState,
} from 'react'
import firebase from './firebase'

interface User {
  uid: string
  email: string | null
  name: string | null
  provider: string | undefined
}
interface InitialValue {
  user: User | null
  signinWithGithub: () => Promise<User | null>
  signout: () => Promise<User | null>
}

const AuthContext = createContext<InitialValue | null>(null)

const formatUser = (user: firebase.User) => ({
  uid: user.uid,
  email: user.email,
  name: user.displayName,
  provider: user.providerData[0]?.providerId,
})

const useProvideAuth = () => {
  const [user, setUser] = useState<User | null>(null)

  console.log(user)

  const handleUser = (rawUser: firebase.User | null) => {
    if (rawUser) {
      const formattedUser = formatUser(rawUser)
      setUser(formattedUser)
      return formattedUser
    }
    setUser(null)
    return null
  }

  const signinWithGithub = () => firebase
    .auth()
    .signInWithPopup(new firebase.auth.GithubAuthProvider())
    .then((res) => handleUser(res.user))

  const signout = () => firebase
    .auth()
    .signOut()
    .then(() => handleUser(null))

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser)
    return () => unsubscribe()
  }, [])

  return {
    user,
    signinWithGithub,
    signout,
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
