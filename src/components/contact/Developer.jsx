import styled from 'styled-components'
import ProfileImg from 'components/shared/ProfileImg'

const Container = styled.a`
  height: 6rem;
  width: 100%;
  margin: 0.5rem 0;
  padding: 1rem 1.5rem;

  display: flex;
  flex-direction: row;
  cursor: pointer;

  color: ${({ theme }) => theme.textColorInactive};
  text-decoration: none;
  background-color: ${({ theme }) => theme.secondary};

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    text-decoration: underline;
    text-underline-offset: 1.5px;
    text-decoration-thickness: 2px;
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.24);
    /* transform: scale(1.05); */
    transition: 100ms ease-out;
  }
`

const IconContainer = styled.div`
  width: 30%; /* 60px */
  display: flex;
  align-items: center;
`

const TitleContainer = styled.div`
  margin: 0 0 0 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
`

const Title = styled.h4`
  font-weight: 300;
  font-size: 1rem;
  color: ${({ theme }) => theme.textColor};
  overflow: hidden;
  letter-spacing: 1px;
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
