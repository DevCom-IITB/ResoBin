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

  color: ${({ active, theme }) =>
    active ? theme.textColor : theme.textColorInactive};
  background-color: ${({ active, theme }) =>
    active ? theme.headerNumber : theme.secondary};
  border-left: 3px solid
    ${({ active, theme }) => (active ? theme.activeMenu : 'transparent')};

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    text-decoration: underline;
    text-underline-offset: 1px;
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.24);
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
  font-weight: 400;
  min-height: 100%;
  width: 70%;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  letter-spacing: 1.5px;

  display: flex;
  align-items: center;
`

const SidebarItem = ({ title, icon, active, to }) => {
  return (
    <Container to={to} activeStyle active={active}>
      <IconContainer>{icon}</IconContainer>
      <Title active={active}>{title}</Title>
    </Container>
  )
}

export default SidebarItem
