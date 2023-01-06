import React from 'react'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'

import './index.css'

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function Final({ payto, payby, amt }) {
  return (
    <div className='m-final'>
      <div className='l-final'>
        <p>{by}</p>
        <DoubleArrowIcon />
        <p>{to}</p>
      </div>
      <div className='r-final'>
        <p style={{ fontSize: '1vw', margin: 0, padding: '10px' }}>₹{amt}</p>
      </div>
    </div>
  )
}
