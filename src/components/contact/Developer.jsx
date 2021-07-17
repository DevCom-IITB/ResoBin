import styled from 'styled-components'

import ProfileImg from 'components/shared/ProfileImg'

const Container = styled.a`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: ${({ theme }) => theme.headerHeight};
  padding: 0.5rem 1.5rem;
  margin: 0.5rem 0;
  text-decoration: none;
  color: ${({ theme }) => theme.textColorInactive};
  background-color: ${({ theme }) => theme.secondary};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 1px;
    color: ${({ theme }) => theme.textColor};
    background-color: rgba(0, 0, 0, 0.2);
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.24);
    transition: 100ms ease-out;
  }
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`

const TitleContainer = styled.div``

const Title = styled.h4`
  display: flex;
  overflow: hidden;
  align-items: center;
  font-weight: 300;
  font-size: 1rem;
  text-overflow: ellipsis;
  margin-left: 0.5rem;
  color: ${({ theme }) => theme.textColor};
`

const Developer = ({ name, img, href, switchOrder }) => {
  return (
    <Container href={href}>
      <IconContainer>
        <ProfileImg src={img} size="2rem" />
      </IconContainer>
      <Title>{name}</Title>
    </Container>
  )
}

export default Developer
