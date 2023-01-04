import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'

import { AuthProvider } from './contexts/AuthContext'
import Signup from './components/authentication/Signup'
import Dashboard from './components/Dashboard'
import Login from './components/authentication/Login'
import PrivateRoute from './components/PrivateRoute'
import ForgotPassword from './components/authentication/ForgotPassword'
import UpdateProfile from './components/authentication/UpdateProfile'

const App = () => {
  const LoginWrapper = styled.section`
    width: 22.5%;
    height: 50%;
    overflow: auto;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  `
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            exact
            path='/'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path='/update-profile'
            element={
              <PrivateRoute>
                <LoginWrapper>
                  <UpdateProfile />
                </LoginWrapper>
              </PrivateRoute>
            }
          />
          <Route
            path='/signup'
            element={
              <LoginWrapper>
                <Signup />
              </LoginWrapper>
            }
          />
          <Route
            path='/login'
            element={
              <LoginWrapper>
                <Login />
              </LoginWrapper>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <LoginWrapper>
                <ForgotPassword />
              </LoginWrapper>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
