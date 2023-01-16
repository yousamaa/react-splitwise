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
          <Organization
            id={group.id}
            name={group.name}
            members={group.members}
            expenseIds={group.expenseIds}
            totalExpense={group.totalExpense}
            key={group.id}
          />
        )
      })}
    </div>
  )
}
