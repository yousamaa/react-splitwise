import React, { useContext, useState, useEffect } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
  updateEmail as newEmail,
  updatePassword as newPassword
} from 'firebase/auth'

import { auth } from '../firebase'

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({})
  const [loading, setLoading] = useState(true)

  const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password)

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password)

  const logout = () => signOut(auth)

  const resetPassword = email => sendPasswordResetEmail(auth, email)

  const updateEmail = email => newEmail(currentUser, email)

  const updatePassword = password => newPassword(currentUser, password)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
