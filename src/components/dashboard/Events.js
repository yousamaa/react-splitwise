/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import FilledBox from './FilledBox'
//import OutlineBox from './OutlineBox'

import './index.css'

export default function Events({ name, paidBy, amt }) {
  return (
    <div className='event-main'>
      <div className='event-content'>
        <p className='event-head'>{name}</p>
        <div className='event-icons'>
          <FilledBox text={`$${amt}`} />
          {/* {paidBy?.map(payee => {
            return <OutlineBox key={payee.index} name={payee} />
          })} */}
        </div>
      </div>
      <ArrowForwardIosIcon />
    </div>
  )
}
