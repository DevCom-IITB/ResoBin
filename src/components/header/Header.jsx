import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import { ReactComponent as ResoBinLogo } from 'assets/svgs/logo.svg'
import { Divider, ResoBinLogo as ResoBinText } from 'components/shared'
import { displayYear } from 'helpers/format'
import { useResponsive } from 'hooks'
import { selectCurrentSemester } from 'store/courseSlice'
import { device } from 'styles/responsive'

const Header = () => {
  const latestSemester = useSelector(selectCurrentSemester)
  const { isMobile } = useResponsive(device.tablet)

  return (
    <Container>
      {!isMobile && (
        <TextContainer to="/">
          <ResoBinText size="1.5rem" />
        </TextContainer>
      )}

      <LogoContainer to="/">
        <ResoBinLogo width="36" alt="logo" />
      </LogoContainer>

      {!isMobile && latestSemester && (
        <Term>
          <span>{latestSemester.season} sem</span>

          <Divider dashed margin="2px 0" style={{ borderColor: '#ffffff' }} />

          <span>AY {displayYear(latestSemester)}</span>
        </Term>
      )}
    </Container>
  )
}

export default Header

const TextContainer = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  width: ${({ theme }) => theme.asideWidthLeft};
`

const LogoContainer = styled(Link)`
  height: 100%;
  display: flex;
  align-items: center;
`

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3rem;
  background: ${({ theme }) => theme.darksecondary};
  box-shadow: 0 2px 8px rgb(0 0 0 / 40%);
`

const Term = styled.span`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  padding: 0 1.5rem;
  color: ${({ theme }) => theme.textColor};
  font-size: 0.75rem;
  text-transform: uppercase;
  text-align: center;
  opacity: 0.8;
`
