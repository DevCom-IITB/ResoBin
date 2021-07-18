import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { ResoBinLogo } from 'components/shared'
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

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`

const Term = styled.span`
  display: none;

  @media ${device.min.md} {
    position: absolute;
    right: 0;
    display: flex;
    padding: 0 1.5rem;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 80%;
    white-space: nowrap;
    letter-spacing: 1.5px;
    color: lightgray;
  }

  @media ${device.min.lg} {
    padding: 0 0.75rem;
  }
`

const Header = ({ dashboard }) => {
  const history = useHistory()
  const routeHome = () => dashboard && history.push('/dashboard')

  return (
    <Container>
      <LogoContainer onClick={routeHome}>
        <ResoBinLogo size="1.5rem" />
      </LogoContainer>

      {dashboard ? <Term>AY 2021/22 | AUTUMN</Term> : null}
    </Container>
  )
}

export default Header
