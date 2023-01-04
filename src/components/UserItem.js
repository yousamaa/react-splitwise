import React from 'react'
import styled from 'styled-components'

// eslint-disable-next-line react/prop-types
const UserItem = ({ email, icon }) => {
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
  return (
    <UserItemMain>
      {icon}
      <div>
        <Paragragh>{email}</Paragragh>
      </div>
    </UserItemMain>
  )
}

export default UserItem
