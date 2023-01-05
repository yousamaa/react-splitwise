import React from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput'
//import MenuItem from '@mui/material/MenuItem'

import TopContainer from './dashboard/TopContainer'

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
  const Topcontainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 2vw;
  `
  const SearchBar = styled(TextField)`
    background-color: white;
    width: 100vw;
    max-width: 70%;
  `

  const TopObject = styled.div`
    background-color: #eae4f2;
    border-radius: 0.5vw;
    padding-left: 1vw;
    padding-right: 1vw;
    cursor: pointer;
  `

  const BoxStyled = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400;
    bgcolor: white;
    boxshadow: 24;
    p: 4;
  `

  const BoxDiv = styled.div`
    display: flex;
    flexDirection: row;
    flexWrap: wrap;
    gap: '10px;
  `

  const BoxOuterDiv = styled.div`
    textalign: center;
    backgroundcolor: #674fa3;
    borderradius: 0.5vw;
    padding: 2px;
    margintop: 10px;
    cursor: pointer;
  `
  return (
    <MainDashboardMain>
      <Topcontainer>
        <SearchBar label='Search' />
        <TopObject>
          <p>Add Group</p>
        </TopObject>
      </Topcontainer>
      <TopContainer />
      <Modal aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <BoxStyled>
          <p>Add Group</p>
          <BoxDiv>
            <TextField label='Name' />
            <TextField label='Budget' />
            <TextField label='Type' style={{ width: '100%' }} />
            <FormControl style={{ width: '100%' }}>
              <InputLabel>Members</InputLabel>
              <Select
                labelId='demo-multiple-name-label'
                id='demo-multiple-name'
                multiple
                input={<OutlinedInput placeholder='Members' />}
                style={{ width: '100%' }}
              >
                {/* {users?.map(name => (
                  <MenuItem key={name.id} value={name.id}>
                    {name.userFirstName}
                  </MenuItem>
                ))} */}
              </Select>
            </FormControl>
          </BoxDiv>
          <BoxOuterDiv>
            <p style={{ color: 'white' }}>Create Group</p>
          </BoxOuterDiv>
        </BoxStyled>
      </Modal>
    </MainDashboardMain>
  )
}

export default MainDashboard
