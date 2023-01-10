import React from 'react'
import styled from 'styled-components'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'

import UserItem from './sidebar/UserItem'
import { useAuth } from '../contexts/AuthContext'
import SidebarItem from './sidebar/SidebarItem'
import MainLogo from './sidebar/MainLogo'

const Sidebar = () => {
  const { user, groups, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const SidebarMain = styled.div`
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

  const Sidebaritem = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4vh;
    flex-wrap: wrap;
  `
  const Sidebaritems = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1vh;
  `
  const SidebarGroup = styled.p`
    color: grey;
    font-size: 1.1vw;
    align-self: flex-start;
    margin-left: 7px;
  `

  const Groups = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
  `

  const LogoutButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 1vw;
    text-align: center;
    background-color: #f7f2f9;
    border-radius: 1vw;
    padding-left: 1vw;
    min-width: 17vw;
    max-width: 80%;
    cursor: pointer;
  `
  return (
    <SidebarMain>
      <MainLogo />
      <Sidebaritem>
        <UserItem
          name={user.name}
          icon={<PersonOutlineIcon style={{ color: 'white', fontSize: '30px' }} />}
        ></UserItem>
        <Sidebaritems>
          <SidebarGroup>Groups</SidebarGroup>
          <Groups>
            {groups?.map(group => {
              return (
                <SidebarItem
                  name={group.name}
                  id={group.id}
                  key={group.id}
                  icon={<PeopleOutlineIcon />}
                />
              )
            })}
          </Groups>
        </Sidebaritems>
      </Sidebaritem>
      <LogoutButton onClick={handleLogout}>
        <LogoutIcon style={{ fontSize: '19px' }} />
        <p>Logout</p>
      </LogoutButton>
    </SidebarMain>
  )
}

export default Sidebar
