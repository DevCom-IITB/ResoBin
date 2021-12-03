import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components/macro'

import { UserAvatar } from 'components/shared'
import { device } from 'styles/responsive'

export const MenuItem = ({ title, icon: Icon, iconSize, to }) => (
  <StyledNavLink to={to}>
    <IconContainer>
      <Icon size={iconSize} />
    </IconContainer>

    <Title>{title}</Title>
  </StyledNavLink>
)

export const ProfileImgItem = ({ title, src }) => (
  <ContainerDiv>
    <IconContainer>
      <UserAvatar size="1.75rem" src={src} />
    </IconContainer>

    <Title style={{ marginLeft: '0.25rem' }}>{title}</Title>
  </ContainerDiv>
)

const ContainerBase = css`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
  padding: 0.5rem;
  border-left: 3px solid transparent;
  background-color: ${(props) => props.theme.secondary};
`

const StyledNavLink = styled(NavLink)`
  text-align: center;
  text-decoration: none;
  color: ${({ theme }) => theme.textColorInactive};
  cursor: pointer;

  &:hover,
  &.active {
    color: ${({ theme }) => theme.textColor};
  }

  @media ${device.min.md} {
    ${ContainerBase}

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

  @media ${device.min.md} {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.25rem;
  }
`

const Title = styled.h4`
  display: none;

  @media ${device.min.md} {
    display: flex;
    overflow: hidden;
    align-items: center;
    width: 70%;
    font-size: 0.875rem;
    font-weight: 400;
    text-overflow: ellipsis;
    white-space: nowrap;
    letter-spacing: 0.5px;
  }
`

const ContainerDiv = styled.div`
  ${ContainerBase}

  color: ${({ theme }) => theme.textColor};
`
