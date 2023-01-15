import React from 'react'
import styled from 'styled-components'

const SideBarItemMain = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1vw;
  background-color: #ebddff;
  border-radius: 1vw;
  min-width: 17vw;
  max-width: 80%;
  padding-left: 1vw;
`
const Paragragh = styled.p`
  font-size: 1vw;
`

// eslint-disable-next-line react/prop-types
const SidebarItem = ({ name, icon }) => {
  return (
    <SideBarItemMain>
      {icon}
      <Paragragh>{name}</Paragragh>
    </SideBarItemMain>
  )
}

export default SidebarItem
