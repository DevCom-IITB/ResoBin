import { ButtonSquare, ResoBinLogo } from 'components/shared'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { device } from 'styles/responsive'

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

const LogoContainer = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`

const RightContainer = styled.div`
  display: none;

  @media ${device.md} {
    position: absolute;
    right: 0;
    display: flex;
    padding: 0 0.75rem;
  }
`

const Term = styled.span`
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 80%;
  white-space: nowrap;
  letter-spacing: 1.5px;
  color: lightgray;
`

const SignUpButton = ({ button, buttonLink }) => {
  const history = useHistory()
  return (
    <ButtonSquare onClick={() => history.push(buttonLink)} type="submit">
      {button}
    </ButtonSquare>
  )
}

const Header = ({ button, buttonLink = '' }) => {
  return (
    <Container>
      <LogoContainer to="/dashboard">
        <ResoBinLogo size="1.5rem" />
      </LogoContainer>

      <RightContainer>
        {button ? (
          <SignUpButton button={button} buttonLink={buttonLink} />
        ) : (
          <Term>AY 2021/22 | AUTUMN</Term>
        )}
      </RightContainer>
    </Container>
  )
}

export default Header
