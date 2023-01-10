import React from 'react'
import { Navigate } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'
import routesPath from '../routes/RoutesPath'

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth()

  return currentUser ? children : <Navigate to={routesPath.login} />
}

export default PrivateRoute
