import React from 'react'

import './index.css'

// eslint-disable-next-line react/prop-types
export default function FilledBox({ text }) {
  return (
    <div className='filledbox'>
      <p className='box-text'>{text}</p>
    </div>
  )
}
