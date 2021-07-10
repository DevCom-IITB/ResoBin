import { ProfileImg } from 'components/shared'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
  padding: 0.5rem;
  border-left: 3px solid transparent;
  color: ${({ theme }) => theme.textColor};
  background-color: ${(props) => props.theme.secondary};
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
  font-weight: 300;
  font-size: 0.875rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: 0.5px;
`

const ProfileImgItem = ({ title, src }) => {
  return (
    <Container>
      <IconContainer>
        <ProfileImg src={src} size="28px" />
      </IconContainer>
      <Title>{title}</Title>
    </Container>
  )
}

export default ProfileImgItem
