import React, {
  createContext, useContext, useEffect, useState,
} from 'react'
import Router from 'next/router'
import Cookies from 'js-cookie'
import { IUser } from 'types'
import firebase from './firebase'
import { createUser } from './firestore'

interface IAuthContext {
  user: IUser | null
  loading: boolean
  signinWithGithub: () => Promise<IUser | null>
  signinWithGoogle: () => Promise<IUser | null>
  signout: () => Promise<IUser | null>
}

const AuthContext = createContext<IAuthContext | null>(null)

const getStripeRole = async () => {
  await firebase.auth().currentUser?.getIdToken(true)
  const decodedToken = await firebase.auth().currentUser?.getIdTokenResult()
  return decodedToken?.claims.stripeRole || 'free'
}

const formatUser = async (user: firebase.User): Promise<IUser> => ({
  uid: user.uid,
  email: user.email,
  name: user.displayName,
  provider: user.providerData[0]?.providerId,
  photoUrl: user.photoURL,
  stripeRole: await getStripeRole()
})

const useProvideAuth = () => {
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(true)

  console.log(user)

  const handleUser = async (
    rawUser: firebase.User | null,
  ): Promise<IUser | null> => {
    if (rawUser) {
      const token = await rawUser.getIdToken()
      const formattedUser = await formatUser(rawUser)
      createUser(formattedUser)
      setUser({ ...formattedUser, token })
      Cookies.set('fast-feedback-auth', formattedUser, { expires: 1 })
      setLoading(false)
      return { ...formattedUser, token }
    }
    Cookies.remove('fast-feedback-auth')
    setLoading(false)
    setUser(null)
    return null
  }


  const signinWithGithub = async () => {
    setLoading(true)
    Router.push('/sites')
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((res) => handleUser(res.user))
  }

  const signinWithGoogle = async () => {
    setLoading(true)
    Router.push('/sites')
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((res) => handleUser(res.user))
  }

  const signout = async () => {
    Router.push('/')
    Cookies.remove('fast-feedback-auth')
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(null))
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser)
    return () => unsubscribe()
  }, [])

  return {
    user,
    loading,
    signinWithGithub,
    signinWithGoogle,
    signout,
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
