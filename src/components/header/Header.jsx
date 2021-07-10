import CurrentTerm from 'components/header/CurrentTerm'
import DarkmodeToggle from 'components/header/DarkmodeToggle'
import { ButtonSquare, ResoBinLogo } from 'components/shared'
import { device } from 'helpers/mediaQueries'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 9; /* To put header at the top */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3rem;
  background: ${({ theme }) => theme.darksecondary};
  box-shadow: '0 0 0.5rem rgba(0, 0, 0, 0.5)';
`

const LeftContainer = styled(Link)`
  all: initial;

  @media ${device.md} {
    position: relative;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 9rem;
    height: 100%;
    text-decoration: none;
  }
`

const MiddleContainer = styled(Link)`
  display: none;

  @media ${device.md} {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`

const StyledLink = styled(Link)`
  all: initial;
  text-decoration: none;
`

const RightContainer = styled.div`
  display: none;

  @media ${device.md} {
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    height: 100%;
  }
`

const SignUpButton = ({ button, buttonLink }) => {
  const buttonStyle = {
    margin: '0.875rem 1rem',
    height: '2.25rem',
    fontSize: '1rem',
  }

  const handleClick = () => {
    console.log(1)
  }

  return (
    <StyledLink to={buttonLink}>
      {button && (
        <ButtonSquare onClick={handleClick} type="submit" style={buttonStyle}>
          {button}
        </ButtonSquare>
      )}
    </StyledLink>
  )
}

const Header = ({ button, buttonLink = '' }) => {
  return (
    <Container>
      <LeftContainer to="/dashboard">
        <ResoBinLogo size="1.5rem" />
      </LeftContainer>

      <MiddleContainer>
        <CurrentTerm text="AY 2021/22 | AUTUMN" />
      </MiddleContainer>

      <RightContainer>
        <SignUpButton button={button} buttonLink={buttonLink} />
        <DarkmodeToggle />
      </RightContainer>
    </Container>
  )
}

export default Header
