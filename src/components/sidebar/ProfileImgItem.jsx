import { ProfileImg } from 'components/shared'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 4rem;
  padding: 0 0.75rem;
  border-left: 3px solid transparent;
  background-color: ${(props) => props.theme.secondary};
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  width: 30%; /* 60px */
  min-height: 100%;
`

const Title = styled.h4`
  overflow: hidden;
  width: 70%;
  font-weight: 300;
  font-size: 1.125rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: 1.5px;
  color: ${({ theme }) => theme.textColor};
`

const ProfileImgItem = ({ title, src }) => {
  return (
    <Container>
      <IconContainer>
        <ProfileImg src={src} size="34px" />
      </IconContainer>
      <Title>{title}</Title>
    </Container>
  )
}

ProfileImgItem.propTypes = {
  title: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
}

export default ProfileImgItem
