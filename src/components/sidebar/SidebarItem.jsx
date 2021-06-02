import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled(NavLink)`
  min-height: 4rem;
  width: 100%;
  padding: 0px 0.75rem;
  text-decoration: none;

  display: flex;
  flex-direction: row;
  cursor: pointer;

  color: ${({ theme }) => theme.textColorInactive};
  background-color: ${({ theme }) => theme.secondary};
  border-left: 3px solid transparent;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    text-decoration: underline;
    text-underline-offset: 1.5px;
    text-decoration-thickness: 2px;
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.24);
  }
  &.active {
    color: ${({ theme }) => theme.textColor};
    background-color: ${({ theme }) => theme.headerNumber};
    border-left: 3px solid ${({ theme }) => theme.activeMenu};
  }
`

const IconContainer = styled.div`
  width: 30%; /* width: 60px */
  padding-left: 6px;
  min-height: 100%;
  display: flex;
  align-items: center;
`

const Title = styled.h4`
  display: flex;
  align-items: center;
  min-height: 100%;
  width: 70%;

  font-weight: 400;
  letter-spacing: 1.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const SidebarItem = ({ title, icon, to }) => {
  return (
    <Container to={to}>
      <IconContainer>{icon}</IconContainer>
      <Title>{title}</Title>
    </Container>
  )
}

export default SidebarItem
