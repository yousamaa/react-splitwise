import React, { useState } from 'react'
import { Navbar, Alert, Nav, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

const NavBar = () => {
  const [error, setError] = useState('')
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    setError('')

    try {
      await logout()
      navigate('/login')
    } catch {
      setError('Failed to log out')
    }
  }

  return (
    <div>
      <Navbar bg='primary' variant='dark'>
        <Container>
          <Navbar.Brand href='#home'>Splitwise</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
            <Nav.Link href='#features'>Features</Nav.Link>
            <Nav.Link href='#pricing'>Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {error && <Alert variant='danger'>{error}</Alert>}
    </div>
  )
}

export default NavBar
