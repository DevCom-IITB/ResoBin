import { rgba } from 'polished'
import styled from 'styled-components/macro'

import Google from 'assets/svgs/g-normal.svg'
import { Divider } from 'components/shared'

const GoogleContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 2.75rem;
  margin: 0 auto 1.5rem;
  padding: 0 1rem;
  overflow: hidden;
  background-color: #ffffff;
  border: 0;
  border-radius: 0.25rem;
  box-shadow: 0 0 0.7rem rgb(0 0 0 / 30%);
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    box-shadow: inset 0 0 2px ${rgba('#000', 0.4)};
    opacity: 0.9;
  }
`

const GoogleIcon = styled.img`
  width: 1.25rem;
  margin: 0 0.5rem;
`

const Title = styled.h4`
  margin: 0 1rem 0 0.5rem;
  color: #444444;
  font-weight: 400;
  font-size: 1.25rem;
  font-family: Roboto, sans-serif;
`

const ContainerOr = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.textColor};
  font-weight: 300;
  font-size: 1rem;
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
