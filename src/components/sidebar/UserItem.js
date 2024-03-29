import React from 'react'
import styled from 'styled-components'
import EditIcon from '@mui/icons-material/Edit'

import routesPath from '../../routes/RoutesPath'
import { Link } from 'react-router-dom'

const UserItemMain = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1vw;
  background-color: #674fa3;
  border-radius: 1vw;
  padding-left: 1vw;
  min-width: 17vw;
  max-width: 80%;
`
const Paragragh = styled.p`
  color: white;
  font-size: 1vw;
`

// eslint-disable-next-line react/prop-types
const UserItem = ({ name, icon }) => {
  return (
    <UserItemMain>
      {icon}
      <Paragragh>{name}</Paragragh>
      <Link to={routesPath.updateProfile}>
        <EditIcon style={{ color: 'white' }} />
      </Link>
    </UserItemMain>
  )
}

export default UserItem
