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
import { collection, getDocs } from 'firebase/firestore'

import { database } from '../firebase'
import TopContainer from '../components/dashboard/TopContainer'
import './index.css'
import { useAuth } from '../contexts/AuthContext'

export default function MainDashboard() {
  const [users, setUsers] = useState()
  useEffect(() => {
    const getUsers = async () => {
      const usersCollectionRef = collection(database, 'users')
      const data = await getDocs(usersCollectionRef)

      const filteredUsers = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      setUsers(filteredUsers)
    }
    getUsers()
  }, [])

  const [personName, setPersonName] = useState([])
  const { user: currUser } = useAuth()
  const handleChange = event => {
    setPersonName(
      // On autofill we get a stringified value.
      typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
    )
  }
  const [open, setOpen] = useState(false)
  const [grpName, setGrpName] = useState('')
  const [grpType, setGrpType] = useState()
  const [grpBudget, setGrpBudget] = useState()
  const grpUser = []

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
  async function creategroup() {
    setOpen(false)
    //credentials
    for (var i = 0; i < personName.length; i++) {
      grpUser.push({ id: personName[i] })
    }
    console.log(grpUser)
    let item = {
      grpName: grpName,
      grpType: grpType,
      grpBudget: grpBudget,
      grpUser: grpUser
    }
    console.log(item)

    try {
      let result = await fetch('https://splitwise-apiv1.herokuapp.com/groups/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })
      result = await result.json()
      if (result != null || !result.error) {
        localStorage.setItem('groups', JSON.stringify(result))
        setOpen(false)
      } else {
        return
      }
    } catch (e) {
      console.log(e)
    }
    let totalgroups = await fetch(
      `https://splitwise-apiv1.herokuapp.com/user/groups/${currUser.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    )
    totalgroups = await totalgroups.json()
    localStorage.setItem('groups', JSON.stringify(totalgroups))

    // window.location.reload()
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
            <TextField
              label='Budget'
              onChange={e => {
                setGrpBudget(e.target.value)
              }}
            />
            <TextField
              label='Type'
              onChange={e => {
                setGrpType(e.target.value)
              }}
              style={{ width: '100%' }}
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
                {users?.map(name => (
                  <MenuItem key={name.id} value={name.id}>
                    {name.userFirstName}
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
