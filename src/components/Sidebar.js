import React from 'react'
import styled from 'styled-components'

const Sidebar = () => {
  const SidebarMain = styled.section`
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: flex-start;
    gap: 4vh;
    padding-top: 5vh;
    align-items: flex-start;
    max-width: 18%;
    width: auto;
    padding: 2vw;
  `
  return <SidebarMain>Sidebar</SidebarMain>
}

export default Sidebar
