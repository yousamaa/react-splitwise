import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MainLogo from '../components/sidebar/MainLogo'

import { useAuth } from '../contexts/AuthContext'
import routesPath from '../routes/RoutesPath'

const Signup = () => {
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    if (data.get('password') !== data.get('confirm-password')) {
      setError('Passwords do not match')
    }

    try {
      setError('')
      setLoading(true)
      await signup(data.get('email'), data.get('password'))
      navigate('/')
    } catch {
      setError('Failed to create an account')
    }

    setLoading(false)
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <MainLogo />
        <Avatar sx={{ bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign Up
        </Typography>
        {error && <Alert severity='error'>{error}</Alert>}
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='confirm-password'
            label='Confirm Password'
            type='password'
            id='confirm-password'
            autoComplete='confirm-password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link to={routesPath.login}>{'Already have an account? Log In'}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Signup
