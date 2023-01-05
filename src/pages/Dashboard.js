import React from 'react'
import Sidebar from '../components/Sidebar'

import NavBar from '../components/NavBar'
import styled from 'styled-components'

const Dashboard = () => {
  const DashboardMain = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
  `
  return (
    <>
      <NavBar />
      <DashboardMain>
        <Sidebar />
      </DashboardMain>
    </>
  )
}

export default Dashboard
