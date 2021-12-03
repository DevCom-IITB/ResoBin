import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { ResoBinLogo } from 'components/shared'
import { displayYear } from 'helpers/format'
import { selectCurrentSemester } from 'store/courseSlice'
import { device } from 'styles/responsive'

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const latestSemester = useSelector(selectCurrentSemester)

  return (
    <Container>
      <ResoBinLogo size="1.5rem" />
      {!isAuthenticated && latestSemester && (
        <Term>
          AY {displayYear(latestSemester.year)}
          &nbsp;| {latestSemester.season}
        </Term>
      )}
    </Container>
  )
}

export default Header

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
  display: none;
  text-transform: uppercase;

  @media ${device.min.md} {
    position: absolute;
    right: 0;
    display: flex;
    padding: 0 1.5rem;
    color: lightgray;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 80%;
    letter-spacing: 1.5px;
    white-space: nowrap;
  }

  @media ${device.min.lg} {
    padding: 0 0.75rem;
  }
`
