import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ResoBinLogo } from 'components/shared'
import DarkmodeToggle from 'components/navbar/DarkmodeToggle'
import CurrentTerm from 'components/navbar/CurrentTerm'

const Container = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 4rem;
  left: 0px;
  top: 0px;
  background: ${({ theme }) => theme.darksecondary};
  box-shadow: 11.5rem 0px 0.5rem rgba(0, 0, 0, 0.5);
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
  width: 19rem;
  height: 100%;
`

const MiddleContainer = styled.div`
  width: calc(100% - 11.5rem - 19rem);
`

const Navbar = () => {
  return (
    <Container>
      <LeftContainer>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <ResoBinLogo size="1.75rem" />
        </Link>
      </LeftContainer>

      <MiddleContainer>
        <CurrentTerm text="AY 2021/22 | AUTUMN" />
      </MiddleContainer>

      <RightContainer>
        <DarkmodeToggle />
      </RightContainer>
    </Container>
  )
}

export default Navbar
