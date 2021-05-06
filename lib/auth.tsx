import React, {
  createContext, useContext, useEffect, useState,
} from 'react'
import firebase from './firebase'

interface InitialValue {
  user: firebase.User | null
  signinWithGithub: () => Promise<firebase.User | null>
  signout: () => Promise<void>
}

const AuthContext = createContext<InitialValue | null>(null)

const useProvideAuth = () => {
  const [user, setUser] = useState<firebase.User | null>(null)

  console.log(user)

  const signinWithGithub = () => firebase
    .auth()
    .signInWithPopup(new firebase.auth.GithubAuthProvider())
    .then((res) => {
      setUser(res.user)
      return res.user
    })

  const signout = () => firebase
    .auth()
    .signOut()
    .then(() => setUser(null))

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((u) => {
      if (u) {
        setUser(u)
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  })

  return {
    user,
    signinWithGithub,
    signout,
  }
}

export const ProvideAuth = ({ children }: { children: React.ReactNode }) => {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
