import React from 'react'
import styled from 'styled-components'
import { Wallet } from 'react-bootstrap-icons'
const MainLogo = () => {
  const MainlogoMain = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 0.5vw;
  `
  const Paragraph = styled.p`
    font-size: 1.7vw;
    font-weight: bold;
  `
  return (
    <MainlogoMain>
      <Wallet style={{ fontSize: '40px' }} />
      <Paragraph>Splitwise</Paragraph>
    </MainlogoMain>
  )
}

export default MainLogo
