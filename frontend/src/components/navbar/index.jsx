import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ResoBinLogo } from 'components/shared'
import DarkmodeToggle from 'components/navbar/DarkmodeToggle'
import CurrentTerm from 'components/navbar/CurrentTerm'
import { ButtonSquare } from 'components/shared'

const Container = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 4rem;
  left: 0px;
  top: 0px;
  background: ${({ theme }) => theme.darksecondary};
  box-shadow: ${({ shadow }) =>
    shadow || '11.5rem 0px 0.5rem rgba(0, 0, 0, 0.5)'};
  z-index: 9; /* To put navbar at the top */
`

const LeftContainer = styled.div`
  min-width: 11.5rem;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const RightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 20rem;
  height: 100%;
`

const MiddleContainer = styled.div`
  margin-left: 2.5rem;
  width: 100%;
`

const SignUpButton = ({ button, buttonLink }) => {
  const buttonStyle = {
    margin: '0.875rem 1rem',
    height: '2.25rem',
    fontSize: '1rem',
  }

  return (
    <Link style={{ all: 'initial', height: '100%' }} to={buttonLink}>
      {button && (
        <ButtonSquare type="submit" style={buttonStyle}>
          {button}
        </ButtonSquare>
      )}
    </Link>
  )
}

const Navbar = ({ shadow, button, buttonLink }) => {
  return (
    <Container shadow={shadow}>
      <LeftContainer>
        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
          <ResoBinLogo size="1.75rem" />
        </Link>
      </LeftContainer>

      <MiddleContainer>
        <CurrentTerm text="AY 2021/22 | AUTUMN" />
      </MiddleContainer>

      <RightContainer>
        {/* <SignUpButton button={button} buttonLink={buttonLink} /> */}
        <DarkmodeToggle />
      </RightContainer>
    </Container>
  )
}

export default Navbar
