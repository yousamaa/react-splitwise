import { Routes, Route } from 'react-router-dom'
import Signup from '../pages/Signup'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import PrivateRoute from '../components/PrivateRoute'
import ForgotPassword from '../components/authentication/ForgotPassword'
import UpdateProfile from '../components/authentication/UpdateProfile'
import routesPath from './RoutesPath'

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
          <UpdateProfile />
        </PrivateRoute>
      }
    />
    <Route path={routesPath.signUp} element={<Signup />} />
    <Route path={routesPath.login} element={<Login />} />
    <Route path={routesPath.forgotPassword} element={<ForgotPassword />} />
  </Routes>
)

export default createRoutes
