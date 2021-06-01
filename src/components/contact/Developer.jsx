import styled from 'styled-components'
import ProfileImg from 'components/shared/ProfileImg'

const Container = styled.a`
  height: 6rem;
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
		transform: scale(1.05);
		transition: 100ms ease-out;
  }
`

const IconContainer = styled.div`
  width: 30%; /* 60px */
  margin: 1rem 0;
  display: flex;
  align-items: center;
`

const Title = styled.h4`
	margin: 1rem 0.25rem 1rem 1rem;
  width: 70%;
  text-overflow: clip;

  font-weight: 500;
	font-size: 1.5rem;
  color: ${({ theme }) => theme.textColor};
	text-align: center;

  overflow: hidden;
  letter-spacing: 1.5px;
`

const Developer = ({ name, img, href, switchOrder }) => {
  return (
    <Container href={href}>
      <IconContainer>
        <ProfileImg src={img} size="60px" />
      </IconContainer>
      <Title>{name}</Title>
    </Container>
  )
}

export default Developer
