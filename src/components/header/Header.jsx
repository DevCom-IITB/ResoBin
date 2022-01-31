import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import { ReactComponent as ResoBinLogo } from 'assets/svgs/logo.svg'
import { Divider, ResoBinText } from 'components/shared'
import { displayYear } from 'helpers'
import { useResponsive } from 'hooks'
import { selectCurrentSemester } from 'store/courseSlice'
import { device } from 'styles/responsive'

const Header = () => {
  const latestSemester = useSelector(selectCurrentSemester)
  const { isMobile } = useResponsive(device.tablet)

  return (
    <Container>
      <LogoContainer to="/">
        <ResoBinLogo width="36" alt="logo" />
      </LogoContainer>

      {!isMobile && latestSemester && (
        <>
          <TextContainer to="/">
            <ResoBinText size="1.5rem" />
          </TextContainer>

          <Term>
            <span>{latestSemester.season} sem</span>

            <Divider dashed margin="2px 0" style={{ borderColor: '#ffffff' }} />

            <span>AY {displayYear(latestSemester)}</span>
          </Term>
        </>
      )}
    </Container>
  )
}

export default Header

const TextContainer = styled(Link)`
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.asideWidthLeft};
`

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  height: 100%;
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
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 0 1.5rem;
  color: ${({ theme }) => theme.textColor};
  font-size: 0.75rem;
  text-align: center;
  text-transform: uppercase;
  opacity: 0.8;
`
