import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Person, People } from 'react-bootstrap-icons'
import { collection, getDocs } from 'firebase/firestore'

import UserItem from './sidebar/UserItem'
import { useAuth } from '../contexts/AuthContext'
import SidebarItem from './sidebar/SidebarItem'
import { database } from '../firebase'

const Sidebar = () => {
  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(database, 'users')
  const { currentUser } = useAuth()
  //const { groups, setGroups } = useState([{ id: 1, name: 'Hunza Tour' }])
  // setGroups([
  //   { id: 1, name: 'Hunza Tour' },
  //   { id: 2, name: 'Kashmir Tour' }
  // ])

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef)
      setUsers(
        data.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))
      )
    }
    getUsers()
  }, [])

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
            {users?.map(user => {
              return <SidebarItem name={user.name} id={user.id} key={user.id} icon={<People />} />
            })}
          </Groups>
        </Sidebaritems>
      </Sidebaritem>
    </SidebarMain>
  )
}

export default Sidebar
