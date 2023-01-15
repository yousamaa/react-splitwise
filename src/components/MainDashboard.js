import React, { useState } from 'react'
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
import TopContainer from '../components/dashboard/TopContainer'
import { useAuth } from '../contexts/AuthContext'

import './index.css'

export default function MainDashboard() {
  const [users, setUsers] = useState()
  const [personName, setPersonName] = useState([])
  const [open, setOpen] = useState(false)
  const [grpName, setGrpName] = useState('')
  const { user: authenticatedUser } = useAuth()
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

  const getUsers = async () => {
    const usersCollectionRef = collection(database, 'users')
    const data = await getDocs(usersCollectionRef)

    const filteredUsers = data.docs
      .map(doc => ({ ...doc.data(), id: doc.id }))
      .filter(user => authenticatedUser.friendIds.includes(user.id))

    setUsers(filteredUsers)
  }

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const usersCollectionRef = collection(database, 'users')
  //     const data = await getDocs(usersCollectionRef)

  //     const filteredUsers = data.docs
  //       .map(doc => ({ ...doc.data(), id: doc.id }))
  //       .filter(user => authenticatedUser.friendIds.includes(user.id))

  //     setUsers(filteredUsers)
  //   }
  //   getUsers()
  // }, [authenticatedUser])

  const handleChange = event => {
    setPersonName(
      typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
    )
  }

  const creategroup = async () => {
    setOpen(false)
    getUsers()
    const grpUser = personName.map(name => ({ uid: name }))
    grpUser.push({ uid: authenticatedUser.id })
    let item = {
      name: grpName,
      totalExpense: 0,
      expenseIds: [],
      members: grpUser
    }

    console.log(authenticatedUser)
    console.log(item)

    const docRef = await addDoc(collection(database, 'groups'), item)
    console.log('Document written with ID: ', docRef.id)
    navigate('/')
  }

  return (
    <div className='maindashboard-main'>
      <div className='top-container'>
        <TextField label='Search' className='searchbar' />
        <div
          className='top-object'
          onClick={() => {
            setOpen(true)
          }}
        >
          <p className='top-text'>Add Group</p>
        </div>
      </div>
      <TopContainer />
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
    </div>
  )
}
