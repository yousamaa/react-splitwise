import React from 'react'
import Sidebar from '../components/Sidebar'

import styled from 'styled-components'

const Dashboard = () => {
  const DashboardMain = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
  `
  return (
    <DashboardMain>
      <Sidebar />
    </DashboardMain>
  )
}

export default Dashboard
