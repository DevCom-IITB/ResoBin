import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components/macro'

import { UserAvatar } from 'components/shared'
import { device } from 'styles/responsive'

export const MenuItem = ({ title, icon: Icon, iconSize, ...navLinkProps }) => (
  <StyledNavLink {...navLinkProps}>
    <IconContainer>
      <Icon size={iconSize} />
    </IconContainer>

    <Title>{title}</Title>
  </StyledNavLink>
)

export const ProfileImgItem = ({ title, src , ...navLinkProps }) => (
  <StyledNavLink {...navLinkProps}>
    <ContainerDiv>
      <IconContainer>
        <UserAvatar size="1.75rem" src={src} />
      </IconContainer>

      <Title style={{ marginLeft: '0.25rem' }}>{title}</Title>
    </ContainerDiv>
  </StyledNavLink>
)

const ContainerBase = css`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
  padding: 0.5rem;
  background: ${(props) => props.theme.secondary};
  border-left: 3px solid transparent;
`

const StyledNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.textColorInactive};
  text-align: center;
  text-decoration: none;
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
      background: rgb(0 0 0 / 10%);
      box-shadow: 1px 1px 8px rgb(0 0 0 / 24%);
    }

    &.active {
      background: ${({ theme }) => theme.headerNumber};
      border-left: 3px solid ${({ theme }) => theme.activeMenu};
    }
  }
`

const IconContainer = styled.div`
  display: inline;

  @media ${device.min.md} {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
  }
`

const Title = styled.h4`
  display: none;

  @media ${device.min.md} {
    display: flex;
    align-items: center;
    width: 70%;
    overflow: hidden;
    font-weight: 400;
    font-size: 0.875rem;
    letter-spacing: 0.5px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`

const ContainerDiv = styled.div`
  ${ContainerBase}

  color: ${({ theme }) => theme.textColor};
`
