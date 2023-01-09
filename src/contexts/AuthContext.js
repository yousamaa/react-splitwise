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
  const [user, setUser] = useState({})

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const getUser = async () => {
    const userDocRef = doc(database, 'users', String(currentUser.uid))
    const docSnap = await getDoc(userDocRef)
    setUser({ ...docSnap.data() })
  }

  const getGroups = async () => {
    const groupsCollectionRef = collection(database, 'groups')
    const data = await getDocs(groupsCollectionRef)
    setGroups(
      data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }))
    )
  }
  const filterGroups = () => {
    let filteredGroups = []
    groups.map(group => {
      group.members.map((member, index) => {
        member[index].uid == user.id
        filteredGroups.push(group)
      })
    })
    setGroups(filteredGroups)
  }

  useEffect(() => {
    getUser()
    getGroups()
    filterGroups()
  }, [currentUser])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    user,
    groups
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
