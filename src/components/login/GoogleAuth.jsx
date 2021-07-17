import styled from 'styled-components'

import Google from 'assets/svgs/g-normal.svg'
import { Divider } from 'components/shared'
import { HEX2RGBA } from 'helpers'

const GoogleContainer = styled.button`
  box-sizing: border-box;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  height: 2.75rem;
  padding: 0 1rem;
  margin: 0 auto 1.5rem;
  border: 0;
  border-radius: 0.25rem;
  background-color: #ffffff;
  cursor: pointer;

  &:hover {
    opacity: 90%;
  }

  &:active {
    opacity: 90%;
    box-shadow: inset 0 0 2px ${HEX2RGBA('#000', 40)};
  }
`

const GoogleIcon = styled.img`
  width: 1.25rem;
  margin: 0 0.5rem;
`

const Title = styled.h4`
  margin: 0 1rem 0 0.5rem;
  font-size: 1.25rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  color: #444444;
`

const ContainerOr = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 0.25rem;
`

const GoogleAuth = () => {
  return (
    <>
      <GoogleContainer type="button">
        <GoogleIcon src={Google} alt="logo" />
        <Title>Sign in with Google</Title>
      </GoogleContainer>
      <ContainerOr>
        <Divider style={{ width: '42%' }} />
        OR
        <Divider style={{ width: '42%' }} />
      </ContainerOr>
    </>
  )
}

export default GoogleAuth
