import React, { useState } from 'react'
import { TextField } from '@mui/material'

import TopContainer from '../components/dashboard/TopContainer'
import CreateGroup from './CreateGroup'

import './index.css'

export default function MainDashboard() {
  const [open, setOpen] = useState(false)

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
      <CreateGroup open={open} setOpen={setOpen} />
    </div>
  )
}
