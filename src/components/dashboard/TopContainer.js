import React from 'react'

import Organization from './Organizations'

import './index.css'
import { useAuth } from '../../contexts/AuthContext'

export default function TopContainer() {
  const { groups } = useAuth()

  return (
    <div className='organizations'>
      {groups?.map(group => {
        return (
          <Organization name={group.name} id={group.id} members={group.members} key={group.id} />
        )
      })}
    </div>
  )
}
