import createRoutes from './routes/Routes'
import { AuthProvider } from './contexts/AuthContext'

const App = () => {
  const routes = createRoutes()
  return <AuthProvider>{routes}</AuthProvider>
}

export default App
