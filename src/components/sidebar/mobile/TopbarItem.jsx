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

// const Title = styled.h4`
//   display: flex;
//   align-items: center;
//   min-height: 100%;
//   width: 70%;

//   color: inherit;
//   font-size: 1.125rem;
//   font-weight: 400;
//   letter-spacing: 1.5px;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// `

const TopbarItem = ({ title, Icon, to, size }) => {
  return (
    <Container to={to}>
      <Icon size={size} />
      {/* <Title>{title}</Title> */}
    </Container>
  )
}

export default TopbarItem
