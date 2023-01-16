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
import { doc, setDoc, collection, getDoc, getDocs } from 'firebase/firestore'

import { auth, database } from '../firebase'

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [groups, setGroups] = useState([])
  const [authenticatedUser, setAuthenticatedUser] = useState({})

  const signup = (name, email, password) => {
    createUserWithEmailAndPassword(auth, email, password).then(result => {
      const user = result.user
      setDoc(doc(database, 'users', String(user.uid)), { name: name, email: email })
    })
  }

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password)

  const logout = () => signOut(auth)

  const resetPassword = email => sendPasswordResetEmail(auth, email)

  const updateEmail = email => newEmail(currentUser, email)

  const updatePassword = password => newPassword(currentUser, password)

  const getUser = async () => {
    const userDocRef = doc(database, 'users', String(currentUser.uid))
    const docSnap = await getDoc(userDocRef)
    setAuthenticatedUser({ ...docSnap.data(), id: docSnap.id })
  }

  const getGroups = async () => {
    const groupsCollectionRef = collection(database, 'groups')
    const data = await getDocs(groupsCollectionRef)

    const filteredGroups = data.docs
      .map(doc => ({ ...doc.data(), id: doc.id }))
      .filter(
        group =>
          group.members &&
          Array.isArray(group.members) &&
          group.members.some(member => member.uid && member.uid == currentUser.uid)
      )
    setGroups(filteredGroups)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    getUser()
  }, [currentUser])

  useEffect(() => {
    getGroups()
  }, [currentUser])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    authenticatedUser,
    groups
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
