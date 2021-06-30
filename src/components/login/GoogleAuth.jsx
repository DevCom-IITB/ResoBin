import styled from 'styled-components'
import { Divider } from 'components/shared'
import { HEX2RGBA } from 'helpers'
import Google from 'assets/svgs/g-normal.svg'

const Container = styled.div``

const GoogleContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.75rem;
  padding: 0 1rem;
  margin: 0 auto 1.5rem;
  background-color: #fff;

  cursor: pointer;
  opacity: 100%;

  border: 0;
  border-radius: 0.25rem;
  box-sizing: border-box;
  overflow: hidden;

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
  color: #444;
  font-size: 1.25rem;
  font-family: 'Roboto';
  font-weight: 400;
`

const ContainerOr = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 0.25rem;
  margin-bottom: 1rem;
`

const GoogleAuth = () => {
  return (
    <Container>
      <GoogleContainer type="button">
        <GoogleIcon src={Google} alt="logo" />
        <Title>Sign in with Google</Title>
      </GoogleContainer>
      <ContainerOr>
        <Divider style={{ width: '42%' }} />
        OR
        <Divider style={{ width: '42%' }} />
      </ContainerOr>
    </Container>
  )
}

export default GoogleAuth
