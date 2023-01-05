import React from 'react'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'

import './index.css'

// eslint-disable-next-line react/prop-types
export default function Member({ firstName, lastName }) {
  return (
    <div className='m-member'>
      <PersonOutlineIcon />
      <div>
        <p className='sidebaritem-text'>{`${firstName} ${lastName}`}</p>
      </div>
    </div>
  )
}
