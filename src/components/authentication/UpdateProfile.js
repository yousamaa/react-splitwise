import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../../contexts/AuthContext'

const UpdateProfile = () => {
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)

    if (data.get('password') !== data.get('confirm-password')) {
      setError('Passwords do not match')
    }

    const promises = []
    setLoading(true)
    setError('')

    if (data.get('email') !== currentUser.email) {
      promises.push(updateEmail(data.get('email')))
    }
    if (data.get('password')) {
      promises.push(updatePassword(data.get('password')))
    }

    Promise.all(promises)
      .then(() => navigate('/'))
      .catch(() => setError('Failed to update account'))
      .finally(() => setLoading(false))
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
        <Avatar sx={{ bgcolor: 'secondary.main' }}>
          <EditIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Update Profile
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
            Update
          </Button>
          <Button fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} to='/'>
            <Link to='/'>Cancel</Link>
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default UpdateProfile
