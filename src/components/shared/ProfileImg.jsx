import styled from 'styled-components/macro'

const Image = styled.img`
  min-width: 100%;
  height: 100%;
  padding: 2px;
  border-radius: 50%;
  pointer-events: none;
`

const Border = styled.div`
  min-width: ${({ size }) => size};
  height: ${({ size }) => size};
  border: 1px solid ${({ theme }) => theme.textColor};
  border-radius: 50%;
`

const ProfileImg = ({ src, size }) => {
  return (
    <Border size={size}>
      <Image src={src} size={size} />
    </Border>
  )
}

export default ProfileImg
