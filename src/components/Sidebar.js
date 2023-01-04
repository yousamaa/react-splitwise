import React, { useState } from 'react'
import styled from 'styled-components'
import { Person, People } from 'react-bootstrap-icons'

import UserItem from './UserItem'
import { useAuth } from '../contexts/AuthContext'
import SidebarItem from './SidebarItem'

const Sidebar = () => {
  const { currentUser } = useAuth()
  const { groups, setGroups } = useState([])

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
  return (
    <SidebarMain>
      <Sidebaritem>
        <UserItem
          email={currentUser.email}
          icon={<Person style={{ color: 'white', fontSize: '30px' }} />}
        ></UserItem>
        <Sidebaritems>
          <SidebarGroup>Groups</SidebarGroup>
          <Groups>
            {groups?.map(group => {
              return (
                <SidebarItem name={group.name} id={group.id} key={group.id} icon={<People />} />
              )
            })}
          </Groups>
        </Sidebaritems>
      </Sidebaritem>
    </SidebarMain>
  )
}

export default Sidebar
