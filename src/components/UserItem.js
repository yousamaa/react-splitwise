import React from 'react'
import styled from 'styled-components'

// eslint-disable-next-line react/prop-types
const UserItem = ({ name, icon, lastName }) => {
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
  return (
    <UserItemMain>
      {icon}
      <div>
        <p className='white sidebaritem-text'>
          {name}
          <br />
          {lastName}
        </p>
      </div>
    </UserItemMain>
  )
}

export default UserItem
