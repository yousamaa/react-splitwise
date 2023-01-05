import React from 'react'
import styled from 'styled-components'

// eslint-disable-next-line react/prop-types
const SidebarItem = ({ name, icon }) => {
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
  return (
    <SideBarItemMain>
      {icon}
      <Paragragh>{name}</Paragragh>
    </SideBarItemMain>
  )
}

export default SidebarItem
