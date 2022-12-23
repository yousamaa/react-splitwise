import React from "react"
import { Container } from "react-bootstrap"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { AuthProvider } from "../contexts/AuthContext"
import Signup from "./Signup"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"

import './App.css'

const App = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center outer-div">
      <div className="w-100 inner-div">
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path='/' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

export default App
