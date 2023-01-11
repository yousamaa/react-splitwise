import React from 'react'

import './index.css'

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function OutlineBox({ name }) {
  return (
    <div className='outlinebox'>
      <p className='box-text'>{name}</p>
    </div>
  )
}
