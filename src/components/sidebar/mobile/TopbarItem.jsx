import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled(NavLink)`
  text-align: center;
  text-decoration: none;
  color: ${({ theme }) => theme.textColorInactive};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.textColor};
  }

  &.active {
    color: ${({ theme }) => theme.textColor};
  }
`

const TopbarItem = ({ title, Icon, to, size }) => {
  return (
    <Container to={to}>
      <Icon size={size} />
    </Container>
  )
}

export default TopbarItem
