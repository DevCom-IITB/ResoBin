import styled from 'styled-components'

import ProfileImg from 'components/shared/ProfileImg'

const Container = styled.a`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 4rem;
  padding: 0.5rem 1.5rem;
  margin: 0.5rem 0;
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
    transition: 100ms ease-out;
  }
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  width: 30%; /* 60px */
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
  margin: 0 0 0 1.5rem;
`

const Title = styled.h4`
  overflow: hidden;
  font-weight: 300;
  font-size: 1rem;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.textColor};
`

const Developer = ({ name, img, href, switchOrder }) => {
  return (
    <Container href={href}>
      <IconContainer>
        <ProfileImg src={img} size="3rem" />
      </IconContainer>
      <TitleContainer>
        <Title>{name}</Title>
      </TitleContainer>
    </Container>
  )
}

export default Developer
