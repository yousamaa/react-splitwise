/* eslint-disable react/prop-types */
/* eslint-disable max-lines */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import BalanceIcon from '@mui/icons-material/Balance'
import AddIcon from '@mui/icons-material/Add'
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

import { database } from '../../firebase'
import { collection, getDocs, doc, setDoc, addDoc } from 'firebase/firestore'
import Events from './Events'

import './index.css'

export default function Organizations({ name, id, members, expenseIds, totalExpense }) {
  const [expenses, setExpenses] = useState([])
  const [open, setOpen] = useState(false)
  const [users, setUsers] = useState([])

  const [expName, setExpName] = useState()
  const [expAmt, setExpAmt] = useState()
  const [expPaidBy, setExpPaidBy] = useState()
  const [expGrp, setExpGrp] = useState()
  const [personName, setPersonName] = useState([])

  const getExpenses = async () => {
    const expensesCollectionRef = collection(database, 'expenses')
    const data = await getDocs(expensesCollectionRef)
    const filteredExpenses = data.docs
      .map(doc => ({ ...doc.data(), id: doc.id }))
      .filter(expense => expenseIds.includes(expense.id))
    setExpenses(filteredExpenses)
  }

  const getMembers = async () => {
    const usersCollectionRef = collection(database, 'users')
    const data = await getDocs(usersCollectionRef)

    const filteredMembers = data.docs
      .map(doc => ({ ...doc.data(), id: doc.id }))
      .filter(user => members.some(member => member.uid == user.id))
    setUsers(filteredMembers)
  }

  useEffect(() => {
    getExpenses()
  }, [])

  useEffect(() => {
    getMembers()
  }, [])

  const handleChange = event => {
    setPersonName(
      typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
    )
  }

  const openBox = grpId => {
    setExpGrp(grpId)
    setOpen(true)
  }

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

  async function createExpense() {
    setOpen(false)

    const usrSplitBtw = personName.map(name => ({ id: name }))

    let item = {
      expName: expName,
      expAmt: expAmt,
      expPaidBy: expPaidBy,
      usrSplitBtw: usrSplitBtw,
      expGrp: { id: expGrp }
    }

    const ExpenseRef = await addDoc(collection(database, 'expenses'), item)

    const groupRef = doc(database, 'groups', id)
    setDoc(groupRef, { expenseIds: expenseIds.concat(String(ExpenseRef.id)) }, { merge: true })
    window.location.reload()
  }

  return (
    <div className='org-main'>
      <div className='org-heading'>
        <p className='org-name'>{name}</p>
        <div className='org-icons'>
          <div
            onClick={() => {
              gameOn()
            }}
            style={{ cursor: 'pointer' }}
          >
            <BalanceIcon style={{ fontSize: '20px' }} />
          </div>
          <div
            onClick={() => {
              openBox(id)
            }}
            style={{ cursor: 'pointer' }}
          >
            <AddIcon style={{ fontSize: '20px' }} />
          </div>
          <div>
            <p>${totalExpense}</p>
          </div>
          <div
            onClick={() => {
              deleteGroup(id)
            }}
            style={{ cursor: 'pointer' }}
          >
            <DeleteOutlineIcon style={{ fontSize: '20px' }} />
          </div>
        </div>
      </div>
      {expenses?.map(expense => {
        return (
          <Events
            name={expense.expName}
            amt={expense.expAmt}
            paidBy={expense.expPaidBy}
            key={expense.id}
          />
        )
      })}
      <Modal
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <p>Add Expense</p>
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
                setExpName(e.target.value)
              }}
            />
            <TextField
              label='Amount'
              onChange={e => {
                setExpAmt(e.target.value)
              }}
            />
            <FormControl style={{ width: '100%' }}>
              <InputLabel>Paid By</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={expPaidBy}
                onChange={e => {
                  setExpPaidBy(e.target.value)
                }}
                input={<OutlinedInput />}
                style={{ width: '100%' }}
              >
                {users?.map(user => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl style={{ width: '100%' }}>
              <InputLabel>Split Between</InputLabel>
              <Select
                labelId='demo-multiple-name-label'
                id='demo-multiple-name'
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput />}
                style={{ width: '100%' }}
              >
                {users?.map(user =>
                  user.id != expPaidBy ? (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name}
                    </MenuItem>
                  ) : (
                    <></>
                  )
                )}
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
              createExpense()
            }}
          >
            <p style={{ color: 'white' }}>Add Expense</p>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
