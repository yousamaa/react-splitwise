import React from 'react'

import Organization from './Organizations'

import './index.css'

export default function TopContainer() {
  return (
    <div className='organizations'>
      {group?.map(post => {
        return <Organization name={post.groupName} id={post.id} key={post.id} />
      })}
    </div>
  )
}
