import React from 'react'
import Sidebar from '../components/Sidebar'
import MainDashboard from '../components/MainDashboard'

import styled from 'styled-components'

const DashboardMain = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const Dashboard = () => {
  return (
    <DashboardMain>
      <Sidebar />
      <MainDashboard />
    </DashboardMain>
  )
}

export default Dashboard
