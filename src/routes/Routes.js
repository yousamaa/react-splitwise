import { Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import Signup from '../pages/Signup'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import PrivateRoute from '../components/PrivateRoute'
import ForgotPassword from '../components/authentication/ForgotPassword'
import UpdateProfile from '../components/authentication/UpdateProfile'
import routesPath from './RoutesPath'

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

const createRoutes = () => (
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
      path={routesPath.updateProfile}
      element={
        <PrivateRoute>
          <LoginWrapper>
            <UpdateProfile />
          </LoginWrapper>
        </PrivateRoute>
      }
    />
    <Route
      path={routesPath.signUp}
      element={
        <LoginWrapper>
          <Signup />
        </LoginWrapper>
      }
    />
    <Route path={routesPath.login} element={<Login />} />
    <Route
      path={routesPath.forgotPassword}
      element={
        <LoginWrapper>
          <ForgotPassword />
        </LoginWrapper>
      }
    />
  </Routes>
)

export default createRoutes
