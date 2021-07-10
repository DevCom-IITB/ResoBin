import { ProfileImg } from 'components/shared'
import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'

const SidebarItemContainer = css`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
  padding: 0.5rem;
  border-left: 3px solid transparent;
  background-color: ${(props) => props.theme.secondary};
`

const ContainerNavLink = styled(NavLink)`
  text-align: center;
  text-decoration: none;
  color: ${({ theme }) => theme.textColorInactive};
  cursor: pointer;

  &:hover,
  &.active {
    color: ${({ theme }) => theme.textColor};
  }

  @media (min-width: 992px) {
    ${SidebarItemContainer}

    &:hover {
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 1.5px;
      background-color: rgba(0, 0, 0, 0.1);
      box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.24);
    }

    &.active {
      border-left: 3px solid ${({ theme }) => theme.activeMenu};
      background-color: ${({ theme }) => theme.headerNumber};
    }
  }
`

const IconContainer = styled.div`
  display: inline;

  @media (min-width: 992px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.25rem;
  }
`

const Title = styled.h4`
  display: none;

  @media (min-width: 992px) {
    display: flex;
    overflow: hidden;
    align-items: center;
    width: 70%;
    font-weight: 400;
    font-size: 0.875rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    letter-spacing: 0.5px;
  }
`

// const TopbarItem = ({ title, icon, to }) => {
//   return (
//     <ContainerNavLink to={to}>
//       {icon}
//     </ContainerNavLink>
//   )
// }

export const SidebarItem = ({ title, icon, to }) => {
  return (
    <ContainerNavLink to={to}>
      <IconContainer>{icon}</IconContainer>
      <Title>{title}</Title>
    </ContainerNavLink>
  )
}

const Container = styled.div`
  ${SidebarItemContainer}

  color: ${({ theme }) => theme.textColor};
`

export const ProfileImgItem = ({ title, src }) => {
  return (
    <Container>
      <IconContainer>
        <ProfileImg src={src} size="28px" />
      </IconContainer>
      <Title style={{ fontWeight: '300' }}>{title}</Title>
    </Container>
  )
}
