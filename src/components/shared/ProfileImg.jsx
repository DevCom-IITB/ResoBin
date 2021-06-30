import styled from 'styled-components'

const Image = styled.img`
  min-width: 100%;
  height: 100%;
  pointer-events: none;
  border-radius: 50%;
	padding: 2px;
`

const Border = styled.div`
  min-width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.textColor};
`

const ProfileImg = ({ src, size }) => {
  return (
    <Border size={size}>
      <Image src={src} size={size} />
    </Border>
  )
}

export default ProfileImg
