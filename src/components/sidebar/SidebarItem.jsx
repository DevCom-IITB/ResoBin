import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled(NavLink)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
  padding: 0.5rem;
  border-left: 3px solid transparent;
  text-decoration: none;
  color: ${({ theme }) => theme.textColorInactive};
  background-color: ${({ theme }) => theme.secondary};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 1.5px;
    background-color: rgba(0, 0, 0, 0.1);
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.24);
  }

  &.active {
    border-left: 3px solid ${({ theme }) => theme.activeMenu};
    color: ${({ theme }) => theme.textColor};
    background-color: ${({ theme }) => theme.headerNumber};
  }
`

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.25rem;
`

const Title = styled.h4`
  display: flex;
  overflow: hidden;
  align-items: center;
  width: 70%;
  font-weight: 400;
  font-size: 0.875rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: 0.5px;
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
