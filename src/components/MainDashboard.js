import React from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'

const MainDashboard = () => {
  const MainDashboardMain = styled.div`
    background-color: #f7f2f9;
    min-height: 100vh;
    max-width: 82%;

    border-radius: 2vw;
    padding-top: 3vw;
    padding-left: 5vw;
    padding-right: 5vw;
  `
  const TopContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 2vw;
  `
  return (
    <MainDashboardMain>
      <TopContainer>
        <TextField label='Search' />
      </TopContainer>
    </MainDashboardMain>
  )
}

export default MainDashboard
