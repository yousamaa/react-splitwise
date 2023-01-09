import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import FilledBox from './FilledBox'
import OutlineBox from './OutlineBox'

import './index.css'

// eslint-disable-next-line react/prop-types
export default function Events({ name, paidBy, amt }) {
  return (
    <div className='event-main'>
      <div className='event-content'>
        <p className='event-head'>{name}</p>
        <div className='event-icons'>
          <FilledBox text={`$${amt}`} />
          <OutlineBox id={paidBy} />
        </div>
      </div>
      <ArrowForwardIosIcon />
    </div>
  )
}
