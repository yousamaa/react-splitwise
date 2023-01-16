import React, { useState, useEffect } from 'react'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  TextField
} from '@mui/material'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

import { database } from '../firebase'
import { useAuth } from '../contexts/AuthContext'

import './index.css'

// eslint-disable-next-line react/prop-types
const CreateGroup = ({ open, setOpen }) => {
  const [users, setUsers] = useState()
  const [personName, setPersonName] = useState([])
  const [grpName, setGrpName] = useState('')
  const { authenticatedUser } = useAuth()
  const navigate = useNavigate()
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    boxShadow: 24,
    p: 4
  }

  useEffect(() => {
    const getUsers = async () => {
      const usersCollectionRef = collection(database, 'users')
      const data = await getDocs(usersCollectionRef)

      const filteredUsers = data.docs
        .map(doc => ({ ...doc.data(), id: doc.id }))
        .filter(user => authenticatedUser && authenticatedUser.friendIds.includes(user.id))

      setUsers(filteredUsers)
    }
    getUsers()
  }, [authenticatedUser])

  const handleChange = event => {
    setPersonName(
      typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
    )
  }

  const creategroup = async () => {
    setOpen(false)
    const grpUser = personName.map(name => ({ uid: name }))
    grpUser.push({ uid: authenticatedUser.id })

    let item = {
      name: grpName,
      totalExpense: 0,
      expenseIds: [],
      members: grpUser
    }

    await addDoc(collection(database, 'groups'), item)
    navigate('/')
  }

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false)
      }}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <p>Add Group</p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '10px'
          }}
        >
          <TextField
            label='Name'
            onChange={e => {
              setGrpName(e.target.value)
            }}
          />
          <FormControl style={{ width: '100%' }}>
            <InputLabel>Members</InputLabel>
            <Select
              labelId='demo-multiple-name-label'
              id='demo-multiple-name'
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput placeholder='Members' />}
              style={{ width: '100%' }}
            >
              {users?.map(user => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div
          style={{
            textAlign: 'center',
            backgroundColor: '#674fa3',
            borderRadius: '0.5vw',
            padding: '2px',
            marginTop: '10px',
            cursor: 'pointer'
          }}
          onClick={() => {
            creategroup()
          }}
        >
          <p style={{ color: 'white' }}>Create Group</p>
        </div>
      </Box>
    </Modal>
  )
}

export default CreateGroup
