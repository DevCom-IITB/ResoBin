import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled(NavLink)`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 4rem;
  padding: 0 0.75rem;
  border-left: 3px solid transparent;
  text-decoration: none;
  color: ${({ theme }) => theme.textColorInactive};
  background-color: ${({ theme }) => theme.secondary};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    background-color: rgba(0, 0, 0, 0.1);
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.24);
    text-decoration-thickness: 2px;
    text-underline-offset: 1.5px;
  }
  &.active {
    border-left: 3px solid ${({ theme }) => theme.activeMenu};
    color: ${({ theme }) => theme.textColor};
    background-color: ${({ theme }) => theme.headerNumber};
  }
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  width: 30%; /* width: 60px */
  min-height: 100%;
  padding-left: 6px;
`

const Title = styled.h4`
  display: flex;
  overflow: hidden;
  align-items: center;
  width: 70%;
  min-height: 100%;
  font-weight: 400;
  font-size: 1.125rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: 1.5px;

  /* color: ${({ theme }) => theme.textColorInactive}; */
  color: inherit;
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
